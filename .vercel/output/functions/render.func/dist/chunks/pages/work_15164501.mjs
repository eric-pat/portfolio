import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_1aa3d2dc.mjs';
import 'clsx';
import { g as getCollection, $ as $$Grid, a as $$PortfolioPreview } from './index_449b156d.mjs';
import { a as $$Hero, b as $$BaseLayout } from './404_ada6498a.mjs';
import { a as $$ContactCTA } from './about_f0f7b983.mjs';
import 'html-escaper';
import '../astro-assets-services_f72ae019.mjs';
/* empty css                           *//* empty css                           *//* empty css                           *//* empty css                           *//* empty css                           *//* empty css                           *//* empty css                           */
const $$Astro = createAstro();
const $$Work = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Work;
  const projects = (await getCollection("work")).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Eric Patrouillault | Mes Projets", "description": "D\xE9couvrez les projets les plus r\xE9cents de Eric Patrouillault" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="stack gap-20"><main class="wrapper stack gap-8">${renderComponent($$result2, "Hero", $$Hero, { "title": "Mes Projets", "tagline": "D\xE9couvrez ci-dessous mes projets r\xE9cents pour un aper\xE7u de mon parcours professionnel.", "align": "start" })}${renderComponent($$result2, "Grid", $$Grid, { "variant": "offset" }, { "default": ($$result3) => renderTemplate`${projects.map((project) => renderTemplate`<li>${renderComponent($$result3, "PortfolioPreview", $$PortfolioPreview, { "project": project })}</li>`)}` })}</main>${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})}</div>` })}`;
}, "/Users/eric-pat/portfolio/src/pages/work.astro", void 0);

const $$file = "/Users/eric-pat/portfolio/src/pages/work.astro";
const $$url = "/work";

export { $$Work as default, $$file as file, $$url as url };
