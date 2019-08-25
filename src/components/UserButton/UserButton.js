import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from '../Dropdown/Dropdown';
import HeaderButton from '../HeaderButton/HeaderButton';
import MiniProfile from '../MiniProfile/MiniProfile';
import { signOut } from '../../actions/auth';
import history from '../../history';

const UserButton = ({ dispatch, isAuthenticated, account }) => {
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

  return (
    <Dropdown items={menu} before={<MiniProfile account={account} />}>
      <HeaderButton icon="user" label="Account" align="right" />
    </Dropdown>
  );
};

UserButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  account: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

UserButton.defaultProps = {
  account: null,
};

const mapStateToProps = state => {
  const { auth, account } = state;
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
    account,
  };
};

export default connect(mapStateToProps)(UserButton);
