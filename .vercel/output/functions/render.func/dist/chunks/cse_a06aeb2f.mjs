import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_1aa3d2dc.mjs';
import 'clsx';
import 'html-escaper';

const html = "<p>Le site CSE Rottersac est une plateforme polyvalente qui facilite les locations de vacances, la billetterie, les\navantages pour les commerçants, les événements d’arbre de Noël et les allocations. Il vise à offrir une expérience complète aux utilisateurs, en leur permettant de gérer facilement leurs réservations de vacances, d’accéder à des offres de billetterie exclusives, de profiter d’avantages spéciaux auprès des commerçants partenaires, de participer à des événements de Noël et de gérer leurs allocations.</p>\n<p>Le site CSE Rottersac propose également une fonctionnalité de backend permettant aux élus du CSE de modifier les avantages à leur guise. Cette fonctionnalité donne aux responsables la flexibilité de gérer et de mettre à jour les offres spéciales et les avantages proposés sur la plateforme en fonction des besoins changeants de la communauté.</p>";

				const frontmatter = {"title":"Comité Social d'entreprise","publishDate":"2023-11-01T00:00:00.000Z","img":"/assets/ce-rottersac.webp","img_alt":"Image du site du CSE Rottersac","description":"Site créé en collaboration avec l'entreprise Digi-websolutions (24).\n","tags":["Symfony","FullCalendar","Template","UIkit","Ovh"]};
				const file = "/Users/eric-pat/portfolio/src/content/work/cse.md";
				const url = undefined;
				function rawContent() {
					return "\nLe site CSE Rottersac est une plateforme polyvalente qui facilite les locations de vacances, la billetterie, les\navantages pour les commerçants, les événements d'arbre de Noël et les allocations. Il vise à offrir une expérience complète aux utilisateurs, en leur permettant de gérer facilement leurs réservations de vacances, d'accéder à des offres de billetterie exclusives, de profiter d'avantages spéciaux auprès des commerçants partenaires, de participer à des événements de Noël et de gérer leurs allocations.\n\nLe site CSE Rottersac propose également une fonctionnalité de backend permettant aux élus du CSE de modifier les avantages à leur guise. Cette fonctionnalité donne aux responsables la flexibilité de gérer et de mettre à jour les offres spéciales et les avantages proposés sur la plateforme en fonction des besoins changeants de la communauté.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
