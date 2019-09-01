import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { subscribeOnAuthStateChanged } from '../../actions/auth';
import IconsSprite from '../Icon/IconSprite';
import { locationPropType } from '../../utils/propTypes';
import './App.scss'

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
    if (this.props.location.pathname !== prevProps.location.pathname) {
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
