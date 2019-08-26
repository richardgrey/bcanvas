import React from 'react';
import PropTypes from 'prop-types';
import './Divider.scss';

const Divider = ({ children }) => (
  <div className="divider">
    {children ? <span className="divider__inner">{children}</span> : null}
  </div>
);

Divider.propTypes = {
  children: PropTypes.node,
};

Divider.defaultProps = {
  children: null,
};

export default Divider;
