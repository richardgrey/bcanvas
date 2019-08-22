import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from '../Dropdown/Dropdown';
import HeaderButton from '../HeaderButton/HeaderButton';
import { signOut } from '../../actions/auth';
import { DEFAULT_USER_NAME } from '../../constants';
import history from '../../history';

const UserButton = ({ dispatch, isAuthenticated, displayName, email }) => {
  // Render Sign In button if not authenticated
  if (!isAuthenticated) {
    return (
      <HeaderButton
        href="/sign-in"
        referrer={history.location}
        icon="user"
        label="Sign In"
        align="right"
      />
    );
  }

  const menu = [
    {
      label: 'Change email',
      href: {
        pathname: '/account/change-email',
        state: { from: history.location },
      },
    },
    {
      label: 'Change password',
      href: {
        pathname: '/account/change-password',
        state: { from: history.location },
      },
    },
    {
      label: 'Sign Out',
      action: () => dispatch(signOut()),
    },
  ];

  const profile = () => (
    <div>
      <h3>{displayName || DEFAULT_USER_NAME}</h3>
      {email}
    </div>
  );

  return (
    <Dropdown
      toggle={<HeaderButton icon="user" label="Account" align="right" />}
      items={menu}
      before={profile()}
    />
  );
};

UserButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  email: PropTypes.string,
  displayName: PropTypes.string,
};

UserButton.defaultProps = {
  displayName: null,
  email: null,
};

const mapStateToProps = state => {
  const { auth, account } = state;
  const { isAuthenticated } = auth;
  const { displayName, email } = account;

  return {
    isAuthenticated,
    displayName,
    email,
  };
};

export default connect(mapStateToProps)(UserButton);
