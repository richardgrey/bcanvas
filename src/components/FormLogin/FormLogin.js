import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Form, { FormRow, InputRow } from '../Form/Form';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Divider from '../Divider/Divider';
import { login, signInGoogle } from '../../actions/auth';

class FormLogin extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    errors: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    isSubmitting: PropTypes.bool,
  };

  static defaultProps = {
    onSubmit: null,
    errors: {},
    isSubmitting: false,
  };

  state = {
    email: '',
    password: '',
  };

  onChangeField = key => e => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onSubmit = e => {
    const { dispatch, onSubmit, isSubmitting } = this.props;
    const { email, password } = this.state;

    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    dispatch(login(email, password));
    if (typeof onSubmit === 'function') {
      onSubmit(email, password);
    }
  };

  render() {
    const { email, password } = this.state;
    const { errors, isSubmitting, dispatch } = this.props;

    return (
      <Form className="form_auth" onSubmit={this.onSubmit}>
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
        <Divider>Or, sign in with your email</Divider>
        <InputRow
          name="email"
          type="email"
          label="Business Email"
          value={email}
          error={errors.email}
          onChange={this.onChangeField('email')}
          required
        />
        <InputRow
          name="password"
          type="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChangeField('password')}
          required
        />
        <FormRow type="submit">
          <Button type="submit" styleType="primary" disabled={isSubmitting} isFullWidth>
            Sign In
          </Button>
        </FormRow>
        <FormRow className="text_align_center">
          <Link to="password-recovery">Forgot your password?</Link>
        </FormRow>
      </Form>
    );
  }
}

export default FormLogin;
