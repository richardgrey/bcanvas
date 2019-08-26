import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import Landing from '../components/Landing/Landing';
import UserHome from '../components/UserHome/UserHome';
import Header from '../components/Header/Header';
import ToolbarNewCanvas from '../components/ToolbarNewCanvas/ToolbarNewCanvas';

class Home extends Component {
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
        {isAuthenticated ? <UserHome /> : <Landing />}
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

export default connect(mapStateToProps)(Home);
