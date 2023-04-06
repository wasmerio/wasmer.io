import remark from 'remark'
import html from 'remark-html'
import slug from 'remark-slug'
import headings from 'remark-autolink-headings'
import merge from 'deepmerge';
import github from 'hast-util-sanitize/lib/github';
import remarkEmbedder from '@remark-embedder/core';
import withShiki from '@stefanprobst/remark-shiki'
import { getHighlighter } from 'shiki';
import fromMarkdown from 'remark-parse'
import * as shiki from 'shiki'
import { unified } from 'unified'
import toHast from 'remark-rehype'
import withHtmlInMarkdown from 'rehype-raw'
import toHtml from 'rehype-stringify'

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
    return `<iframe width="100%" height="370" src="${iframeUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  },
}


// const ShikiTransformer = {
//   name: 'Shiki',
//   // shouldTransform can also be async
//   shouldTransform(url) {
//     const {host, pathname} = new URL(url)
//     return (
//       ['youtube.com', 'www.youtube.com'].includes(host) &&
//       pathname.includes('/watch')
//     )
//   },
//   // getHTML can also be async
//   getHTML(url) {
//     const iframeUrl = url.replace('/watch?v=', '/embed/')
//     return `<iframe width="100%" height="370" src="${iframeUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
//   },
// }



export default async function markdownToHtml(markdown) {
  const highlighter = await getHighlighter({
    themes: ['github-dark'],
    // langs: ['javascript', 'python', 'toml', 'bash'],
    // paths: {
    //   themes: '/path/to/themes',
    //   languages: '/path/to/languages'
    // }
  })

  // const highlighter = await shiki.getHighlighter({ theme: 'poimandres' })

  const result = await unified()
    .use(fromMarkdown)
    .use(remarkEmbedder, {
      transformers: [YoutubeTransformer, ],
    })
    .use(withShiki, { highlighter })
    .use(toHast, { allowDangerousHtml: true })
    .use(withHtmlInMarkdown)
    .use(toHtml)
    .process(markdown)
  // return result.toString()

  // const result = await remark()
  // // .use(remarkPrism)
  // .use(withShiki, { highlighter })
  // .use(remarkEmbedder, {
  //   transformers: [YoutubeTransformer, ],
  // })
  // .use(html, { sanitize: schema })
  // .use(headings)
  // .use(slug)
  // .process(markdown)
  return result.toString()
}
