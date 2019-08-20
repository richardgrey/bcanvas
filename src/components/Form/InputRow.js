import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormError from './FormError';
import FormHint from './FormHint';
import InputText from '../InputText/InputText';

class InputRow extends Component {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    hint: PropTypes.string,
    children: PropTypes.node,
    error: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    placeholder: null,
    value: '',
    hint: null,
    error: null,
    children: null,
    onChange: () => {},
  };

  render() {
    const {
      name,
      type,
      label,
      placeholder,
      value,
      hint,
      onChange,
      error,
      children,
      ...inputProps
    } = this.props;

    return (
      <div className={`form__row form__row_${type} form__row_for_${name}`}>
        <InputText
          label={label}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          error={error}
          {...inputProps}
        />
        {hint ? <FormHint>{hint}</FormHint> : null}
        {error ? <FormError>{error}</FormError> : null}
        {children}
      </div>
    );
  }
}

export default InputRow;
