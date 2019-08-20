import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import NewCanvasSection from '../components/NewCanvasSection/NewCanvasSection';
import Header from '../components/Header/Header';

class Landing extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Layout>
        <Layout.Header>
          <Header btnDashboard btnUser />
        </Layout.Header>
        <Layout.Container>
          <Hero />
          <NewCanvasSection />
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landing);
