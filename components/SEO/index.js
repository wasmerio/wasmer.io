import Head from "next/head";

const SEO = ({
  title,
  description,
  url,
  ogImage = "https://wasmer.io/images/og-image.png",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {!ogImage ? null : (
        <>
          <meta property="og:image" content={ogImage} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}
    </Head>
  );
};

export default SEO;
