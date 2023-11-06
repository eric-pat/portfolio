import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead, g as addAttribute } from '../astro_9d89acda.mjs';
import { b as $$Hero, a as $$BaseLayout } from './404_725f1d28.mjs';
import { $ as $$ContactCTA } from './__1ab0619f.mjs';
/* empty css                           */import 'clsx';
import 'html-escaper';
/* empty css                           *//* empty css                           */import '../astro-assets-services_d08b78ec.mjs';
/* empty css                           *//* empty css                           *//* empty css                            */
const imgAbout = {"src":"/_astro/competences.18afa6bf.webp","width":1459,"height":973,"format":"webp","orientation":1};

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Eric Patrouillault | \xC0 propos", "description": "\xC0 propos de Eric Patrouillault", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="stack gap-20" data-astro-cid-kh7btl4r><main class="wrapper about" data-astro-cid-kh7btl4r>${renderComponent($$result2, "Hero", $$Hero, { "title": "\xC0 propos", "tagline": "Les d\xE9tails sur mon parcours et mes comp\xE9tences.", "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate`<img width="1553" height="873"${addAttribute(imgAbout.src, "src")} alt="Eric travaille à la maison sur ses écrans d'ordinateur" data-astro-cid-kh7btl4r>` })}<section data-astro-cid-kh7btl4r><h2 class="section-title" data-astro-cid-kh7btl4r>Background</h2><div class="content" data-astro-cid-kh7btl4r><p data-astro-cid-kh7btl4r>
Après seize années de service dévoué dans l'armée de terre, puis en tant que chauffeur PL,
						magasinier, ou encore ouvrier de production, j'ai entrepris en 2020 une passionnante transition
						professionnelle vers le développement web au sein de l'entreprise Zentux. Cette expérience m'a
						permis d'explorer différentes technologies telles que l'EDI (échange de données informatisé),
						HTML, CSS, ainsi que le système de gestion de contenu (CMS) 'Gaïa'. </p><p data-astro-cid-kh7btl4r>
Je sors d'un bootcamp intense à la Wild Code School ou j'ai acquis des compétences avancées en
						PHP et Symfony. </p><p data-astro-cid-kh7btl4r>
Mon enthousiasme pour l'apprentissage continu m'incite à rester à l'affût des dernières avancées
						technologiques, prêt à relever de nouveaux défis passionnants dans le domaine du développement
						web. </p></div></section><section data-astro-cid-kh7btl4r><h2 class="section-title" data-astro-cid-kh7btl4r>Education</h2><div class="content" data-astro-cid-kh7btl4r><p data-astro-cid-kh7btl4r>Wild Code School de bordeaux : Développeur web / php / symfony</p></div></section><section data-astro-cid-kh7btl4r><h2 class="section-title" data-astro-cid-kh7btl4r>Skills</h2><div class="content" data-astro-cid-kh7btl4r><p data-astro-cid-kh7btl4r>Autonome, Organisé, Travail d'équipe, Polyvalent, Communication, travailleur et fiable...</p></div></section><section data-astro-cid-kh7btl4r><h2 class="section-title" data-astro-cid-kh7btl4r>Cv</h2><div class="content" data-astro-cid-kh7btl4r><a href="/cv.pdf" target="_blank" data-astro-cid-kh7btl4r>mon Cv pdf</a></div></section></main>${renderComponent($$result2, "ContactCTA", $$ContactCTA, { "data-astro-cid-kh7btl4r": true })}</div>` })}`;
}, "/Users/eric-pat/portfolio/src/pages/about.astro", void 0);

const $$file = "/Users/eric-pat/portfolio/src/pages/about.astro";
const $$url = "/about";

export { $$About as default, $$file as file, $$url as url };
