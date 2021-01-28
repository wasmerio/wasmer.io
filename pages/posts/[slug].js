import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';

// import { PostBody, PostTitle, PostHeader } from '../../components/Post'
import { getPostBySlug, getAllPosts, getMemberByName } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

import { PostComponent } from '../../components/Post';

export default function PostPage({ post, morePosts, preview }) {
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
      <PostComponent title={post.title} author={post.author} date={post.date}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </PostComponent>
    </>
  );
}
// export default function Post({ post, morePosts, preview }) {
//   const router = useRouter()
//   if (!router.isFallback && !post?.slug) {
//     return <ErrorPage statusCode={404} />
//   }
//   return (
//     <Layout preview={preview}>
//       <Container>
//         <Header />
//         {router.isFallback ? (
//           <PostTitle>Loading…</PostTitle>
//         ) : (
//           <>
//             <article className="mb-32">
//               <Head>
//                 <title>
//                   {post.title} | Next.js Blog Example with {CMS_NAME}
//                 </title>
//                 <meta property="og:image" content={post.ogImage.url} />
//               </Head>
//               <PostHeader
//                 title={post.title}
//                 coverImage={post.coverImage}
//                 date={post.date}
//                 author={post.author}
//               />
//               <PostBody content={post.content} />
//             </article>
//           </>
//         )}
//       </Container>
//     </Layout>
//   )
// }

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const author = getMemberByName(post.author);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
        author,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
