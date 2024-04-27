import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_1aa3d2dc.mjs';
import 'clsx';
import 'html-escaper';

const html = "<p>Site vitrine pour l’entreprise Méca Comale, spécialisée dans la motoculture.</p>\n<p>Le site Méca Comale propose également une fonctionnalité de backend permettant aux administrateurs de modifier les contenus du site (photos, forfaits, texte …).</p>\n<p><a href=\"https://mecacomale.fr\">mecacomale.fr</a></p>";

				const frontmatter = {"title":"Méca Comale","publishDate":"2024-02-09T00:00:00.000Z","img":"/assets/meca-comale.webp","img_alt":"Image du site de Méca Comale","description":"Site créé pour l'entreprise Méca Comale (86).\n","tags":["Symfony","Template","EasyAdmin","Bootstrap","O2switch"]};
				const file = "/Users/eric-pat/portfolio/src/content/work/meca-comale.md";
				const url = undefined;
				function rawContent() {
					return "\nSite vitrine pour l'entreprise Méca Comale, spécialisée dans la motoculture.\n\nLe site Méca Comale propose également une fonctionnalité de backend permettant aux administrateurs de modifier les contenus du site (photos, forfaits, texte ...).\n\n[mecacomale.fr](https://mecacomale.fr)\n";
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
