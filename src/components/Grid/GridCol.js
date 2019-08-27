import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';

const GridCol = ({ children, xl, md, sm, xlOffset, mdOffset, smOffset, ...other }) => (
  <div
    className={b('grid', 'col', {
      xl,
      md,
      sm,
      'offset-xl': xlOffset,
      'offset-md': mdOffset,
      'offset-sm': smOffset,
    })}
    {...other}
  >
    {children}
  </div>
);

GridCol.propTypes = {
  children: PropTypes.node,
  xl: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xlOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  smOffset: PropTypes.number,
};

GridCol.defaultProps = {
  children: null,
  xl: undefined,
  md: undefined,
  sm: undefined,
  xlOffset: undefined,
  mdOffset: undefined,
  smOffset: undefined,
};

export default GridCol;
