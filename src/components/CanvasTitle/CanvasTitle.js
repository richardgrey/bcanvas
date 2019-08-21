import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import { updateCanvasTitle } from '../../actions/canvas';
import { DEFAULT_CANVAS_TITLE } from '../../constants';
import './CanvasTitle.scss';

class CanvasTitle extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    canvasId: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.title !== state.propsTitle) {
      const title = props.title || '';
      return {
        title,
        lastSavedTitle: title,
        propsTitle: props.title,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      // propsTitle needed to detect whenever new title comes from props
      propsTitle: props.title,
      title: props.title || '',
      lastSavedTitle: props.title || '',
      isFocused: false,
    };
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ title: value });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      // Blur will dispatch changes
      e.target.blur();
    }
  }

  onFocus() {
    this.setState({
      isFocused: true,
    });
  }

  onBlur() {
    this.setState({
      isFocused: false,
    });
    this.dispatchChanges();
  }

  dispatchChanges() {
    const { dispatch, canvasId } = this.props;
    const { title, lastSavedTitle } = this.state;

    if (lastSavedTitle !== title) {
      dispatch(updateCanvasTitle(canvasId, title));
      this.setState({
        lastSavedTitle: title,
      });
    }
  }

  render() {
    const { canEdit } = this.props;
    const { title, isFocused } = this.state;
    const cls = b('canvas-title', {
      focused: isFocused,
      empty: !title,
      'read-only': !canEdit,
    });
    return (
      <div className={cls}>
        {canEdit ? (
          <input
            className="canvas-title__input"
            value={title}
            autoFocus={!title && canEdit}
            placeholder="Canvas Title..."
            onKeyPress={e => this.onKeyPress(e)}
            onChange={e => this.onChange(e)}
            onFocus={e => this.onFocus(e)}
            onBlur={e => this.onBlur(e)}
            disabled={!canEdit}
          />
        ) : (
          <div className="canvas-title__input">{title || DEFAULT_CANVAS_TITLE}</div>
        )}
      </div>
    );
  }
}

export default CanvasTitle;
