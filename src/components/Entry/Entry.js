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
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    canvasId: PropTypes.string,
    isHidden: PropTypes.bool,
    isOptimistic: PropTypes.bool,
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    dispatch: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    id: null,
    value: '',
    canvasId: null,
    isHidden: false,
    isOptimistic: false,
    inputRef: null,
  };

  onPaste(e) {
    e.preventDefault();
    document.execCommand('inserttext', false, e.clipboardData.getData('Text'));
  }

  onKeyUp(e) {
    if (e.key === 'Escape') {
      e.target.blur();
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const value = e.target.innerText;
      this.submitEntry(value.trim(), e.target);
    }
  }

  submitEntry(val, target) {
    const { dispatch, canvasId, id, value, label, isOptimistic } = this.props;

    if (val === value) {
      // Imitate submission.
      focusNextEntry(target);
      return;
    }

    // Flag isOptimistic indicates that current entry was added without positive response from
    // the server. The changes should not be processed.
    if (!canvasId || isOptimistic) {
      return;
    }

    if (id) {
      if (val) {
        // Update existing entry
        dispatch(updateEntry(canvasId, id, { label, value: val }));
      } else {
        // Remove entry. Move focus to next input
        dispatch(removeEntry(canvasId, id));
      }
      focusNextEntry(target);
    } else if (val) {
      // Creates new entry that will render via state update
      dispatch(addEntry(canvasId, { label, value: val }));
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
        role="textbox"
        tabIndex="0"
        contentEditable
        suppressContentEditableWarning
        aria-placeholder="Type in something..."
        onKeyPress={e => this.onKeyPress(e)}
        onKeyUp={this.onKeyUp}
        onPaste={this.onPaste}
        ref={inputRef}
      >
        <span>{value}</span>
      </div>
    ) : (
      <div className="entry">
        <span>{value}</span>
      </div>
    );
  }
}

export default Entry;
