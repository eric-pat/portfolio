import { A as AstroError, l as UnknownContentCollectionError, f as createComponent, n as renderUniqueStylesheet, o as renderScriptElement, p as createHeadAndContent, r as renderTemplate, h as renderComponent, u as unescapeHTML, e as createAstro, m as maybeRenderHead, g as addAttribute, j as renderSlot } from '../astro_1aa3d2dc.mjs';
import { p as prependForwardSlash } from '../astro-assets-services_f72ae019.mjs';
import 'clsx';
import { $ as $$Icon, a as $$Hero, b as $$BaseLayout } from './404_ada6498a.mjs';
import { $ as $$CallToAction, a as $$ContactCTA } from './about_f0f7b983.mjs';
/* empty css                           *//* empty css                           *//* empty css                           */
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection **${collection}** does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} \u2192 ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/work/chez-nos-producteurs.md": () => import('../chez-nos-producteurs_2b9dfb20.mjs'),"/src/content/work/cse.md": () => import('../cse_42487896.mjs'),"/src/content/work/editions-le-garage.md": () => import('../editions-le-garage_8dc544e5.mjs'),"/src/content/work/epweb.md": () => import('../epweb_4d634b86.mjs'),"/src/content/work/portfolio.md": () => import('../portfolio_64b6e961.mjs')

});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({

});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"work":{"type":"content","entries":{"chez-nos-producteurs":"/src/content/work/chez-nos-producteurs.md","cse":"/src/content/work/cse.md","epweb":"/src/content/work/epweb.md","portfolio":"/src/content/work/portfolio.md","editions-le-garage":"/src/content/work/editions-le-garage.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/work/chez-nos-producteurs.md": () => import('../chez-nos-producteurs_d62daf32.mjs'),"/src/content/work/cse.md": () => import('../cse_98ee5bbf.mjs'),"/src/content/work/editions-le-garage.md": () => import('../editions-le-garage_18255540.mjs'),"/src/content/work/epweb.md": () => import('../epweb_3c145134.mjs'),"/src/content/work/portfolio.md": () => import('../portfolio_d7450c07.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$4 = createAstro();
const $$Grid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Grid;
  const { variant } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute(["grid", { offset: variant === "offset", small: variant === "small" }], "class:list")} data-astro-cid-vc5tsdmu>${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/eric-pat/portfolio/src/components/Grid.astro", void 0);

const $$Astro$3 = createAstro();
const $$Pill = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Pill;
  return renderTemplate`${maybeRenderHead()}<div class="pill" data-astro-cid-2qeywk4b>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/eric-pat/portfolio/src/components/Pill.astro", void 0);

const $$Astro$2 = createAstro();
const $$PortfolioPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PortfolioPreview;
  const { data, slug } = Astro2.props.project;
  return renderTemplate`${maybeRenderHead()}<a class="card"${addAttribute(`/work/${slug}`, "href")} data-astro-cid-lgkm4u2a><span class="title" data-astro-cid-lgkm4u2a>${data.title}</span><img${addAttribute(data.img, "src")}${addAttribute(data.img_alt || "", "alt")} loading="lazy" decoding="async" data-astro-cid-lgkm4u2a></a>`;
}, "/Users/eric-pat/portfolio/src/components/PortfolioPreview.astro", void 0);

const $$Astro$1 = createAstro();
const $$Skills = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Skills;
  return renderTemplate`${maybeRenderHead()}<section class="box skills" data-astro-cid-ab4ihpzs><div class="stack gap-2 lg:gap-4" data-astro-cid-ab4ihpzs>${renderComponent($$result, "Icon", $$Icon, { "icon": "terminal-window", "color": "var(--accent-regular)", "size": "2.5rem", "gradient": true, "data-astro-cid-ab4ihpzs": true })}<h2 data-astro-cid-ab4ihpzs>Full Stack</h2><p data-astro-cid-ab4ihpzs>J'adore les défis, voir de nouvelles technos et j'aime suivre les projets du développement jusqu'à la
			mise en production.</p></div><div class="stack gap-2 lg:gap-4" data-astro-cid-ab4ihpzs>${renderComponent($$result, "Icon", $$Icon, { "icon": "trophy", "color": "var(--accent-regular)", "size": "2.5rem", "gradient": true, "data-astro-cid-ab4ihpzs": true })}<h2 data-astro-cid-ab4ihpzs>Lifelong learning</h2><p data-astro-cid-ab4ihpzs>Se tenir au courant des dernières avancées et des nouvelles technologies est essentiel pour réussir dans ce
			domaine en perpétuelle mutation.</p></div><div class="stack gap-2 lg:gap-4" data-astro-cid-ab4ihpzs>${renderComponent($$result, "Icon", $$Icon, { "icon": "strategy", "color": "var(--accent-regular)", "size": "2.5rem", "gradient": true, "data-astro-cid-ab4ihpzs": true })}<h2 data-astro-cid-ab4ihpzs>Versatile</h2><p data-astro-cid-ab4ihpzs>Je suis polyvalent, capable de travailler aussi bien en équipe que de manière autonome pour atteindre les
			objectifs fixés.</p></div></section>`;
}, "/Users/eric-pat/portfolio/src/components/Skills.astro", void 0);

const myPortrait = {"src":"/_astro/portrait.116d69b9.webp","width":2316,"height":3088,"format":"webp","orientation":1};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const projects = (await getCollection("work")).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()).slice(0, 4);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="stack gap-20 lg:gap-48" data-astro-cid-j7pv25f6><div class="wrapper stack gap-8 lg:gap-20" data-astro-cid-j7pv25f6><header class="hero" data-astro-cid-j7pv25f6>${renderComponent($$result2, "Hero", $$Hero, { "title": "Hello, je m'appelle Eric Patrouillault", "tagline": "Je suis D\xE9veloppeur Fullstack.", "align": "start", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`<div class="roles" data-astro-cid-j7pv25f6>${renderComponent($$result3, "Pill", $$Pill, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "icon": "code", "size": "1.33em", "data-astro-cid-j7pv25f6": true })} Symfony` })}${renderComponent($$result3, "Pill", $$Pill, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "icon": "code", "size": "1.33em", "data-astro-cid-j7pv25f6": true })} Php` })}${renderComponent($$result3, "Pill", $$Pill, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "icon": "code", "size": "1.33em", "data-astro-cid-j7pv25f6": true })} Javascript` })}${renderComponent($$result3, "Pill", $$Pill, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "icon": "code", "size": "1.33em", "data-astro-cid-j7pv25f6": true })} React` })}${renderComponent($$result3, "Pill", $$Pill, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "icon": "code", "size": "1.33em", "data-astro-cid-j7pv25f6": true })} Bootstrap` })}${renderComponent($$result3, "Pill", $$Pill, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "icon": "code", "size": "1.33em", "data-astro-cid-j7pv25f6": true })} Tailwind` })}</div>` })}<img alt=" Moi avec un grand sourire" width="480" height="620"${addAttribute(myPortrait.src, "src")} data-astro-cid-j7pv25f6></header>${renderComponent($$result2, "Skills", $$Skills, { "data-astro-cid-j7pv25f6": true })}</div><main class="wrapper stack gap-20 lg:gap-48" data-astro-cid-j7pv25f6><section class="section with-background with-cta" data-astro-cid-j7pv25f6><header class="section-header stack gap-2 lg:gap-4" data-astro-cid-j7pv25f6><h3 data-astro-cid-j7pv25f6>Mes derniers Projets</h3><p data-astro-cid-j7pv25f6>
Jetez un œil ci-dessous à mes projets les plus récents pour les
            clients ou pour moi-même.
</p></header><div class="gallery" data-astro-cid-j7pv25f6>${renderComponent($$result2, "Grid", $$Grid, { "variant": "offset", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`${projects.map((project) => renderTemplate`<li data-astro-cid-j7pv25f6>${renderComponent($$result3, "PortfolioPreview", $$PortfolioPreview, { "project": project, "data-astro-cid-j7pv25f6": true })}</li>`)}` })}</div><div class="cta" data-astro-cid-j7pv25f6>${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/work/", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
En voir plus
${renderComponent($$result3, "Icon", $$Icon, { "icon": "arrow-right", "size": "1.2em", "data-astro-cid-j7pv25f6": true })}` })}</div></section></main>${renderComponent($$result2, "ContactCTA", $$ContactCTA, { "data-astro-cid-j7pv25f6": true })}</div>` })}`;
}, "/Users/eric-pat/portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/eric-pat/portfolio/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Grid as $, $$PortfolioPreview as a, $$Pill as b, getCollection as g, index as i };
