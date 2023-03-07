import remark from 'remark'
import html from 'remark-html'
import slug from 'remark-slug'
import headings from 'remark-autolink-headings'
import remarkPrism from 'remark-prism'
import merge from 'deepmerge';
import github from 'hast-util-sanitize/lib/github';
import remarkEmbedder from '@remark-embedder/core'

const schema = merge(github, { attributes: { '*': ['className'], 'iframe': ['src', 'style', 'width', 'height', 'allow', 'sandbox', 'allowfullscreen', 'frameborder'] }, tagNames: ['iframe'],  });

const YoutubeTransformer = {
  name: 'Youtube',
  // shouldTransform can also be async
  shouldTransform(url) {
    const {host, pathname} = new URL(url)
    return (
      ['youtube.com', 'www.youtube.com'].includes(host) &&
      pathname.includes('/watch')
    )
  },
  // getHTML can also be async
  getHTML(url) {
    const iframeUrl = url.replace('/watch?v=', '/embed/')
    return `<iframe width="100%" height="480" src="${iframeUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  },
}


export default async function markdownToHtml(markdown) {
  const result = await remark()
  .use(remarkPrism)
  .use(remarkEmbedder, {
    transformers: [YoutubeTransformer],
  })
  .use(html, { sanitize: schema })
  .use(headings)
  .use(slug)
  .process(markdown)
  return result.toString()
}
