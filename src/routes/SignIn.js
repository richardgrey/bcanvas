import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import AuthHeaderText from '../components/AuthHeaderText/AuthHeaderText';
import PageTitle from '../components/PageTitle/PageTitle';
import FormLogin from '../components/FormLogin/FormLogin';

class SignIn extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool,
    errorLogin: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    location: PropTypes.shape({
      state: PropTypes.any,
    }).isRequired,
  };

  static defaultProps = {
    errorLogin: undefined,
    isSubmitting: false,
  };

  render() {
    const { dispatch, location, errorLogin, isSubmitting, isAuthenticated } = this.props;
    const historyState = location.state;

    if (isAuthenticated) {
      return <Redirect to={(historyState && historyState.from) || '/'} />;
    }

    const registerLink = {
      pathname: '/register',
      state: historyState,
    };

    return (
      <Layout>
        <Layout.Header>
          <Header
            btnBack
            right={
              <AuthHeaderText>
                Don’t have an account? <Link to={registerLink}>Register</Link>
              </AuthHeaderText>
            }
          />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title="Welcome back" subtitle="It’s nice to see you again." />
            <FormLogin dispatch={dispatch} errors={errorLogin} isSubmitting={isSubmitting} />
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated, errorLogin, isSubmitting } = auth;

  return {
    isAuthenticated,
    errorLogin,
    isSubmitting,
  };
};

export default connect(mapStateToProps)(SignIn);
