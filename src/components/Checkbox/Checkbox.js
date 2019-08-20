import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

class Checkbox extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { name, children, isChecked, onChange, ...inputProps } = this.props;
    return (
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
  }
}

export default Checkbox;
