import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import './Grid.scss';

const GridRow = ({ children, valign, reverse }) => (
  <div className={b('grid', 'row', { valign, reverse })}>{children}</div>
);

GridRow.propTypes = {
  children: PropTypes.node,
  valign: PropTypes.oneOf(['top', 'center', 'bottom', 'baseline']),
  reverse: PropTypes.bool,
};

GridRow.defaultProps = {
  children: null,
  valign: undefined,
  reverse: false,
};

export default GridRow;
