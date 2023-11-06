import { serialize, parse } from 'cookie';
import { bold } from 'kleur/colors';
import 'string-width';
import { A as AstroError, H as ResponseSentError, K as MiddlewareNoDataOrNextCalled, O as MiddlewareNotAResponse, Q as ASTRO_VERSION, F as ClientAddressNotAvailable, S as StaticClientAddressNotAvailable, z as LocalsNotAnObject, T as renderEndpoint } from './chunks/astro_1aa3d2dc.mjs';
import 'clsx';
import mime from 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

const DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
const DELETED_VALUE = "deleted";
const responseSentSymbol = Symbol.for("astro.responseSent");
class AstroCookie {
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) {
      throw new Error(`Cannot convert undefined to an object.`);
    }
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false")
      return false;
    if (this.value === "0")
      return false;
    return Boolean(this.value);
  }
}
class AstroCookies {
  #request;
  #requestValues;
  #outgoing;
  constructor(request) {
    this.#request = request;
    this.#requestValues = null;
    this.#outgoing = null;
  }
  /**
   * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
   * in a Set-Cookie header added to the response.
   * @param key The cookie to delete
   * @param options Options related to this deletion, such as the path of the cookie.
   */
  delete(key, options) {
    const serializeOptions = {
      expires: DELETED_EXPIRATION
    };
    if (options?.domain) {
      serializeOptions.domain = options.domain;
    }
    if (options?.path) {
      serializeOptions.path = options.path;
    }
    this.#ensureOutgoingMap().set(key, [
      DELETED_VALUE,
      serialize(key, DELETED_VALUE, serializeOptions),
      false
    ]);
  }
  /**
   * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
   * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
   * from that set call, overriding any values already part of the request.
   * @param key The cookie to get.
   * @returns An object containing the cookie value as well as convenience methods for converting its value.
   */
  get(key) {
    if (this.#outgoing?.has(key)) {
      let [serializedValue, , isSetValue] = this.#outgoing.get(key);
      if (isSetValue) {
        return new AstroCookie(serializedValue);
      } else {
        return void 0;
      }
    }
    const values = this.#ensureParsed();
    if (key in values) {
      const value = values[key];
      return new AstroCookie(value);
    }
  }
  /**
   * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
   * part of the initial request or set via Astro.cookies.set(key)
   * @param key The cookie to check for.
   * @returns
   */
  has(key) {
    if (this.#outgoing?.has(key)) {
      let [, , isSetValue] = this.#outgoing.get(key);
      return isSetValue;
    }
    const values = this.#ensureParsed();
    return !!values[key];
  }
  /**
   * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
   * an object it will be stringified via JSON.stringify(value). Additionally you
   * can provide options customizing how this cookie will be set, such as setting httpOnly
   * in order to prevent the cookie from being read in client-side JavaScript.
   * @param key The name of the cookie to set.
   * @param value A value, either a string or other primitive or an object.
   * @param options Options for the cookie, such as the path and security settings.
   */
  set(key, value, options) {
    let serializedValue;
    if (typeof value === "string") {
      serializedValue = value;
    } else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = toStringValue;
      }
    }
    const serializeOptions = {};
    if (options) {
      Object.assign(serializeOptions, options);
    }
    this.#ensureOutgoingMap().set(key, [
      serializedValue,
      serialize(key, serializedValue, serializeOptions),
      true
    ]);
    if (this.#request[responseSentSymbol]) {
      throw new AstroError({
        ...ResponseSentError
      });
    }
  }
  /**
   * Astro.cookies.header() returns an iterator for the cookies that have previously
   * been set by either Astro.cookies.set() or Astro.cookies.delete().
   * This method is primarily used by adapters to set the header on outgoing responses.
   * @returns
   */
  *headers() {
    if (this.#outgoing == null)
      return;
    for (const [, value] of this.#outgoing) {
      yield value[1];
    }
  }
  #ensureParsed() {
    if (!this.#requestValues) {
      this.#parse();
    }
    if (!this.#requestValues) {
      this.#requestValues = {};
    }
    return this.#requestValues;
  }
  #ensureOutgoingMap() {
    if (!this.#outgoing) {
      this.#outgoing = /* @__PURE__ */ new Map();
    }
    return this.#outgoing;
  }
  #parse() {
    const raw = this.#request.headers.get("cookie");
    if (!raw) {
      return;
    }
    this.#requestValues = parse(raw);
  }
}

