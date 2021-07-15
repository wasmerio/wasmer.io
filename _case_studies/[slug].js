import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';

import { getCaseStudyBySlug, getAllCaseStudies, getMemberByName } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';

import { PostComponent } from '../components/Post';

export default function CaseStudyPage({ caseStudy }) {
    const router = useRouter();
    if (!router.isFallback && !caseStudy?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <>
            <Head>
                <title>{caseStudy.title}</title>
                <meta name="title" content={caseStudy.title} key="title" />
                {caseStudy.ogImage && (
                    <meta property="og:image" content={caseStudy.ogImage.url} />
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
            <PostComponent title={caseStudy.title} author={caseStudy.author} date={caseStudy.date}>
                <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
            </PostComponent>
        </>
    );
}

export async function getStaticProps({ params }) {
    const caseStudy = getCaseStudyBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
        'published',
    ]);
    const author = getMemberByName(caseStudy.author);
    const content = await markdownToHtml(caseStudy.content || '');

    return {
        props: {
            caseStudy: {
                ...caseStudy,
                content,
                author,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllCaseStudies(['slug', 'published']);

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
