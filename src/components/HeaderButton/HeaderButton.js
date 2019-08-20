import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import b from 'b_';
import Icon from '../Icon/Icon';
import './HeaderButton.scss';

// Location object for Link _must_ contain location
const isLocationObject = obj => {
  const { toString, hasOwnProperty } = Object.prototype;
  return toString.call(obj) === '[object Object]' && hasOwnProperty.call(obj, 'pathname');
};

const makeLocationObject = (href, referrer) => ({
  pathname: href,
  state: referrer ? { from: referrer } : undefined,
});

const HeaderButton = ({ icon, label, href, referrer, align, onClick, ...other }) => {
  const cls = b('header-button', {
    align,
    [icon]: !!icon,
  });
  const inner = () => (
    <span className="header-button__inner">
      <span className="header-button__icon">
        <Icon name={icon} />
      </span>
      {label ? <span className="header-button__label">{label}</span> : null}
    </span>
  );

  if (href) {
    const path = isLocationObject(href) ? href : makeLocationObject(href, referrer);

    return (
      <Link to={path} className={cls} title={label} {...other}>
        {inner()}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} title={label} {...other}>
      {inner()}
    </button>
  );
};

HeaderButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ pathname: PropTypes.string })]),
  referrer: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  align: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
};

HeaderButton.defaultProps = {
  icon: undefined,
  label: undefined,
  href: undefined,
  referrer: undefined,
  align: 'left',
  onClick: undefined,
};

export default HeaderButton;
