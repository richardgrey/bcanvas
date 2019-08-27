import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import GridCol from './GridCol';
import './Grid.scss';

const Grid = ({ children, valign, reverse }) => (
  <div className={b('grid', { valign, reverse })}>{children}</div>
);

Grid.propTypes = {
  children: PropTypes.node,
  valign: PropTypes.oneOf(['top', 'center', 'bottom', 'baseline']),
  reverse: PropTypes.bool,
};

Grid.defaultProps = {
  children: null,
  valign: undefined,
  reverse: false,
};

Grid.Col = GridCol;

export default Grid;
