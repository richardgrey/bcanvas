import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import hash from '../../utils/hash';
import './InputText.scss';

class InputText extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password', 'email']),
    value: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    value: '',
    error: null,
    disabled: false,
    autofocus: false,
    onChange: () => {},
    placeholder: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      id: `field_${props.name}_${hash()}`,
    };
  }

  componentDidMount() {
    const { autofocus } = this.props;
    if (autofocus) {
      this.input.focus();
    }
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  render() {
    const {
      name,
      type,
      label,
      placeholder,
      value,
      error,
      onChange,
      disabled,
      autofocus,
      ...other
    } = this.props;
    const { focused, id } = this.state;
    const baseClass = 'input-text';

    return (
      <label className={b(baseClass, { focused, error: !!error, disabled })} htmlFor={id}>
        <span className={b(baseClass, 'label', { hidden: !value && !focused })}>{label}</span>
        <span className={b(baseClass, 'placeholder', { hidden: !!value || !!focused })}>
          {placeholder || label}
        </span>
        <input
          ref={ref => {
            this.input = ref;
          }}
          className={b(baseClass, 'input')}
          id={id}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          {...other}
        />
      </label>
    );
  }
}

export default InputText;

