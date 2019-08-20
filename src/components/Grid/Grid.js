import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import './Grid.scss';

export const Grid = ({ children }) => (
  <div className="grid">{children}</div>
);
Grid.propTypes = {
  children: PropTypes.node,
};
Grid.defaultProps = {
  children: null,
};

export const GridRow = ({ children, justify }) => (
  <div className={b('grid', 'row', { justify })}>{children}</div>
);
GridRow.propTypes = {
  children: PropTypes.node,
  justify: PropTypes.oneOf(['center']),
};
GridRow.defaultProps = {
  children: null,
  justify: undefined,
};

export const GridCol = ({ children, xl, md, sm, xlOffset, mdOffset, smOffset }) => (
  <div
    className={b('grid', 'col', {
      xl,
      md,
      sm,
      'offset-xl': xlOffset,
      'offset-md': mdOffset,
      'offset-sm': smOffset,
    })}
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
