import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Form, { InputRow } from '../Form/Form';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Separator from '../Separator/Separator';
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

  onSubmit(e) {
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
  }

  onChangeField(key, value) {
    const newState = { [key]: value };
    this.setState(newState);
  }

  render() {
    const { email, password } = this.state;
    const { errors, isSubmitting, dispatch } = this.props;

    return (
      <Form className="form_auth" onSubmit={e => this.onSubmit(e)}>
        <div className="form__row">
          <Button
            type="button"
            styleType="google"
            onClick={() => dispatch(signInGoogle())}
            disabled={isSubmitting}
            isFullWidth
          >
            Continue with Google <Icon name="arrow" />
          </Button>
        </div>
        <Separator>Or, sign in with your email</Separator>
        <InputRow
          name="email"
          type="email"
          label="Business Email"
          value={email}
          error={errors.email}
          onChange={e => this.onChangeField('email', e.target.value)}
          required
        />
        <InputRow
          name="password"
          type="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={e => this.onChangeField('password', e.target.value)}
          required
        />
        <div className="form__row form__row_submit">
          <Button type="submit" styleType="primary" disabled={isSubmitting} isFullWidth>
            Sign In
          </Button>
        </div>
        <div className="form__row text_align_center">
          <Link to="password-recovery">Forgot your password?</Link>
        </div>
      </Form>
    );
  }
}

export default FormLogin;
