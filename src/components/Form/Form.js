import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

// import Input from './Input';
import Checkbox from '../Checkbox/Checkbox';
import InputText from '../InputText/InputText';
import InputRow from './InputRow';
import FormError from './FormError';
import FormHint from './FormHint';
import FormRow from './FormRow';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: '',
  };

  render() {
    const { children, className, ...props } = this.props;
    return (
      <form className={`form ${className}`} {...props}>
        {children}
      </form>
    );
  }
}

export default Form;
export { Checkbox, InputText, InputRow, FormError, FormHint, FormRow };
