import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Form, { InputRow, FormHint, FormRow } from '../Form/Form';
import Icon from '../Icon/Icon';
import Divider from '../Divider/Divider';
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

  onChangeField = key => e => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onSubmit = e => {
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
  };

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
        <Divider>Or, register with your email</Divider>
        <InputRow
          name="name"
          label="Full Name"
          value={name}
          error={errors.name}
          onChange={this.onChangeField('name')}
          required
        />
        <InputRow
          type="email"
          name="email"
          label="Business Email"
          value={email}
          error={errors.email}
          onChange={this.onChangeField('email')}
          required
        />
        <InputRow
          type="password"
          name="password"
          label="Password"
          placeholder="Password (at least 6 characters)"
          value={password}
          error={errors.password}
          onChange={this.onChangeField('password')}
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
