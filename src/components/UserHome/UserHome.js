import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './UserHome.scss';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import CreateCanvasSection from '../CreateCanvasSection/CreateCanvasSection';
import PageTitle from '../PageTitle/PageTitle';
import Layout from '../Layout/Layout';
import MyCanvases from '../MyCanvases/MyCanvases';

const LATEST_CANVASES_COUNT = 4;

const UserHome = ({ isEmpty }) => (
  <Layout.Container>
    <Layout.Inner>
      <div className="user-home">
        {isEmpty ? (
          <div className="user-home__latest">
            <PageTitle
              title="Welcome! Let’s get started"
              subtitle="Choose a canvas type you want to start with"
            />
            <CreateCanvasSection withDescription withCTA />
          </div>
        ) : (
          <div className="user-home__latest">
            <h3>My latest canvases</h3>
            <MyCanvases limit={LATEST_CANVASES_COUNT} />
            <div className="user-home__latest-more">
              <Button href="/dashboard" styleType="secondary" isFullWidth>
                <Icon name="dashboard" />
                All my canvases
              </Button>
            </div>
          </div>
        )}
        <div>
          <h2 className="text_align_center">Tips & tricks on business ideation</h2>
        </div>
      </div>
    </Layout.Inner>
  </Layout.Container>
);

UserHome.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { canvasList } = state;
  const { isLoaded, canvases } = canvasList;
  const isEmpty = isLoaded && !canvases.length;

  return {
    isEmpty,
  };
};

export default connect(mapStateToProps)(UserHome);
