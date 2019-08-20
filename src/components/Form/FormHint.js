import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormError extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return <div className="form__hint">{children}</div>;
  }
}

export default FormError;
