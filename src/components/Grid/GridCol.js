import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';

const GridCol = ({ children, xs, sm, md, xl, xsOffset, smOffset, mdOffset, xlOffset, ...other }) => (
  <div
    className={b('grid', 'col', {
      xs,
      sm,
      md,
      xl,
      'offset-xs': xsOffset,
      'offset-sm': smOffset,
      'offset-md': mdOffset,
      'offset-xl': xlOffset,
    })}
    {...other}
  >
    {children}
  </div>
);

GridCol.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  xl: PropTypes.number,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  xlOffset: PropTypes.number,
};

GridCol.defaultProps = {
  children: null,
  xs: undefined,
  sm: undefined,
  md: undefined,
  xl: undefined,
  xsOffset: undefined,
  smOffset: undefined,
  mdOffset: undefined,
  xlOffset: undefined,
};

export default GridCol;
