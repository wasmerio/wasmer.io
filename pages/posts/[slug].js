import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import {PortableText} from '@portabletext/react';
import { PostComponent } from '../../components/Post';
import client from '../../client';
import PortableTextComponent from '../../components/PortableTextComponent';

export default function PostPage({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="title" content={post.title} key="title" />
        {post.ogImage && (
          <meta property="og:image" content={post.ogImage.url} />
        )}
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
        />
        <link
          rel="stylesheet"
          href="https://jmblog.github.io/color-themes-for-highlightjs/css/themes/tomorrow-night-blue.css"
        />
        <script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>
      </Head>
      <PostComponent title={post.title} author={post.author} date={post.publishedAt}>
        <PortableText
        value={post.body}
        components={PortableTextComponent}
      />
      </PostComponent>
    </>
  );
}

export async function getServerSideProps(context) {
    const { slug = "" } = context.params
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        author->{
        name,
        image
      },
      description,
      mainImage,
      slug,
      publishedAt,
      body
      }
    `, { slug })
    return {
      props: {
        post
      }
    }
  }
