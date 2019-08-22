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
import { DEFAULT_USER_NAME } from '../constants';
import { updateAccountFormReset, updateEmail } from '../actions/account';

class ChangeEmail extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool,
    displayName: PropTypes.string,
    email: PropTypes.string,
    isSubmitting: PropTypes.bool,
    errors: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
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
    email: '',
    password: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(updateAccountFormReset());
  }

  onSubmit(e) {
    const { dispatch, isSubmitting } = this.props;
    const { email, password } = this.state;

    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    dispatch(updateEmail(email, password));
  }

  onChangeField(key, value) {
    const newState = { [key]: value };
    this.setState(newState);
  }

  render() {
    const { isAuthenticated, displayName, email, errors, isSubmitting, isSuccess } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <Layout>
        <Layout.Header>
          <Header btnBack btnUser />
        </Layout.Header>
        <Layout.Container>
          <PageTitle title={displayName} subtitle={email} />
          {isSuccess ? (
            <AccountFormSuccess />
          ) : (
            <Form className="form_account" onSubmit={e => this.onSubmit(e)}>
              <FormRow className="form__row">
                <h3>Change email</h3>
              </FormRow>
              <InputRow
                name="email"
                type="email"
                label="New email"
                value={this.state.email}
                error={errors.email}
                onChange={e => this.onChangeField('email', e.target.value)}
                required
              />
              <InputRow
                name="password"
                type="password"
                label="Password"
                value={this.state.password}
                error={errors.password}
                onChange={e => this.onChangeField('password', e.target.value)}
                minLength="6"
                required
              />
              <FormRow type="submit">
                <Button type="submit" styleType="primary" disabled={isSubmitting} isFullWidth>
                  Send confirmation email
                </Button>
              </FormRow>
            </Form>
          )}
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth, account } = state;
  const { isAuthenticated } = auth;
  const { displayName, email, errors, isSubmitting, isSuccess } = account;

  return {
    isAuthenticated,
    displayName,
    email,
    errors,
    isSubmitting,
    isSuccess,
  };
};

export default connect(mapStateToProps)(ChangeEmail);
