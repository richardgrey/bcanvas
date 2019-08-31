import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PageTitle from '../components/PageTitle/PageTitle';
import Button from '../components/Button/Button';
import Form, { InputRow, FormRow } from '../components/Form/Form';
import Icon from '../components/Icon/Icon';
import { ERROR_ACCOUNT_CONFIRM_PASSWORD } from '../constants';
import {
  resetAuthForms,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  resetPasswordError,
  confirmPasswordReset,
} from '../actions/auth';

class PasswordRecovery extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    isSuccess: PropTypes.bool,
    errors: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      repassword: PropTypes.string,
    }),
    verificationCode: PropTypes.string,
    isValidVerificationCode: PropTypes.bool,
  };

  static defaultProps = {
    errors: {},
    isSubmitting: false,
    isSuccess: false,
    verificationCode: undefined,
    isValidVerificationCode: undefined,
  };

  state = {
    email: '',
    password: '',
    repassword: '',
  };

  componentDidMount() {
    const { dispatch, verificationCode } = this.props;

    dispatch(resetAuthForms());
    if (verificationCode) {
      dispatch(verifyPasswordResetCode(verificationCode));
    }
  }

  onChangeField = key => e => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  handleResetPassword = e => {
    const { dispatch, isSubmitting } = this.props;
    const { email } = this.state;

    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    dispatch(sendPasswordResetEmail(email));
  };

  handleNewPasswordSubmit = e => {
    const { dispatch, isSubmitting, verificationCode } = this.props;
    const { password, repassword } = this.state;

    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (password !== repassword) {
      // Password and Confirmation password doesn't match
      dispatch(resetPasswordError(ERROR_ACCOUNT_CONFIRM_PASSWORD));
      return;
    }

    dispatch(confirmPasswordReset(verificationCode, password));
  };

  renderStep1() {
    const { email } = this.state;
    const { isSuccess, isSubmitting, errors } = this.props;

    const success = () => (
      <Form className="form_account">
        <p>You should have received an email with instructions on how to reset your password.</p>
        <p>Please check your spam/junk inbox as well.</p>
      </Form>
    );

    return isSuccess ? success() : (
      <Form className="form_account" onSubmit={this.handleResetPassword}>
        <FormRow>
          <p>
            Not a pity. Simply put you email below and we&#39;ll send you instructions to reset your
            password.
          </p>
        </FormRow>
        <InputRow
          name="email"
          type="email"
          label="Business email"
          value={email}
          error={errors.email}
          onChange={this.onChangeField('email')}
          required
        />
        <FormRow type="submit">
          <Button type="submit" styleType="primary" disabled={isSubmitting} isFullWidth>
            Reset Password
          </Button>
        </FormRow>
      </Form>
    );
  }

  renderStep2() {
    const { password, repassword } = this.state;
    const { isSuccess, isSubmitting, errors, isValidVerificationCode } = this.props;

    // strictly false
    if (isValidVerificationCode === false) {
      // Show invalid message
      return (
        <Form className="form_account">
          <FormRow className="text_size_bigger text_align_center">
            Verification code is expired or invalid.
          </FormRow>
          <FormRow type="submit" className="text_align_center">
            <Button href="/password-recovery" size="small">
              Reset password
            </Button>
          </FormRow>
        </Form>
      );
    }
    // not defined yet...
    if (isValidVerificationCode === undefined) {
      // ...wait for code verification. Show spinner
      return (
        <p className="text_align_center">
          <Icon name="spin" />
        </p>
      );
    }

    const success = () => (
      <Form className="form_account">
        <FormRow className="text_align_center text_size_bigger">
          All done! Go ahead, sign in with your new password.
        </FormRow>
        <FormRow className="text_align_center">
          <Button href="/sign-in" size="small">
            Sign In
          </Button>
        </FormRow>
      </Form>
    );

    return isSuccess ? success() : (
      <Form className="form_account" onSubmit={this.handleNewPasswordSubmit}>
        <FormRow>
          <h3>Set new password</h3>
        </FormRow>
        <InputRow
          name="password"
          type="password"
          label="New password"
          value={password}
          error={errors.password}
          onChange={this.onChangeField('password')}
          minLength="1"
          required
        />
        <InputRow
          name="repassword"
          type="password"
          label="Confirm password"
          value={repassword}
          error={errors.repassword}
          onChange={this.onChangeField('repassword')}
          minLength="1"
          required
        />
        <FormRow type="submit">
          <Button type="submit" styleType="primary" disabled={isSubmitting} isFullWidth>
            Set new password
          </Button>
        </FormRow>
      </Form>
    );
  }

  render() {
    const { verificationCode } = this.props;

    return (
      <Layout>
        <Layout.Header>
          <Header btnBack btnUser />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title="Password Recovery" subtitle="" />
            {verificationCode ? this.renderStep2() : this.renderStep1()}
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth } = state;
  const { isAuthenticated, errors, isSubmitting, isSuccess, isValidVerificationCode } = auth;
  const { verificationCode } = ownProps.match.params;

  return {
    isAuthenticated,
    verificationCode,
    isValidVerificationCode,
    isSubmitting,
    isSuccess,
    errors,
  };
};
export default connect(mapStateToProps)(PasswordRecovery);