const astroCookiesSymbol = Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function responseHasCookies(response) {
  return Reflect.has(response, astroCookiesSymbol);
}
function getFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getFromResponse(response);
  if (!cookies) {
    return [];
  }
  for (const headerValue of cookies.headers()) {
    yield headerValue;
  }
  return [];
}

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message
  };
  if (levels[logLevel] > levels[level]) {
    return;
  }
  dest.write(event);
}
function info(opts, label, message) {
  return log(opts, "info", label, message);
}
function warn(opts, label, message) {
  return log(opts, "warn", label, message);
}
function error(opts, label, message) {
  return log(opts, "error", label, message);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message) {
    info(this.options, label, message);
  }
  warn(label, message) {
    warn(this.options, label, message);
  }
  error(label, message) {
    error(this.options, label, message);
  }
  debug(label, message, ...args) {
    debug(this.options, label, message, args);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.options, this.label, message);
  }
}

async function callMiddleware(logger, onRequest, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = async () => {
    nextCalled = true;
    responseFunctionPromise = responseFunction();
    return responseFunctionPromise;
  };
  let middlewarePromise = onRequest(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (isEndpointOutput(value)) {
      logger.warn(
        "middleware",
        `Using simple endpoints can cause unexpected issues in the chain of middleware functions.
It's strongly suggested to use full ${bold("Response")} objects.`
      );
    }
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) {
          throw new AstroError(MiddlewareNotAResponse);
        }
        return ensureCookiesAttached(apiContext, value);
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(MiddlewareNotAResponse);
        }
      }
    } else if (typeof value === "undefined") {
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    } else if (value instanceof Response === false) {
      throw new AstroError(MiddlewareNotAResponse);
    } else {
      return ensureCookiesAttached(apiContext, value);
    }
  });
}
function ensureCookiesAttached(apiContext, response) {
  if (apiContext.cookies !== void 0 && !responseHasCookies(response)) {
    attachCookiesToResponse(response, apiContext.cookies);
  }
  return response;
}
function isEndpointOutput(endpointResult) {
  return !(endpointResult instanceof Response) && typeof endpointResult === "object" && typeof endpointResult.body === "string";
}

