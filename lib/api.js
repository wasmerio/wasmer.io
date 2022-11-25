import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

import team from '../components/About/Team/team.constants';
import { getImageUrl } from '../components/About/Team/components/Avatar/avatar.component';

const postsDirectory = join(process.cwd(), '_posts/posts')
const caseStudiesDirectory = join(process.cwd(), '_case_studies')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getCaseStudiesSlugs() {
  return fs.readdirSync(caseStudiesDirectory)
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  let { data, content } = matter(fileContents)

  if (fields.indexOf('slug') > -1) {
    data['slug'] = realSlug;
  }

  if (fields.indexOf('content') > -1) {
    data['content'] = content;
  }

  return data
}

export function getCaseStudyBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(caseStudiesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  let { data, content } = matter(fileContents)

  if (fields.indexOf('slug') > -1) {
    data['slug'] = realSlug;
  }

  if (fields.indexOf('content') > -1) {
    data['content'] = content;
  }

  return data
}


export function getMemberByName(author) {
  for (let member of team) {
    if (member.name === author.name) {
      if(author?.picture){
        member.image = author.picture;
      }
      return member;
    }
  }
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? '-1' : '1'))
  return posts
}

export function getAllCaseStudies(fields = []) {
  const slugs = getCaseStudiesSlugs()
  const posts = slugs
    .map((slug) => getCaseStudyBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? '-1' : '1'))
  return posts
}
