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

const TwitterTransformer = {
  name: "Twitter",
  // shouldTransform can also be async
  shouldTransform(url) {
    const { host, pathname } = new URL(url);
    return (
      ["twitter.com"].includes(host) &&
      pathname.includes("/status")
    );
  },
  // <blockquote class="twitter-tweet"><p lang="en" dir="ltr">If WASM+WASI existed in 2008, we wouldn&#39;t have needed to created Docker. That&#39;s how important it is. Webassembly on the server is the future of computing. A standardized system interface was the missing link. Let&#39;s hope WASI is up to the task! <a href="https://t.co/wnXQg4kwa4">https://t.co/wnXQg4kwa4</a></p>&mdash; Solomon Hykes / @shykes@hachyderm.io (@solomonstre) <a href="https://twitter.com/solomonstre/status/1111004913222324225?ref_src=twsrc%5Etfw">March 27, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  // getHTML can also be async
  getHTML(url) {
    // const iframeUrl = url.replace("/watch?v=", "/embed/");
    let match = url.match(/twitter\.com\/.*\/status(?:es)?\/([^\/\?]+)/); // returns true if stringToCheck is a URL
    if (match[1]) {
      // <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 564px; display: block; flex-grow: 1;" title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1111004913222324225&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%23&amp;sessionId=69c8ac580a9ae0c72221add4d9471b341f6f65ba&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=550px" data-tweet-id="1111004913222324225"></iframe>
      let iframeUrl = `https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=${match[1]}&lang=en&theme=light`;
      return `<iframe width="100%" height="200" style="overflow:hidden" src="${iframeUrl}" title="Twitter embed" frameborder="0"></iframe>`;
    }
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
      transformers: [YoutubeTransformer, TwitterTransformer],
    })
    .use(withShiki, { highlighter })
    .use(toHast, { allowDangerousHtml: true })
    .use(withHtmlInMarkdown)
    .use(toHtml)
    .process(markdown);
  return result.toString();
}
