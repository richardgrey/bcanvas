import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

const FormError = ({ children }) => <div className="form__error">{children}</div>;

FormError.propTypes = {
  children: PropTypes.node,
};

FormError.defaultProps = {
  children: null,
};

export default FormError;
