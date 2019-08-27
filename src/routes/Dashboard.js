import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PageTitle from '../components/PageTitle/PageTitle';
import MyCanvases from '../components/MyCanvases/MyCanvases';
import CreateCanvasSection from '../components/CreateCanvasSection/CreateCanvasSection';
import ToolbarNewCanvas from '../components/ToolbarNewCanvas/ToolbarNewCanvas';

class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    const { dispatch, isAuthenticated, isEmpty } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <Layout>
        <Layout.Header>
          <Header btnBack btnUser right={<ToolbarNewCanvas dispatch={dispatch} />} />
        </Layout.Header>
        <Layout.Container>
          {isEmpty ? (
            <Layout.Inner>
              <PageTitle
                title="Dashboard"
                subtitle="Nothing here yet. Go ahead, create your first canvas!"
              />
              <CreateCanvasSection withDescription withCTA />
            </Layout.Inner>
          ) : (
            <Layout.Inner>
              <PageTitle title="Dashboard" />
              <MyCanvases />
            </Layout.Inner>
          )}
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth, canvasList } = state;
  const { isAuthenticated } = auth;
  const { isLoaded, canvases } = canvasList;
  const isEmpty = isLoaded && !canvases.length;

  return {
    isEmpty,
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Dashboard);
