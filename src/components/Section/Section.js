import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import './Section.scss';

const Section = ({ className, fluid, bg, indent, spacing, children, ...other }) => {
  const cls = b('section', { fluid, spacing, bg, indent });
  return (
    <div className={`${cls} ${className}`} {...other}>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  bg: PropTypes.oneOf(['gray', 'lightgray']),
  indent: PropTypes.oneOf(['large', 'medium', 'small', 'none']),
  spacing: PropTypes.oneOf(['large', 'medium', 'small', 'none']),
};

Section.defaultProps = {
  children: null,
  className: undefined,
  fluid: false,
  bg: undefined,
  indent: undefined,
  spacing: undefined,
};

export default Section;
