import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PageTitle from '../components/PageTitle/PageTitle';
import AccountFormSuccess from '../components/AccountFormSuccess/AccountFormSuccess';
import Button from '../components/Button/Button';
import Form, { InputRow, FormRow } from '../components/Form/Form';
import { DEFAULT_USER_NAME, ERROR_ACCOUNT_CONFIRM_PASSWORD } from '../constants';
import { locationPropType } from '../utils/propTypes';
import {
  updatePassword,
  updatePasswordForGoogleSignIn,
  updatePasswordError,
  updateAccountFormReset,
} from '../actions/account';

class ChangePassword extends Component {
  static propTypes = {
    location: locationPropType.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isGoogleOnly: PropTypes.bool.isRequired,
    displayName: PropTypes.string,
    email: PropTypes.string,
    isSubmitting: PropTypes.bool,
    isSuccess: PropTypes.bool,
    errors: PropTypes.shape({
      confirmPassword: PropTypes.string,
      password: PropTypes.string,
      repassword: PropTypes.string,
    }),
  };

  static defaultProps = {
    displayName: DEFAULT_USER_NAME,
    email: null,
    errors: {},
    isSubmitting: false,
    isSuccess: false,
  };

  state = {
    currentPassword: '',
    password: '',
    repassword: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(updateAccountFormReset());
  }

  onSubmit(e) {
    const { dispatch, isSubmitting, isGoogleOnly } = this.props;
    const { currentPassword, password, repassword } = this.state;

    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (password !== repassword) {
      // Password and Confirmation password doesn't match
      dispatch(updatePasswordError(ERROR_ACCOUNT_CONFIRM_PASSWORD));
      return;
    }

    if (isGoogleOnly) {
      dispatch(updatePasswordForGoogleSignIn(password));
    } else {
      dispatch(updatePassword(currentPassword, password));
    }
  }

  onChangeField(key, value) {
    const newState = { [key]: value };
    this.setState(newState);
  }

  render() {
    const { currentPassword, password, repassword } = this.state;
    const {
      location,
      isAuthenticated,
      displayName,
      email,
      isGoogleOnly,
      errors,
      isSubmitting,
      isSuccess,
    } = this.props;

    const historyState = location.state;
    const cancelHref = (historyState && historyState.from) || '/';

    if (!isAuthenticated) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <Layout>
        <Layout.Header>
          <Header btnBack btnUser />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title={displayName} subtitle={email} />
            {isSuccess ? (
              <AccountFormSuccess />
            ) : (
              <Form className="form_account" onSubmit={e => this.onSubmit(e)}>
                <FormRow>
                  <h3>Change password</h3>
                </FormRow>
                {isGoogleOnly ? (
                  <FormRow>
                    <p>
                      You are signed in with your Google account. However, you can set a password to{' '}
                      sign in with email/password in future.
                    </p>
                    <p>You’ll need to sign in to your Google account.</p>
                  </FormRow>
                ) : (
                  <InputRow
                    name="current-password"
                    type="password"
                    label="Current password"
                    value={currentPassword}
                    error={errors.confirmPassword}
                    onChange={e => this.onChangeField('currentPassword', e.target.value)}
                    minLength="6"
                    required
                  />
                )}
                <InputRow
                  name="password"
                  type="password"
                  label="New password"
                  value={password}
                  error={errors.password}
                  onChange={e => this.onChangeField('password', e.target.value)}
                  minLength="6"
                  required
                />
                <InputRow
                  name="repassword"
                  type="password"
                  label="Confirm password"
                  value={repassword}
                  error={errors.repassword}
                  onChange={e => this.onChangeField('repassword', e.target.value)}
                  minLength="6"
                  required
                />
                <FormRow type="submit">
                  <Button type="submit" styleType="primary" disabled={isSubmitting} isFullWidth>
                    Change password
                  </Button>
                </FormRow>
                <FormRow>
                  <Button
                    href={cancelHref}
                    type="button"
                    styleType="secondary"
                    disabled={isSubmitting}
                    isFullWidth
                  >
                    Cancel
                  </Button>
                </FormRow>
              </Form>
            )}
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth, account } = state;
  const { isAuthenticated } = auth;
  const { displayName, email, providers, errors, isSubmitting, isSuccess } = account;

  return {
    isAuthenticated,
    isGoogleOnly: providers && providers.length === 1 && providers[0] === 'google.com',
    displayName,
    email,
    errors,
    isSubmitting,
    isSuccess,
  };
};

export default connect(mapStateToProps)(ChangePassword);
