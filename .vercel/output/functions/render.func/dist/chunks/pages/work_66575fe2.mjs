import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_9d89acda.mjs';
import 'clsx';
import { g as getCollection, $ as $$ContactCTA } from './__1ab0619f.mjs';
import { b as $$Hero, a as $$BaseLayout } from './404_725f1d28.mjs';
import { $ as $$Grid, a as $$PortfolioPreview } from './index_6513f4f5.mjs';
import 'html-escaper';
import '../astro-assets-services_d08b78ec.mjs';
/* empty css                           *//* empty css                           *//* empty css                            *//* empty css                           *//* empty css                           *//* empty css                           *//* empty css                           */
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
