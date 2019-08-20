import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import HeaderButton from '../HeaderButton/HeaderButton';
import UserButton from '../UserButton/UserButton';
import history from '../../history';
import './Header.scss';

const renderBackBtn = to => {
  const defaultPath = '/';
  const historyState = history.location.state;
  const pathname = to || (historyState && historyState.from) || defaultPath;

  return <HeaderButton href={pathname} icon="arrow-back" label="Back" />;
};

const renderDashboardBtn = () => (
  <HeaderButton href="/dashboard" referrer={history.location} icon="dashboard" label="Dashboard" />
);

const Header = ({ btnDashboard, btnUser, btnBack, backTo, left, right, fixed }) => (
  <div className={`header${fixed ? ' header_fixed' : ''}`}>
    <div className="header__inner">
      <div className="header__left">
        <div className="header__left-inner">
          {btnBack ? renderBackBtn(backTo) : null}
          {btnDashboard ? renderDashboardBtn() : null}
          {left}
        </div>
      </div>
      <div className="header__logo">
        <Link to="/">
          <Icon name="logo" />
        </Link>
      </div>
      <div className="header__right">
        <div className="header__right-inner">
          {btnUser ? <UserButton /> : null}
          {right}
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
  backTo: PropTypes.string,
  btnBack: PropTypes.bool,
  btnDashboard: PropTypes.bool,
  btnUser: PropTypes.bool,
  fixed: PropTypes.bool,
};

Header.defaultProps = {
  left: undefined,
  right: undefined,
  backTo: undefined,
  btnBack: false,
  btnDashboard: false,
  btnUser: false,
  fixed: false,
};

export default Header;
