import React from 'react';
import b from 'b_';
import PropTypes from 'prop-types';

const FormRow = ({ type, className, children }) => {
  const cls = b('form__row', {
    [type]: !!type,
  });
  return <div className={`${cls} ${className || ''}`}>{children}</div>;
};

FormRow.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
FormRow.defaultProps = {
  type: null,
  className: null,
  children: null,
};

export default FormRow;
