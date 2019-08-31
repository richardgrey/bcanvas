import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as queryString from 'query-string';

class AuthHandler extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { location } = this.props;
    const { mode, oobCode, continueUrl, lang = 'en' } = queryString.parse(location.search);

    if (mode === 'resetPassword') {
      return <Redirect to={`/password-recovery/${oobCode}`} />;
    }
    if (mode === 'recoverEmail') {
      return <Redirect to={`/email-recovery/${oobCode}`} />;
    }
    if (mode === 'verifyEmail') {
      return <Redirect to={`/email-verify/${oobCode}`} />;
    }

    return <Redirect to="/" />;
  }
}

export default AuthHandler;
