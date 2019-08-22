import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import CreateCanvasSection from '../components/CreateCanvasSection/CreateCanvasSection';
import Header from '../components/Header/Header';
import ToolbarNewCanvas from '../components/ToolbarNewCanvas/ToolbarNewCanvas';

class Landing extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Layout>
        <Layout.Header>
          <Header btnDashboard btnUser right={isAuthenticated ? <ToolbarNewCanvas /> : null} />
        </Layout.Header>
        <Layout.Container>
          <Hero />
          <CreateCanvasSection withDescription withCTA />
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
