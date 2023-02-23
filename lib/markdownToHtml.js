import remark from 'remark'
import html from 'remark-html'
import slug from 'remark-slug'
import headings from 'remark-autolink-headings'
import remarkPrism from 'remark-prism'
import merge from 'deepmerge';
import github from 'hast-util-sanitize/lib/github';

const schema = merge(github, { attributes: { '*': ['className'] } });

export default async function markdownToHtml(markdown) {
  const result = await remark()
  .use(remarkPrism)
  .use(html, { sanitize: schema })
  .use(headings)
  .use(slug)
  .process(markdown)
  return result.toString()
}
