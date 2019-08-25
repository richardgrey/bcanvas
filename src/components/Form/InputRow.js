import React from 'react';
import PropTypes from 'prop-types';
import FormRow from './FormRow';
import FormError from './FormError';
import FormHint from './FormHint';
import InputText from '../InputText/InputText';
import './Form.scss';

const InputRow = ({
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
}) => (
  <FormRow type={type} className={`form__row_for_${name}`}>
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
  </FormRow>
);

InputRow.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  hint: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

InputRow.defaultProps = {
  type: 'text',
  label: null,
  placeholder: null,
  value: '',
  hint: null,
  error: null,
  children: null,
  onChange: null,
};

export default InputRow;
