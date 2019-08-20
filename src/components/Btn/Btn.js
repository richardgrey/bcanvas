import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Btn.css';

class Btn extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    styleType: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
    isFullWidth: PropTypes.bool,
    isRounded: PropTypes.bool,
    isOutlined: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'button',
    size: 'medium',
    styleType: null,
    className: null,
    isFullWidth: false,
    isRounded: false,
    isOutlined: false,
  };

  render() {
    const {
      children,
      type,
      size,
      styleType,
      className,
      isFullWidth,
      isRounded,
      isOutlined,
      ...other
    } = this.props;

    const modStyle = styleType ? ` btn_${styleType}` : '';
    const modSize = size !== Btn.defaultProps.size ? ` btn_size_${size}` : '';
    const modWidth = isFullWidth ? ` btn_width_full` : '';
    const modRounded = isRounded ? ` btn_rounded` : '';
    const modOutlined = isOutlined ? ` btn_outlined` : '';

    return (
      <button
        type={type}
        className={`btn${modStyle}${modSize}${modWidth}${modRounded}${modOutlined} ${className || ''}`}
        {...other}
      >
        {children}
      </button>
    );
  }
}

export default Btn;
