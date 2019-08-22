import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import { Link } from 'react-router-dom';
import './Button.scss';

class Btn extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    styleType: PropTypes.oneOf(['primary', 'danger', 'ghost', 'google']),
    className: PropTypes.string,
    isFullWidth: PropTypes.bool,
  };

  static defaultProps = {
    href: null,
    type: 'button',
    size: 'medium',
    styleType: null,
    className: null,
    isFullWidth: false,
  };

  render() {
    const { children, href, type, size, styleType, className, isFullWidth, ...other } = this.props;
    const inner = () => <span className="button__inner">{children}</span>;
    const cls = b('button', {
      [styleType]: !!styleType,
      size,
      width: isFullWidth ? 'full' : false,
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

export default Btn;