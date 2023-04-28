import withHtmlInMarkdown from "rehype-raw";
import toHtml from "rehype-stringify";
import remarkGfm from "remark-gfm";
import fromMarkdown from "remark-parse";
import toHast from "remark-rehype";
import { getHighlighter } from "shiki";
import { unified } from "unified";

import remarkEmbedder from "@remark-embedder/core";
import withShiki from "@stefanprobst/remark-shiki";

const YoutubeTransformer = {
  name: "Youtube",
  // shouldTransform can also be async
  shouldTransform(url) {
    const { host, pathname } = new URL(url);
    return (
      ["youtube.com", "www.youtube.com"].includes(host) &&
      pathname.includes("/watch")
    );
  },
  // getHTML can also be async
  getHTML(url) {
    const iframeUrl = url.replace("/watch?v=", "/embed/");
    return `<iframe width="100%" height="370" src="${iframeUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  },
};

export default async function markdownToHtml(markdown) {
  const highlighter = await getHighlighter({
    themes: ["github-dark"],
  });

  const result = await unified()
    .use(fromMarkdown)
    .use(remarkGfm)
    .use(remarkEmbedder, {
      transformers: [YoutubeTransformer],
    })
    .use(withShiki, { highlighter })
    .use(toHast, { allowDangerousHtml: true })
    .use(withHtmlInMarkdown)
    .use(toHtml)
    .process(markdown);
  return result.toString();
}
