import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import { Link } from 'react-router-dom';
import { locationPropType } from '../../utils/propTypes';
import './Button.scss';

class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.oneOfType([PropTypes.string, locationPropType]),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    size: PropTypes.oneOf(['x-small', 'small', 'normal', 'large']),
    styleType: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'google']),
    className: PropTypes.string,
    isFullWidth: PropTypes.bool,
  };

  static defaultProps = {
    href: null,
    type: 'button',
    size: 'normal',
    styleType: null,
    className: null,
    isFullWidth: false,
  };

  render() {
    const { children, href, type, size, styleType, className, isFullWidth, ...other } = this.props;
    const inner = () => <span className="button__inner">{children}</span>;
    const cls = b('button', {
      width: isFullWidth ? 'full' : false,
      [styleType]: !!styleType,
      size,
    });

    return href ? (
      <Link to={href} className={[cls, className].join(' ')}>
        {inner()}
      </Link>
    ) : (
      <button type={type} className={[cls, className].join(' ')} {...other}>
        {inner()}
      </button>
    );
  }
}

export default Button;
