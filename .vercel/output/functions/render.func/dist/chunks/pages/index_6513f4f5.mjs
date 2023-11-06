import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, j as renderSlot, h as renderComponent } from '../astro_9d89acda.mjs';
import { g as getCollection, a as $$Pill, b as $$CallToAction, $ as $$ContactCTA } from './__1ab0619f.mjs';
import { $ as $$Icon, b as $$Hero, a as $$BaseLayout } from './404_725f1d28.mjs';
import 'clsx';
/* empty css                           *//* empty css                           */
const $$Astro$3 = createAstro();
const $$Grid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Grid;
  const { variant } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute(["grid", { offset: variant === "offset", small: variant === "small" }], "class:list")} data-astro-cid-vc5tsdmu>${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/eric-pat/portfolio/src/components/Grid.astro", void 0);

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
  return renderTemplate`${maybeRenderHead()}<section class="box skills" data-astro-cid-ab4ihpzs><div class="stack gap-2 lg:gap-4" data-astro-cid-ab4ihpzs>${renderComponent($$result, "Icon", $$Icon, { "icon": "terminal-window", "color": "var(--accent-regular)", "size": "2.5rem", "gradient": true, "data-astro-cid-ab4ihpzs": true })}<h2 data-astro-cid-ab4ihpzs>Full Stack</h2><p data-astro-cid-ab4ihpzs>J'adore Symfony, les défis, voir de nouvelles techno et j'aime suivre les projets du développement jusqu'à la
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="stack gap-20 lg:gap-48" data-astro-cid-j7pv25f6><div class="wrapper stack gap-8 lg:gap-20" data-astro-cid-j7pv25f6><header class="hero" data-astro-cid-j7pv25f6>${renderComponent($$result2, "Hero", $$Hero, { "title": "Hello, je m'appelle Eric Patrouillault", "tagline": "Je suis D\xE9veloppeur Fullstack et cr\xE9ateur de site web.", "align": "start", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`<div class="roles" data-astro-cid-j7pv25f6>${renderComponent($$result3, "Pill", $$Pill, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "icon": "code", "size": "1.33em", "data-astro-cid-j7pv25f6": true })} Développeur` })}</div>` })}<img alt="Eric avec un grand sourire" width="480" height="620"${addAttribute(myPortrait.src, "src")} data-astro-cid-j7pv25f6></header>${renderComponent($$result2, "Skills", $$Skills, { "data-astro-cid-j7pv25f6": true })}</div><main class="wrapper stack gap-20 lg:gap-48" data-astro-cid-j7pv25f6><section class="section with-background with-cta" data-astro-cid-j7pv25f6><header class="section-header stack gap-2 lg:gap-4" data-astro-cid-j7pv25f6><h3 data-astro-cid-j7pv25f6>Mes derniers Projets</h3><p data-astro-cid-j7pv25f6>Jetez un œil ci-dessous à mes projets les plus récents pour les clients ou pour moi-même.</p></header><div class="gallery" data-astro-cid-j7pv25f6>${renderComponent($$result2, "Grid", $$Grid, { "variant": "offset", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`${projects.map((project) => renderTemplate`<li data-astro-cid-j7pv25f6>${renderComponent($$result3, "PortfolioPreview", $$PortfolioPreview, { "project": project, "data-astro-cid-j7pv25f6": true })}</li>`)}` })}</div><div class="cta" data-astro-cid-j7pv25f6>${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/work/", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
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

export { $$Grid as $, $$PortfolioPreview as a, index as i };
