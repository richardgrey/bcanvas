import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addEntry, updateEntry, removeEntry } from '../../actions/entry';
import './Entry.scss';

const setCursorToTheEnd = contentEditableElement => {
  let range;
  let selection;

  if (document.createRange) {
    // Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (document.selection) {
    // IE 8 and lower
    range = document.body.createTextRange();
    range.moveToElementText(contentEditableElement);
    range.collapse(false);
    range.select();
  }
};

const focusNextEntry = el => {
  const nextEl = el.nextElementSibling;
  if (nextEl && nextEl.classList.contains('entry')) {
    nextEl.focus();
    setCursorToTheEnd(nextEl);
  }
};

class Entry extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.string,
    canvasId: PropTypes.string,
    isHidden: PropTypes.bool,
    isError: PropTypes.bool,
    // Forwarded ref to access DOM element outside of the component
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  static defaultProps = {
    id: null,
    value: '',
    canvasId: null,
    isHidden: false,
    isError: false,
    inputRef: null,
  };

  // onFocus = e => {
  //   e.target.innerHTML = e.target.innerText;
  // };

  onBlur = e => {
    e.target.innerHTML = `<span>${e.target.innerText}</span>`;
  };

  onPaste = e => {
    e.preventDefault();
    document.execCommand('inserttext', false, e.clipboardData.getData('Text'));
  };

  onKeyUp = e => {
    if (e.key === 'Escape') {
      e.target.innerText = this.props.value;
      e.target.blur();
    }
  };

  onKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const val = e.target.innerText;
      this.submitEntry(val.trim(), e.target);
    }
  };

  submitEntry(val, target) {
    const { dispatch, canvasId, id, value, label } = this.props;

    if (val === value) {
      // Imitate submission.
      focusNextEntry(target);
      return;
    }

    if (!canvasId) {
      return;
    }

    if (id) {
      if (val) {
        // Update existing entry
        dispatch(updateEntry(canvasId, id, val));
      } else {
        // Remove entry. Move focus to next input
        dispatch(removeEntry(canvasId, id));
      }
      focusNextEntry(target);
    } else if (val) {
      // Creates new entry that will render via state update
      dispatch(addEntry(canvasId, label, val));
      target.innerText = '';
    }
  }

  render() {
    const { value, isHidden, inputRef, canEdit } = this.props;

    if (isHidden) {
      return null;
    }

    return canEdit ? (
      <div
        className="entry"
        ref={inputRef}
        role="textbox"
        tabIndex="0"
        contentEditable
        suppressContentEditableWarning
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPress}
        onKeyUp={this.onKeyUp}
        onPaste={this.onPaste}
      >
        <span>{value}</span>
      </div>
    ) : (
      <div className="entry entry_disabled">
        <span>{value}</span>
      </div>
    );
  }
}

export default Entry;
