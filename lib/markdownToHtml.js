import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import slug from 'remark-slug'
import headings from 'remark-autolink-headings'


export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).use(headings).use(slug).use(highlight).process(markdown)
  return result.toString()
}
