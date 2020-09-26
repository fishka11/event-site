import React from 'react';
import Layout from '../components/layout';
import layoutStyles from './homeTemplate.module.scss';

const HomeTemplate = ({ children, slug }) => {
  return (
    <Layout slug={slug}>
      <div className={layoutStyles.content}>{children}</div>
    </Layout>
  );
};

export default HomeTemplate;
