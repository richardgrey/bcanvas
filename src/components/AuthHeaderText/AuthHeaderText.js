import React from 'react';
import PropTypes from 'prop-types';
import './AuthHeaderText.scss';

const AuthHeaderText = ({ children }) => <div className="auth-header-text">{children}</div>;

AuthHeaderText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthHeaderText;
