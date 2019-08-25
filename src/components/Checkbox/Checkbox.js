import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = ({ name, children, isChecked, onChange, ...inputProps }) => (
  <label htmlFor={name} className="checkbox">
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      {...inputProps}
    />
    <span className="checkbox__box" />
    <span className="form__label">{children}</span>
  </label>
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  children: null,
};

export default Checkbox;
