import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PageTitle from '../components/PageTitle/PageTitle';
import Button from '../components/Button/Button';
import { FormRow } from '../components/Form/Form';
import Icon from '../components/Icon/Icon';
import { resetAuthForms, verifyActionCode } from '../actions/auth';

class EmailVerification extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    verificationCode: PropTypes.string,
    isValidVerificationCode: PropTypes.bool,
  };

  static defaultProps = {
    verificationCode: undefined,
    isValidVerificationCode: undefined,
  };

  componentDidMount() {
    const { dispatch, verificationCode } = this.props;

    dispatch(resetAuthForms());
    if (verificationCode) {
      dispatch(verifyActionCode(verificationCode));
    }
  }

  renderResult() {
    const { verificationCode, isValidVerificationCode } = this.props;

    // strictly false
    if (!verificationCode || isValidVerificationCode === false) {
      // Show invalid message
      return (
        <div className="text_size_bigger text_align_center">
          <FormRow>Verification code is expired or invalid.</FormRow>
          <FormRow type="submit">
            <Button href="/" size="small">
              Back to home
            </Button>
          </FormRow>
        </div>
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

    return (
      <div className="text_align_center text_size_bigger">
        <FormRow>Thank you, your email now officially verified!</FormRow>
        <FormRow type="submit">
          <Button href="/" size="small">
            Back to home
          </Button>
        </FormRow>
      </div>
    );
  }

  render() {
    return (
      <Layout>
        <Layout.Header>
          <Header btnBack btnUser />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title="Email Verification" subtitle="" />
            {this.renderResult()}
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { verificationCode } = ownProps.match.params;
  const {
    isAuthenticated,
    isValidVerificationCode,
    authActionEmail,
    isSuccess,
    isSubmitting,
  } = state.auth;

  return {
    isAuthenticated,
    verificationCode,
    isValidVerificationCode,
    authActionEmail,
    isSuccess,
    isSubmitting,
  };
};
export default connect(mapStateToProps)(EmailVerification);
