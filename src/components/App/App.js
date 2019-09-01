import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { subscribeOnAuthStateChanged } from '../../actions/auth';
import IconsSprite from '../Icon/IconSprite';
import { locationPropType } from '../../utils/propTypes';
import './App.scss';
import CookieBadge from '../CookieBadge/CookieBadge';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isReady: PropTypes.bool.isRequired,
    location: locationPropType.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.unsubscribeAuth = dispatch(subscribeOnAuthStateChanged());
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0,);
    }
  }

  componentWillUnmount() {
    if (typeof this.unsubscribeAuth === 'function') {
      this.unsubscribeAuth();
    }
  }

  render() {
    const { children, isReady } = this.props;
    return isReady ? (
      <div className="app">
        <IconsSprite />
        {children}
        <CookieBadge />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  const { isReady } = state.app;
  return {
    isReady,
  };
};

export default withRouter(connect(mapStateToProps)(App));
