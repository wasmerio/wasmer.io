import Head from 'next/head';

import { MoreStories, HeroPost } from '../../components/Post';
import { getAllPosts, getMemberByName } from '../../lib/api';

export default function Index({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Head>
        <title>Wasmer Blog</title>
      </Head>
      <div className="container">
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: {
      allPosts: allPosts.map((post) => {
        const author = getMemberByName(post.author);
        return {
          ...post,
          author,
        };
      }),
    },
  };
}
