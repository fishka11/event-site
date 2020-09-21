import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ metaData, slug }) => {
  const meta = metaData.find((item) =>
    slug ? String(item.path) === slug : item.path === null
  );
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={`${window.location.origin}/${slug}`} />
      <html lang="pl" />
    </Helmet>
  );
};

export default SEO;
