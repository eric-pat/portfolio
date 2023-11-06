import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_1aa3d2dc.mjs';
import 'clsx';
import 'html-escaper';

const html = "<p>Site personnel réalisé avec Astro et React.\n<a href=\"https://astro.build\">https://astro.build</a></p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" lang=\"plaintext\"><code><span class=\"line\"><span></span></span></code></pre>";

				const frontmatter = {"title":"Portfolio","publishDate":"2023-11-05T00:00:00.000Z","img":"/assets/portfolio.webp","img_alt":"Image du porfolio de Eric Patrouillault.","description":"Porfolio de Eric Patrouillault.\n","tags":["Astro","React"]};
				const file = "/Users/eric-pat/portfolio/src/content/work/portfolio.md";
				const url = undefined;
				function rawContent() {
					return "\nSite personnel réalisé avec Astro et React.\nhttps://astro.build\n\n```\n\n```\n";
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
