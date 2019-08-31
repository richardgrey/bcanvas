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
import HowToCanvas from '../HowToCanvas/HowToCanvas';
import Section from '../Section/Section';
import SamplesList from '../SamplesList/SamplesList';

const LATEST_CANVASES_COUNT = 4;

const UserHome = ({ isEmpty }) => (
  <Layout.Container>
    <div className="user-home">
      <Layout.Inner>
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
            <h3 className="user-home__latest-title">My latest canvases</h3>
            <MyCanvases noWrap limit={LATEST_CANVASES_COUNT} />
            <div className="user-home__latest-more">
              <Button href="/dashboard" styleType="secondary" isFullWidth>
                <Icon name="dashboard" />
                All my canvases
              </Button>
            </div>
          </div>
        )}
      </Layout.Inner>
      <Section bg="lightgray" indent="medium">
        <Layout.Inner>
          <h2 className="text_align_center">How to work with canvas</h2>
          <HowToCanvas />
        </Layout.Inner>
      </Section>
      <Layout.Inner>
        <Section>
          <h2 className="text_align_center">Check this examples</h2>
          <SamplesList />
        </Section>
      </Layout.Inner>
    </div>
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
