import React from 'react';
import PropTypes from 'prop-types';
import './Separator.scss';

const Separator = ({ children }) => (
  <div className="separator">
    {children ? <span className="separator__inner">{children}</span> : null}
  </div>
);

Separator.propTypes = {
  children: PropTypes.node,
};

Separator.defaultProps = {
  children: null,
};

export default Separator;
