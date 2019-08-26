import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import AuthHeaderText from '../components/AuthHeaderText/AuthHeaderText';
import PageTitle from '../components/PageTitle/PageTitle';
import FormRegister from '../components/FormRegister/FormRegister';

class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool,
    errorRegister: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    location: PropTypes.shape({
      state: PropTypes.any,
    }).isRequired,
  };

  static defaultProps = {
    errorRegister: undefined,
    isSubmitting: false,
  };

  render() {
    const { dispatch, location, errorRegister, isSubmitting, isAuthenticated } = this.props;
    const historyState = location.state;

    if (isAuthenticated) {
      return <Redirect to={(historyState && historyState.from) || '/'} />;
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
                Already have an account? <Link to={signInLink}>Sign In</Link>
              </AuthHeaderText>
            }
          />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title="Create your account" subtitle="One step away from your first canvas." />
            <FormRegister dispatch={dispatch} errors={errorRegister} isSubmitting={isSubmitting} />
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated, errorRegister, isSubmitting } = auth;

  return {
    isAuthenticated,
    errorRegister,
    isSubmitting,
  };
};

export default connect(mapStateToProps)(Register);
