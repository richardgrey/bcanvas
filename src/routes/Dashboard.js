import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import PageTitle from '../components/PageTitle/PageTitle';
import Header from '../components/Header/Header';
import ItemsList from '../components/ItemsList/ItemsList';
import NewCanvasSection from '../components/NewCanvasSection/NewCanvasSection';

class Dashboard extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    const { isAuthenticated, isEmpty } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <Layout>
        <Layout.Header>
          <Header btnBack btnUser />
        </Layout.Header>
        <Layout.Container>
          {isEmpty ? (
            <>
              <PageTitle
                title="Dashboard"
                subtitle="Nothing here yet. Go ahead, create your first canvas!"
              />
              <NewCanvasSection />
            </>
          ) : (
            <>
              <PageTitle title="Dashboard" />
              <ItemsList type="grid" />
            </>
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
