import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_1aa3d2dc.mjs';
import 'clsx';
import 'html-escaper';

const html = "<p>Le concept Chez Nos Producteurs</p>\n<p>Chez Nos Producteurs prend le partie d’être l’unique intermédiaire entre le consommateur et le producteur.\nMais alors, comment tout cela fonctionne ?</p>\n<ul>\n<li>Le producteur met en vente ses produits élevés ou récoltés dans son exploitation\n“Point important : il est le seul à fixer le prix”.</li>\n<li>Le consommateur, via la plateforme Chez Nos Producteurs, cherche un produit ou un producteur.</li>\n<li>Il passe commande et le producteur, immédiatement prévenu, lance la préparation.</li>\n<li>Une fois préparée, le consommateur récupère sa commande et déguste des bons produits locaux.</li>\n</ul>";

				const frontmatter = {"title":"Chez nos producteurs","publishDate":"2021-06-01T00:00:00.000Z","img":"/assets/chez-nos-producteurs.webp","img_alt":"Image du site Chez nos producteurs","description":"Site créé en collaboration avec l'entreprise Zentux (86), utilisant leur CMS Gaïa.\n","tags":["CMS","Template","Html/Css"]};
				const file = "/Users/eric-pat/portfolio/src/content/work/chez-nos-producteurs.md";
				const url = undefined;
				function rawContent() {
					return "\nLe concept Chez Nos Producteurs\n\nChez Nos Producteurs prend le partie d'être l'unique intermédiaire entre le consommateur et le producteur.\nMais alors, comment tout cela fonctionne ?\n- Le producteur met en vente ses produits élevés ou récoltés dans son exploitation\n  \"Point important : il est le seul à fixer le prix\".\n- Le consommateur, via la plateforme Chez Nos Producteurs, cherche un produit ou un producteur.\n- Il passe commande et le producteur, immédiatement prévenu, lance la préparation.\n- Une fois préparée, le consommateur récupère sa commande et déguste des bons produits locaux.\n";
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
