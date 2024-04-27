import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_1aa3d2dc.mjs';
import 'clsx';
import 'html-escaper';

const html = "<p>Site personnel réalisé avec Astro et hébergé sur Vercel.</p>\n<p><a href=\"https://portfolio-eric-patrouillault.vercel.app/work/portfolio\">mon portfolio</a></p>";

				const frontmatter = {"title":"Portfolio","publishDate":"2023-11-05T00:00:00.000Z","img":"/assets/portfolio.webp","img_alt":"Image du porfolio de Eric Patrouillault.","description":"Porfolio de Eric Patrouillault.\n","tags":["Astro","Vercel"]};
				const file = "/Users/eric-pat/portfolio/src/content/work/portfolio.md";
				const url = undefined;
				function rawContent() {
					return "\nSite personnel réalisé avec Astro et hébergé sur Vercel.\n\n[mon portfolio](https://portfolio-eric-patrouillault.vercel.app/work/portfolio)\n";
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
