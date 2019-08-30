import React from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PageNotFound from '../components/PageNotFound/PageNotFound';

const NoMatch = () => (
  <Layout>
    <Layout.Header>
      <Header btnBack btnUser />
    </Layout.Header>
    <Layout.Container>
      <Layout.Inner>
        <PageNotFound />
      </Layout.Inner>
    </Layout.Container>
  </Layout>
);

export default NoMatch;
