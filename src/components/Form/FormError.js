import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormError extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return <div className="form__error">{children}</div>;
  }
}

export default FormError;
