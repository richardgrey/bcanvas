import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

const FormHint = ({ children }) => <div className="form__hint">{children}</div>;

FormHint.propTypes = {
  children: PropTypes.node,
};

FormHint.defaultProps = {
  children: null,
};

export default FormHint;
