import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_USER_NAME } from '../../constants';
import './MiniProfile.scss';

const MiniProfile = ({ account }) => (
  <div className="mini-profile">
    <h4 className="mini-profile__name">{account.displayName || DEFAULT_USER_NAME}</h4>
    <div className="mini-profile__email">{account.email}</div>
  </div>
);

MiniProfile.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
};

export default MiniProfile;
