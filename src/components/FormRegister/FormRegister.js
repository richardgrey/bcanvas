import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Form, { InputRow, FormHint, FormRow } from '../Form/Form';
import Icon from '../Icon/Icon';
import Separator from '../Separator/Separator';
import { register, signInGoogle } from '../../actions/auth';

class FormRegister extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    errors: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  };

  static defaultProps = {
    onSubmit: null,
    errors: {},
  };

  state = {
    email: '',
    password: '',
    name: '',
  };

  onSubmit(e) {
    const { dispatch, onSubmit, isSubmitting } = this.props;
    const { email, password, name } = this.state;

    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    dispatch(register(email, password, name));
    if (typeof onSubmit === 'function') {
      onSubmit(email, password, name);
    }
  }

  onChangeField(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    const { name, email, password } = this.state;
    const { errors, isSubmitting, dispatch } = this.props;

    return (
      <Form className="form_auth" onSubmit={e => this.onSubmit(e)}>
        <FormRow>
          <Button
            type="button"
            styleType="google"
            onClick={() => dispatch(signInGoogle())}
            disabled={isSubmitting}
            isFullWidth
          >
            Continue with Google <Icon name="arrow" />
          </Button>
        </FormRow>
        <Separator>Or, register with your email</Separator>
        <InputRow
          name="name"
          label="Full Name"
          value={name}
          error={errors.name}
          onChange={e => this.onChangeField('name', e.target.value)}
          required
        />
        <InputRow
          type="email"
          name="email"
          label="Business Email"
          value={email}
          error={errors.email}
          onChange={e => this.onChangeField('email', e.target.value)}
          required
        />
        <InputRow
          type="password"
          name="password"
          label="Password"
          placeholder="Password (at least 6 characters)"
          value={password}
          error={errors.password}
          onChange={e => this.onChangeField('password', e.target.value)}
          minLength="6"
          required
        />
        <FormRow type="submit">
          <Button type="submit" styleType="primary" disabled={isSubmitting} isFullWidth>
            Create an Account
          </Button>
        </FormRow>
        <FormRow className="text_align_center">
          <FormHint>
            By signing in or creating an account, you agree with our{' '}
            <Link to="/terms-of-services" target="_blank">
              Terms{'\u00A0'}of{'\u00A0'}Service
            </Link>{' '}
            and{' '}
            <Link to="/cookie-policy" target="_blank">
              Privacy Statement
            </Link>
          </FormHint>
        </FormRow>
      </Form>
    );
  }
}

export default FormRegister;
