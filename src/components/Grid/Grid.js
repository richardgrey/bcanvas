import React from 'react';
import PropTypes from 'prop-types';
import GridRow from './GridRow';
import GridCol from './GridCol';
import './Grid.scss';

const Grid = ({ children, className }) => (
  <div className={['grid', className].join(' ')}>{children}</div>
);

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Grid.defaultProps = {
  children: null,
  className: undefined,
};

Grid.Col = GridCol;
Grid.Row = GridRow;

export default Grid;
