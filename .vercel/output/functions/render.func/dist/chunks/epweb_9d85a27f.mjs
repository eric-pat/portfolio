import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_1aa3d2dc.mjs';
import 'clsx';
import 'html-escaper';

const html = "<p>Site personnel epweb.fr</p>";

				const frontmatter = {"title":"EP Web","publishDate":"2023-10-01T00:00:00.000Z","img":"/assets/epweb.webp","img_alt":"Image du site EP Web","description":"Site créé pour moi...\n","tags":["Astro","React","Tailwind","o2switch"]};
				const file = "/Users/eric-pat/portfolio/src/content/work/epweb.md";
				const url = undefined;
				function rawContent() {
					return "\nSite personnel epweb.fr\n";
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
