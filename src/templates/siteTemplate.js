import React from 'react';
import Layout from '../components/layout';
import layoutStyles from './siteTemplate.module.scss';

const SiteTemplate = ({ children, slug }) => {
  return (
    <Layout slug={slug}>
      <div className={layoutStyles.content}>{children}</div>
    </Layout>
  );
};

export default SiteTemplate;
