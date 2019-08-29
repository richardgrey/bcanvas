import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import './Grid.scss';

const GridRow = ({ children, className, valign, reverse }) => (
  <div className={[b('grid', 'row', { valign, reverse }), className].join(' ')}>{children}</div>
);

GridRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  valign: PropTypes.oneOf(['top', 'center', 'bottom', 'baseline']),
  reverse: PropTypes.bool,
};

GridRow.defaultProps = {
  children: null,
  className: null,
  valign: undefined,
  reverse: false,
};

export default GridRow;
