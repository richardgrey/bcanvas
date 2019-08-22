import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import Entry from '../Entry/Entry';
import './CanvasColumn.scss';

class CanvasColumn extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    canvasId: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,

    column: PropTypes.shape({
      label: PropTypes.string,
      number: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,

    entries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
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
    const { label, title, description } = column;
    const cls = b('canvas-column', {
      'read-only': !canEdit,
      [label]: !!label,
    });

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      <div className={cls} onClick={e => canEdit && this.onClick(e)}>
        <h2 className="canvas-column__title">{title}</h2>
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
