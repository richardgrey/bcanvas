import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import './Section.scss';

const Section = ({ fluid, bg, indent, spacing, children, ...other }) => (
  <div className={b('section', { fluid, spacing, bg, indent })} {...other}>
    {children}
  </div>
);

Section.propTypes = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
  bg: PropTypes.oneOf(['gray', 'lightgray']),
  indent: PropTypes.oneOf(['large', 'medium', 'small', 'none']),
  spacing: PropTypes.oneOf(['large', 'medium', 'small', 'none']),
};

Section.defaultProps = {
  children: null,
  fluid: false,
  bg: undefined,
  indent: undefined,
  spacing: undefined,
};

export default Section;
