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
            date={heroPost.publishedAt}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.description}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </div>
      <div className="container">
        <h3>Old Blog</h3>
        <p>You can also find more posts in previous blog:&nbsp;
        <b><a href="https://medium.com/wasmer">Wasmer Old Medium Blog</a></b>
        </p>
        <br />
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
    'description',
    'status',
  ]).filter(post => post.status !== "draft" && (!post.language || post.language == "en") );

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


export const config = {
  runtime: "nodejs",
};
