import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import hash from '../../utils/hash';
import './InputText.scss';

class InputText extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'email']),
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    label: null,
    placeholder: null,
    value: '',
    error: null,
    disabled: false,
    autofocus: false,
    onChange: null,
    onFocus: null,
    onBlur: null,
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

  onFocus = e => {
    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(e);
    }
    this.setState({ focused: true });
  };

  onBlur = e => {
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
    this.setState({ focused: false });
  };

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
    const cls = b(baseClass, {
      focused,
      disabled,
      error: !!error,
      'no-label': !label,
    });

    return (
      <label className={cls} htmlFor={id}>
        {label ? (
          <span className={b(baseClass, 'label', { hidden: !value && !focused })}>{label}</span>
        ) : null}
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
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...other}
        />
      </label>
    );
  }
}

export default InputText;

