import React from 'react';
import PropTypes from 'prop-types';
import CanvasColumn from '../CanvasColumn/CanvasColumn';
import schemas from '../../constants/schemas';
import './CanvasTable.scss';

const CanvasTable = props => {
  const { entries, type, canvasId, dispatch, canEdit, isLoading } = props;
  const { schema } = schemas[type];

  return (
    <div className="canvas-table">
      {schema.map(column => {
        const { label } = column;
        return (
          <CanvasColumn
            canvasId={canvasId}
            key={label}
            column={column}
            entries={entries[label]}
            dispatch={dispatch}
            canEdit={canEdit}
          />
        );
      })}
      {isLoading ? <div className="canvas-table__loader" /> : null}
    </div>
  );
};

CanvasTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  canvasId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  entries: PropTypes.shape({
    partners: PropTypes.arrayOf(PropTypes.object),
    activities: PropTypes.arrayOf(PropTypes.object),
    resources: PropTypes.arrayOf(PropTypes.object),
    proposition: PropTypes.arrayOf(PropTypes.object),
    relationships: PropTypes.arrayOf(PropTypes.object),
    channels: PropTypes.arrayOf(PropTypes.object),
    customers: PropTypes.arrayOf(PropTypes.object),
    cost: PropTypes.arrayOf(PropTypes.object),
    revenue: PropTypes.arrayOf(PropTypes.object),
  }),
};

CanvasTable.defaultProps = {
  entries: {},
};

export default CanvasTable;
