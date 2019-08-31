import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import AuthHeaderText from '../components/AuthHeaderText/AuthHeaderText';
import PageTitle from '../components/PageTitle/PageTitle';
import FormRegister from '../components/FormRegister/FormRegister';
import { resetAuthForms } from '../actions/auth';

class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool,
    errors: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    location: PropTypes.shape({
      state: PropTypes.any,
    }).isRequired,
  };

  static defaultProps = {
    errors: undefined,
    isSubmitting: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetAuthForms());
  }

  render() {
    const { dispatch, location, errors, isSubmitting, isAuthenticated } = this.props;
    const historyState = location.state;

    if (isAuthenticated) {
      return <Redirect to={(historyState && historyState.redirectTo) || '/'} />;
    }

    const signInLink = {
      pathname: '/sign-in',
      state: historyState,
    };

    return (
      <Layout>
        <Layout.Header>
          <Header
            btnBack
            right={
              <AuthHeaderText>
                <span>Already have an account?</span> <Link to={signInLink}>Sign In</Link>
              </AuthHeaderText>
            }
          />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title="Create your account" subtitle="One step away from your first canvas." />
            <FormRegister dispatch={dispatch} errors={errors} isSubmitting={isSubmitting} />
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated, errors, isSubmitting } = auth;

  return {
    isAuthenticated,
    errors,
    isSubmitting,
  };
};

export default connect(mapStateToProps)(Register);