const encoder = new TextEncoder();
const clientAddressSymbol = Symbol.for("astro.clientAddress");
const clientLocalsSymbol = Symbol.for("astro.locals");
function createAPIContext({
  request,
  params,
  site,
  props,
  adapterName
}) {
  const context = {
    cookies: new AstroCookies(request),
    request,
    params,
    site: site ? new URL(site) : void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    props,
    redirect(path, status) {
      return new Response(null, {
        status: status || 302,
        headers: {
          Location: path
        }
      });
    },
    ResponseWithEncoding,
    url: new URL(request.url),
    get clientAddress() {
      if (clientAddressSymbol in request) {
        return Reflect.get(request, clientAddressSymbol);
      }
      if (adapterName) {
        throw new AstroError({
          ...ClientAddressNotAvailable,
          message: ClientAddressNotAvailable.message(adapterName)
        });
      } else {
        throw new AstroError(StaticClientAddressNotAvailable);
      }
    },
    get locals() {
      let locals = Reflect.get(request, clientLocalsSymbol);
      if (locals === void 0) {
        locals = {};
        Reflect.set(request, clientLocalsSymbol, locals);
      }
      if (typeof locals !== "object") {
        throw new AstroError(LocalsNotAnObject);
      }
      return locals;
    },
    // We define a custom property, so we can check the value passed to locals
    set locals(val) {
      if (typeof val !== "object") {
        throw new AstroError(LocalsNotAnObject);
      } else {
        Reflect.set(request, clientLocalsSymbol, val);
      }
    }
  };
  return context;
}
class ResponseWithEncoding extends Response {
  constructor(body, init, encoding) {
    if (typeof body === "string") {
      if (typeof Buffer !== "undefined" && Buffer.from) {
        body = Buffer.from(body, encoding);
      } else if (encoding == null || encoding === "utf8" || encoding === "utf-8") {
        body = encoder.encode(body);
      }
    }
    super(body, init);
    if (encoding) {
      this.headers.set("X-Astro-Encoding", encoding);
    }
  }
}
async function callEndpoint(mod, env, ctx, onRequest) {
  const context = createAPIContext({
    request: ctx.request,
    params: ctx.params,
    props: ctx.props,
    site: env.site,
    adapterName: env.adapterName
  });
  let response;
  if (onRequest) {
    response = await callMiddleware(
      env.logger,
      onRequest,
      context,
      async () => {
        return await renderEndpoint(mod, context, env.ssr, env.logger);
      }
    );
  } else {
    response = await renderEndpoint(mod, context, env.ssr, env.logger);
  }
  const isEndpointSSR = env.ssr && !ctx.route?.prerender;
  if (response instanceof Response) {
    if (isEndpointSSR && response.headers.get("X-Astro-Encoding")) {
      env.logger.warn(
        "ssr",
        "`ResponseWithEncoding` is ignored in SSR. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
    attachCookiesToResponse(response, context.cookies);
    return response;
  }
  env.logger.warn(
    "astro",
    `${ctx.route.component} returns a simple object which is deprecated. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.`
  );
  if (isEndpointSSR) {
    if (response.hasOwnProperty("headers")) {
      env.logger.warn(
        "ssr",
        "Setting headers is not supported when returning an object. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
    if (response.encoding) {
      env.logger.warn(
        "ssr",
        "`encoding` is ignored in SSR. To return a charset other than UTF-8, please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
  }
  let body;
  const headers = new Headers();
  const pathname = ctx.route ? (
    // Try the static route `pathname`
    ctx.route.pathname ?? // Dynamic routes don't include `pathname`, so synthesize a path for these (e.g. 'src/pages/[slug].svg')
    ctx.route.segments.map((s) => s.map((p) => p.content).join("")).join("/")
  ) : (
    // Fallback to pathname of the request
    ctx.pathname
  );
  const mimeType = mime.getType(pathname) || "text/plain";
  headers.set("Content-Type", `${mimeType};charset=utf-8`);
  if (response.encoding) {
    headers.set("X-Astro-Encoding", response.encoding);
  }
  if (response.body instanceof Uint8Array) {
    body = response.body;
    headers.set("Content-Length", body.byteLength.toString());
  } else if (typeof Buffer !== "undefined" && Buffer.from) {
    body = Buffer.from(response.body, response.encoding);
    headers.set("Content-Length", body.byteLength.toString());
  } else if (response.encoding == null || response.encoding === "utf8" || response.encoding === "utf-8") {
    body = encoder.encode(response.body);
    headers.set("Content-Length", body.byteLength.toString());
  } else {
    body = response.body;
  }
  response = new Response(body, {
    status: 200,
    headers
  });
  attachCookiesToResponse(response, context.cookies);
  return response;
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"addEventListener(\"load\",()=>document.documentElement.classList.add(\"loaded\"));class i extends HTMLElement{constructor(){super(),this.appendChild(this.querySelector(\"template\").content.cloneNode(!0));const t=this.querySelector(\"button\"),e=document.getElementById(\"menu-content\");e.hidden=!0,e.classList.add(\"menu-content\");const n=s=>{t.setAttribute(\"aria-expanded\",s?\"true\":\"false\"),e.hidden=!s};t.addEventListener(\"click\",()=>n(e.hidden));const d=s=>{n(s.matches),t.hidden=s.matches},c=window.matchMedia(\"(min-width: 50em)\");d(c),c.addEventListener(\"change\",d)}}customElements.define(\"menu-button\",i);class a extends HTMLElement{constructor(){super();const t=this.querySelector(\"button\"),e=n=>{document.documentElement.classList[n?\"add\":\"remove\"](\"theme-dark\"),t.setAttribute(\"aria-pressed\",String(n))};t.addEventListener(\"click\",()=>e(!this.isDark())),e(this.isDark())}isDark(){return document.documentElement.classList.contains(\"theme-dark\")}}customElements.define(\"theme-toggle\",a);\n"}],"styles":[{"type":"external","src":"/_astro/about.721fde31.css"},{"type":"inline","content":".grid[data-astro-cid-vc5tsdmu]{display:grid;grid-auto-rows:1fr;gap:1rem;list-style:none;padding:0}.grid[data-astro-cid-vc5tsdmu].small{grid-template-columns:1fr 1fr;gap:1.5rem}.grid[data-astro-cid-vc5tsdmu].small>:last-child:nth-child(odd){grid-column:1 / 3}@media (min-width: 50em){.grid[data-astro-cid-vc5tsdmu]{grid-template-columns:1fr 1fr;gap:4rem}.grid[data-astro-cid-vc5tsdmu].offset{--row-offset: 7.5rem;padding-bottom:var(--row-offset)}.grid[data-astro-cid-vc5tsdmu].offset>:nth-child(odd){transform:translateY(var(--row-offset))}.grid[data-astro-cid-vc5tsdmu].offset>:last-child:nth-child(odd){grid-column:2 / 3;transform:none}.grid[data-astro-cid-vc5tsdmu].small{display:flex;flex-wrap:wrap;justify-content:center;gap:2rem}.grid[data-astro-cid-vc5tsdmu].small>*{flex-basis:20rem}}.card[data-astro-cid-lgkm4u2a]{display:grid;grid-template:auto 1fr / auto 1fr;height:11rem;background:var(--gradient-subtle);border:1px solid var(--gray-800);border-radius:.75rem;overflow:hidden;box-shadow:var(--shadow-sm);text-decoration:none;font-family:var(--font-brand);font-size:var(--text-lg);font-weight:500;transition:box-shadow var(--theme-transition)}.card[data-astro-cid-lgkm4u2a]:hover{box-shadow:var(--shadow-md)}.title[data-astro-cid-lgkm4u2a]{grid-area:1 / 1 / 2 / 2;z-index:1;margin:.5rem;padding:.5rem 1rem;background:var(--gray-999);color:var(--gray-200);border-radius:.375rem}img[data-astro-cid-lgkm4u2a]{grid-area:1 / 1 / 3 / 3;width:100%;height:100%;object-fit:cover}@media (min-width: 50em){.card[data-astro-cid-lgkm4u2a]{height:22rem;border-radius:1.5rem}.title[data-astro-cid-lgkm4u2a]{border-radius:.9375rem}}\n.pill[data-astro-cid-2qeywk4b]{display:flex;padding:.5rem 1rem;gap:.5rem;color:var(--accent-text-over);border:1px solid var(--accent-regular);background-color:var(--accent-regular);border-radius:999rem;font-size:var(--text-md);line-height:1.35;white-space:nowrap}\na[data-astro-cid-balv45lp]{position:relative;display:flex;place-content:center;text-align:center;padding:.56em 2em;gap:.8em;color:var(--accent-text-over);text-decoration:none;line-height:1.1;border-radius:999rem;overflow:hidden;background:var(--gradient-accent-orange);box-shadow:var(--shadow-md);white-space:nowrap}@media (min-width: 20em){a[data-astro-cid-balv45lp]{font-size:var(--text-lg)}}a[data-astro-cid-balv45lp]:after{content:\"\";position:absolute;inset:0;pointer-events:none;transition:background-color var(--theme-transition);mix-blend-mode:overlay}a[data-astro-cid-balv45lp]:focus:after,a[data-astro-cid-balv45lp]:hover:after{background-color:hsla(var(--gray-999-basis),.3)}@media (min-width: 50em){a[data-astro-cid-balv45lp]{padding:1.125rem 2.5rem;font-size:var(--text-xl)}}aside[data-astro-cid-rcdzuq3a]{display:flex;flex-direction:column;align-items:center;gap:3rem;border-top:1px solid var(--gray-800);border-bottom:1px solid var(--gray-800);padding:5rem 1.5rem;background-color:var(--gray-999_40);box-shadow:var(--shadow-sm)}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-xl);text-align:center;max-width:15ch}@media (min-width: 50em){aside[data-astro-cid-rcdzuq3a]{padding:7.5rem;flex-direction:row;flex-wrap:wrap;justify-content:space-between}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-3xl);text-align:left}}\n.box[data-astro-cid-ab4ihpzs]{border:1px solid var(--gray-800);border-radius:.75rem;padding:1.5rem;background-color:var(--gray-999_40);box-shadow:var(--shadow-sm)}.skills[data-astro-cid-ab4ihpzs]{display:flex;flex-direction:column;gap:3rem}.skills[data-astro-cid-ab4ihpzs] h2[data-astro-cid-ab4ihpzs]{font-size:var(--text-lg)}.skills[data-astro-cid-ab4ihpzs] p[data-astro-cid-ab4ihpzs]{color:var(--gray-400)}@media (min-width: 50em){.box[data-astro-cid-ab4ihpzs]{border-radius:1.5rem;padding:2.5rem}.skills[data-astro-cid-ab4ihpzs]{display:grid;grid-template-columns:repeat(3,1fr);gap:5rem}.skills[data-astro-cid-ab4ihpzs] h2[data-astro-cid-ab4ihpzs]{font-size:var(--text-2xl)}}.hero[data-astro-cid-j7pv25f6]{display:flex;flex-direction:column;align-items:center;gap:2rem}.roles[data-astro-cid-j7pv25f6]{display:none}.hero[data-astro-cid-j7pv25f6] img[data-astro-cid-j7pv25f6]{aspect-ratio:5 / 4;object-fit:cover;object-position:top;border-radius:1.5rem;box-shadow:var(--shadow-md)}@media (min-width: 50em){.hero[data-astro-cid-j7pv25f6]{display:grid;grid-template-columns:6fr 4fr;padding-inline:2.5rem;gap:3.75rem}.roles[data-astro-cid-j7pv25f6]{margin-top:.5rem;display:flex;gap:.5rem}.hero[data-astro-cid-j7pv25f6] img[data-astro-cid-j7pv25f6]{aspect-ratio:3 / 4;border-radius:4.5rem;object-fit:cover}}.section[data-astro-cid-j7pv25f6]{display:grid;gap:2rem}.with-background[data-astro-cid-j7pv25f6]{position:relative}.with-background[data-astro-cid-j7pv25f6]:before{--hero-bg: var(--bg-image-subtle-2);content:\"\";position:absolute;pointer-events:none;left:50%;width:100vw;aspect-ratio:calc(2.25 / var(--bg-scale));top:0;transform:translateY(-75%) translate(-50%);background:url(/assets/backgrounds/noise.png) top center/220px repeat,var(--hero-bg) center center / var(--bg-gradient-size) no-repeat,var(--gray-999);background-blend-mode:overlay,normal,normal,normal;mix-blend-mode:var(--bg-blend-mode);z-index:-1}.with-background[data-astro-cid-j7pv25f6].bg-variant:before{--hero-bg: var(--bg-image-subtle-1)}.section-header[data-astro-cid-j7pv25f6]{justify-self:center;text-align:center;max-width:50ch;font-size:var(--text-md);color:var(--gray-300)}.section-header[data-astro-cid-j7pv25f6] h3[data-astro-cid-j7pv25f6]{font-size:var(--text-2xl)}@media (min-width: 50em){.section[data-astro-cid-j7pv25f6]{grid-template-columns:repeat(4,1fr);grid-template-areas:\"header header header header\" \"gallery gallery gallery gallery\";gap:5rem}.section[data-astro-cid-j7pv25f6].with-cta{grid-template-areas:\"header header header cta\" \"gallery gallery gallery gallery\"}.section-header[data-astro-cid-j7pv25f6]{grid-area:header;font-size:var(--text-lg)}.section-header[data-astro-cid-j7pv25f6] h3[data-astro-cid-j7pv25f6]{font-size:var(--text-4xl)}.with-cta[data-astro-cid-j7pv25f6] .section-header[data-astro-cid-j7pv25f6]{justify-self:flex-start;text-align:left}.gallery[data-astro-cid-j7pv25f6]{grid-area:gallery}.cta[data-astro-cid-j7pv25f6]{grid-area:cta}}.mention-card[data-astro-cid-j7pv25f6]{display:flex;height:7rem;justify-content:center;align-items:center;text-align:center;border:1px solid var(--gray-800);border-radius:1.5rem;color:var(--gray-300);background:var(--gradient-subtle);box-shadow:var(--shadow-sm)}@media (min-width: 50em){.mention-card[data-astro-cid-j7pv25f6]{border-radius:1.5rem;height:9.5rem}}\nsvg[data-astro-cid-patnjmll]{vertical-align:middle;width:var(--size, 1em);height:var(--size, 1em)}\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"addEventListener(\"load\",()=>document.documentElement.classList.add(\"loaded\"));class i extends HTMLElement{constructor(){super(),this.appendChild(this.querySelector(\"template\").content.cloneNode(!0));const t=this.querySelector(\"button\"),e=document.getElementById(\"menu-content\");e.hidden=!0,e.classList.add(\"menu-content\");const n=s=>{t.setAttribute(\"aria-expanded\",s?\"true\":\"false\"),e.hidden=!s};t.addEventListener(\"click\",()=>n(e.hidden));const d=s=>{n(s.matches),t.hidden=s.matches},c=window.matchMedia(\"(min-width: 50em)\");d(c),c.addEventListener(\"change\",d)}}customElements.define(\"menu-button\",i);class a extends HTMLElement{constructor(){super();const t=this.querySelector(\"button\"),e=n=>{document.documentElement.classList[n?\"add\":\"remove\"](\"theme-dark\"),t.setAttribute(\"aria-pressed\",String(n))};t.addEventListener(\"click\",()=>e(!this.isDark())),e(this.isDark())}isDark(){return document.documentElement.classList.contains(\"theme-dark\")}}customElements.define(\"theme-toggle\",a);\n"}],"styles":[{"type":"external","src":"/_astro/about.721fde31.css"},{"type":"inline","content":"a[data-astro-cid-balv45lp]{position:relative;display:flex;place-content:center;text-align:center;padding:.56em 2em;gap:.8em;color:var(--accent-text-over);text-decoration:none;line-height:1.1;border-radius:999rem;overflow:hidden;background:var(--gradient-accent-orange);box-shadow:var(--shadow-md);white-space:nowrap}@media (min-width: 20em){a[data-astro-cid-balv45lp]{font-size:var(--text-lg)}}a[data-astro-cid-balv45lp]:after{content:\"\";position:absolute;inset:0;pointer-events:none;transition:background-color var(--theme-transition);mix-blend-mode:overlay}a[data-astro-cid-balv45lp]:focus:after,a[data-astro-cid-balv45lp]:hover:after{background-color:hsla(var(--gray-999-basis),.3)}@media (min-width: 50em){a[data-astro-cid-balv45lp]{padding:1.125rem 2.5rem;font-size:var(--text-xl)}}aside[data-astro-cid-rcdzuq3a]{display:flex;flex-direction:column;align-items:center;gap:3rem;border-top:1px solid var(--gray-800);border-bottom:1px solid var(--gray-800);padding:5rem 1.5rem;background-color:var(--gray-999_40);box-shadow:var(--shadow-sm)}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-xl);text-align:center;max-width:15ch}@media (min-width: 50em){aside[data-astro-cid-rcdzuq3a]{padding:7.5rem;flex-direction:row;flex-wrap:wrap;justify-content:space-between}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-3xl);text-align:left}}\n.about[data-astro-cid-kh7btl4r]{display:flex;flex-direction:column;gap:3.5rem}img[data-astro-cid-kh7btl4r]{margin-top:1.5rem;border-radius:1.5rem;box-shadow:var(--shadow-md)}section[data-astro-cid-kh7btl4r]{display:flex;flex-direction:column;gap:.5rem;color:var(--gray-200)}.section-title[data-astro-cid-kh7btl4r]{grid-column-start:1;font-size:var(--text-xl);color:var(--gray-0)}.content[data-astro-cid-kh7btl4r]{grid-column:2 / 4}.content[data-astro-cid-kh7btl4r] a{text-decoration:1px solid underline transparent;text-underline-offset:.25em;transition:text-decoration-color var(--theme-transition)}.content[data-astro-cid-kh7btl4r] a:hover,.content[data-astro-cid-kh7btl4r] a:focus{text-decoration-color:currentColor}@media (min-width: 50em){.about[data-astro-cid-kh7btl4r]{display:grid;grid-template-columns:1fr 60% 1fr}.about[data-astro-cid-kh7btl4r]>:first-child{grid-column-start:2}section[data-astro-cid-kh7btl4r]{display:contents;font-size:var(--text-lg)}}\nsvg[data-astro-cid-patnjmll]{vertical-align:middle;width:var(--size, 1em);height:var(--size, 1em)}\n"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"addEventListener(\"load\",()=>document.documentElement.classList.add(\"loaded\"));class i extends HTMLElement{constructor(){super(),this.appendChild(this.querySelector(\"template\").content.cloneNode(!0));const t=this.querySelector(\"button\"),e=document.getElementById(\"menu-content\");e.hidden=!0,e.classList.add(\"menu-content\");const n=s=>{t.setAttribute(\"aria-expanded\",s?\"true\":\"false\"),e.hidden=!s};t.addEventListener(\"click\",()=>n(e.hidden));const d=s=>{n(s.matches),t.hidden=s.matches},c=window.matchMedia(\"(min-width: 50em)\");d(c),c.addEventListener(\"change\",d)}}customElements.define(\"menu-button\",i);class a extends HTMLElement{constructor(){super();const t=this.querySelector(\"button\"),e=n=>{document.documentElement.classList[n?\"add\":\"remove\"](\"theme-dark\"),t.setAttribute(\"aria-pressed\",String(n))};t.addEventListener(\"click\",()=>e(!this.isDark())),e(this.isDark())}isDark(){return document.documentElement.classList.contains(\"theme-dark\")}}customElements.define(\"theme-toggle\",a);\n"}],"styles":[{"type":"external","src":"/_astro/about.721fde31.css"},{"type":"inline","content":"a[data-astro-cid-balv45lp]{position:relative;display:flex;place-content:center;text-align:center;padding:.56em 2em;gap:.8em;color:var(--accent-text-over);text-decoration:none;line-height:1.1;border-radius:999rem;overflow:hidden;background:var(--gradient-accent-orange);box-shadow:var(--shadow-md);white-space:nowrap}@media (min-width: 20em){a[data-astro-cid-balv45lp]{font-size:var(--text-lg)}}a[data-astro-cid-balv45lp]:after{content:\"\";position:absolute;inset:0;pointer-events:none;transition:background-color var(--theme-transition);mix-blend-mode:overlay}a[data-astro-cid-balv45lp]:focus:after,a[data-astro-cid-balv45lp]:hover:after{background-color:hsla(var(--gray-999-basis),.3)}@media (min-width: 50em){a[data-astro-cid-balv45lp]{padding:1.125rem 2.5rem;font-size:var(--text-xl)}}aside[data-astro-cid-rcdzuq3a]{display:flex;flex-direction:column;align-items:center;gap:3rem;border-top:1px solid var(--gray-800);border-bottom:1px solid var(--gray-800);padding:5rem 1.5rem;background-color:var(--gray-999_40);box-shadow:var(--shadow-sm)}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-xl);text-align:center;max-width:15ch}@media (min-width: 50em){aside[data-astro-cid-rcdzuq3a]{padding:7.5rem;flex-direction:row;flex-wrap:wrap;justify-content:space-between}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-3xl);text-align:left}}\n.grid[data-astro-cid-vc5tsdmu]{display:grid;grid-auto-rows:1fr;gap:1rem;list-style:none;padding:0}.grid[data-astro-cid-vc5tsdmu].small{grid-template-columns:1fr 1fr;gap:1.5rem}.grid[data-astro-cid-vc5tsdmu].small>:last-child:nth-child(odd){grid-column:1 / 3}@media (min-width: 50em){.grid[data-astro-cid-vc5tsdmu]{grid-template-columns:1fr 1fr;gap:4rem}.grid[data-astro-cid-vc5tsdmu].offset{--row-offset: 7.5rem;padding-bottom:var(--row-offset)}.grid[data-astro-cid-vc5tsdmu].offset>:nth-child(odd){transform:translateY(var(--row-offset))}.grid[data-astro-cid-vc5tsdmu].offset>:last-child:nth-child(odd){grid-column:2 / 3;transform:none}.grid[data-astro-cid-vc5tsdmu].small{display:flex;flex-wrap:wrap;justify-content:center;gap:2rem}.grid[data-astro-cid-vc5tsdmu].small>*{flex-basis:20rem}}.card[data-astro-cid-lgkm4u2a]{display:grid;grid-template:auto 1fr / auto 1fr;height:11rem;background:var(--gradient-subtle);border:1px solid var(--gray-800);border-radius:.75rem;overflow:hidden;box-shadow:var(--shadow-sm);text-decoration:none;font-family:var(--font-brand);font-size:var(--text-lg);font-weight:500;transition:box-shadow var(--theme-transition)}.card[data-astro-cid-lgkm4u2a]:hover{box-shadow:var(--shadow-md)}.title[data-astro-cid-lgkm4u2a]{grid-area:1 / 1 / 2 / 2;z-index:1;margin:.5rem;padding:.5rem 1rem;background:var(--gray-999);color:var(--gray-200);border-radius:.375rem}img[data-astro-cid-lgkm4u2a]{grid-area:1 / 1 / 3 / 3;width:100%;height:100%;object-fit:cover}@media (min-width: 50em){.card[data-astro-cid-lgkm4u2a]{height:22rem;border-radius:1.5rem}.title[data-astro-cid-lgkm4u2a]{border-radius:.9375rem}}\nsvg[data-astro-cid-patnjmll]{vertical-align:middle;width:var(--size, 1em);height:var(--size, 1em)}\n"}],"routeData":{"route":"/work","type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"addEventListener(\"load\",()=>document.documentElement.classList.add(\"loaded\"));class i extends HTMLElement{constructor(){super(),this.appendChild(this.querySelector(\"template\").content.cloneNode(!0));const t=this.querySelector(\"button\"),e=document.getElementById(\"menu-content\");e.hidden=!0,e.classList.add(\"menu-content\");const n=s=>{t.setAttribute(\"aria-expanded\",s?\"true\":\"false\"),e.hidden=!s};t.addEventListener(\"click\",()=>n(e.hidden));const d=s=>{n(s.matches),t.hidden=s.matches},c=window.matchMedia(\"(min-width: 50em)\");d(c),c.addEventListener(\"change\",d)}}customElements.define(\"menu-button\",i);class a extends HTMLElement{constructor(){super();const t=this.querySelector(\"button\"),e=n=>{document.documentElement.classList[n?\"add\":\"remove\"](\"theme-dark\"),t.setAttribute(\"aria-pressed\",String(n))};t.addEventListener(\"click\",()=>e(!this.isDark())),e(this.isDark())}isDark(){return document.documentElement.classList.contains(\"theme-dark\")}}customElements.define(\"theme-toggle\",a);\n"}],"styles":[{"type":"external","src":"/_astro/about.721fde31.css"},{"type":"inline","content":"svg[data-astro-cid-patnjmll]{vertical-align:middle;width:var(--size, 1em);height:var(--size, 1em)}\n"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/Users/eric-pat/portfolio/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/eric-pat/portfolio/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/eric-pat/portfolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/eric-pat/portfolio/src/pages/work.astro",{"propagation":"in-tree","containsHead":true}],["/Users/eric-pat/portfolio/src/pages/work/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/work@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/work/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_42984153.mjs","/src/pages/work.astro":"chunks/pages/work_bd1bf597.mjs","/src/pages/work/[...slug].astro":"chunks/prerender_d508c03c.mjs","\u0000@astrojs-manifest":"manifest_b210facc.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_b18883cd.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_bbee44dc.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_9c16974c.mjs","\u0000@astro-page:src/pages/work/[...slug]@_@astro":"chunks/_.._28d64e78.mjs","\u0000@astro-page:src/pages/work@_@astro":"chunks/work_26899c10.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_e08e0dc1.mjs","/Users/eric-pat/portfolio/src/content/work/chez-nos-producteurs.md?astroContentCollectionEntry=true":"chunks/chez-nos-producteurs_2b9dfb20.mjs","/Users/eric-pat/portfolio/src/content/work/cse.md?astroContentCollectionEntry=true":"chunks/cse_42487896.mjs","/Users/eric-pat/portfolio/src/content/work/editions-le-garage.md?astroContentCollectionEntry=true":"chunks/editions-le-garage_8dc544e5.mjs","/Users/eric-pat/portfolio/src/content/work/epweb.md?astroContentCollectionEntry=true":"chunks/epweb_ac478749.mjs","/Users/eric-pat/portfolio/src/content/work/portfolio.md?astroContentCollectionEntry=true":"chunks/portfolio_64b6e961.mjs","/Users/eric-pat/portfolio/src/content/work/chez-nos-producteurs.md?astroPropagatedAssets":"chunks/chez-nos-producteurs_d62daf32.mjs","/Users/eric-pat/portfolio/src/content/work/cse.md?astroPropagatedAssets":"chunks/cse_98ee5bbf.mjs","/Users/eric-pat/portfolio/src/content/work/editions-le-garage.md?astroPropagatedAssets":"chunks/editions-le-garage_18255540.mjs","/Users/eric-pat/portfolio/src/content/work/epweb.md?astroPropagatedAssets":"chunks/epweb_b298c085.mjs","/Users/eric-pat/portfolio/src/content/work/portfolio.md?astroPropagatedAssets":"chunks/portfolio_d7450c07.mjs","/Users/eric-pat/portfolio/src/content/work/chez-nos-producteurs.md":"chunks/chez-nos-producteurs_c0cd36e0.mjs","/Users/eric-pat/portfolio/src/content/work/cse.md":"chunks/cse_a06aeb2f.mjs","/Users/eric-pat/portfolio/src/content/work/editions-le-garage.md":"chunks/editions-le-garage_16628790.mjs","/Users/eric-pat/portfolio/src/content/work/epweb.md":"chunks/epweb_ce3a8613.mjs","/Users/eric-pat/portfolio/src/content/work/portfolio.md":"chunks/portfolio_f1c3ac79.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.e0f48d08.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/portrait.116d69b9.webp","/_astro/competences.18afa6bf.webp","/_astro/about.721fde31.css","/cv.pdf","/favicon.svg","/portfolio.webp","/assets/ce-rottersac.webp","/assets/chez-nos-producteurs.webp","/assets/editions-le-garage.webp","/assets/epweb.webp","/assets/portfolio.webp","/assets/backgrounds/bg-footer-dark-1440w.jpg","/assets/backgrounds/bg-footer-dark-800w.jpg","/assets/backgrounds/bg-footer-light-1440w.jpg","/assets/backgrounds/bg-footer-light-800w.jpg","/assets/backgrounds/bg-main-dark-1440w.jpg","/assets/backgrounds/bg-main-dark-800w.jpg","/assets/backgrounds/bg-main-dark.svg","/assets/backgrounds/bg-main-light-1440w.jpg","/assets/backgrounds/bg-main-light-800w.jpg","/assets/backgrounds/bg-main-light.svg","/assets/backgrounds/bg-subtle-1-dark-1440w.jpg","/assets/backgrounds/bg-subtle-1-dark-800w.jpg","/assets/backgrounds/bg-subtle-1-light-1440w.jpg","/assets/backgrounds/bg-subtle-1-light-800w.jpg","/assets/backgrounds/bg-subtle-2-dark-1440w.jpg","/assets/backgrounds/bg-subtle-2-dark-800w.jpg","/assets/backgrounds/bg-subtle-2-light-1440w.jpg","/assets/backgrounds/bg-subtle-2-light-800w.jpg","/assets/backgrounds/noise.png"]});

export { AstroCookies as A, Logger as L, attachCookiesToResponse as a, callEndpoint as b, createAPIContext as c, dateTimeFormat as d, callMiddleware as e, AstroIntegrationLogger as f, getSetCookiesFromResponse as g, levels as l, manifest };
