import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Entry from '../Entry/Entry';
import './CanvasColumn.scss';

class CanvasColumn extends Component {
  static propTypes = {
    canvasId: PropTypes.string.isRequired,

    entries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),

    column: PropTypes.shape({
      label: PropTypes.string,
      number: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,

    dispatch: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    entries: [],
  };

  constructor(props) {
    super(props);
    this.newEntryRef = React.createRef();
  }

  onClick(e) {
    if (!(e.target.nodeName === 'INPUT' || e.target.getAttribute('role') === 'textbox')) {
      this.newEntryRef.current.focus();
    }
  }

  render() {
    const { column, entries, canvasId, dispatch, canEdit } = this.props;
    const { label, title, description } = column || {};
    const readOnlyClass = !canEdit ? ' canvas-column_read-only' : '';

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      <div
        onClick={e => canEdit && this.onClick(e)}
        className={`canvas-column canvas-column_${label}${readOnlyClass}`}
      >
        <h3 className="canvas-column__title">{title}</h3>
        <div className="canvas-column__hints">
          {description.map(descr => (
            <p key={descr}>{descr}</p>
          ))}
        </div>
        <div className="canvas-column__entries">
          {entries.map(entry => (
            <Entry
              key={entry.id}
              label={label}
              canEdit={canEdit}
              canvasId={canvasId}
              dispatch={dispatch}
              {...entry}
            />
          ))}
          {canEdit ? (
            <Entry
              label={column.label}
              canvasId={canvasId}
              dispatch={dispatch}
              canEdit={canEdit}
              inputRef={this.newEntryRef}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CanvasColumn;
