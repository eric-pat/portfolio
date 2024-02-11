import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_1aa3d2dc.mjs';
import 'clsx';
import 'html-escaper';

const html = "<p>Éditions LE GARAGE passion et collection\nIci, on parle de grandes et de petites voitures de collection, de miniatures et de jouets automobiles</p>\n<p>Les Éditions LE GARAGE, passion et collection, souhaitent apporter leurs services et leur savoir-faire à tous les amateurs de voitures anciennes ou modernes, ainsi qu’à tous les collectionneurs passionnés de modèles réduits, de miniatures, de jouets automobiles en tôle ou en bois et d’Automobilia.</p>\n<p><a href=\"https://www.editions-legarage.fr\">https://www.editions-legarage.fr</a></p>";

				const frontmatter = {"title":"Éditions le garage","publishDate":"2021-07-02T00:00:00.000Z","img":"/assets/editions-le-garage.webp","img_alt":"Image du site des Éditions le garage","description":"Site créé en collaboration avec l'entreprise Zentux (86),\nen utilisant leur CMS Gaïa.\n","tags":["CMS","Template","Html/Css"]};
				const file = "/Users/eric-pat/portfolio/src/content/work/editions-le-garage.md";
				const url = undefined;
				function rawContent() {
					return "\nÉditions LE GARAGE passion et collection\nIci, on parle de grandes et de petites voitures de collection, de miniatures et de jouets automobiles\n\nLes Éditions LE GARAGE, passion et collection, souhaitent apporter leurs services et leur savoir-faire à tous les amateurs de voitures anciennes ou modernes, ainsi qu'à tous les collectionneurs passionnés de modèles réduits, de miniatures, de jouets automobiles en tôle ou en bois et d'Automobilia.\n\nhttps://www.editions-legarage.fr";
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
