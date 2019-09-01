import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addEntry, updateEntry, removeEntry } from '../../actions/entry';
import './Entry.scss';

const setCursorToTheEnd = contentEditableElement => {
  // Firefox, Chrome, Opera, Safari, IE 9+
  const range = document.createRange();
  range.selectNodeContents(contentEditableElement);
  range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
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

  componentDidMount() {
    window.addEventListener('blur', this.handleWindowBlur, false);
  }

  componentWillUnmount() {
    window.removeEventListener('blur', this.handleWindowBlur, false);
  }

  handleWindowBlur = () => {
    clearTimeout(this.submitOnBlurTimer);
  };

  onPaste = e => {
    e.preventDefault();
    document.execCommand('inserttext', false, e.clipboardData.getData('Text'));
  };

  onBlur = e => {
    const { id } = this.props;
    const { target } = e;
    const text = target.innerText.trim();

    // Postpone action to cover the case when blur happened on changing active window/tab
    this.submitOnBlurTimer = setTimeout(() => {
      if (id) {
        target.innerHTML = `<span>${text}</span>`;
      } else {
        target.innerHTML = '';
      }
      this.submitEntry(text, false);
    }, 0);
  };

  onKeyDown = e => {
    const { id } = this.props;
    const { target, key } = e;
    let text;

    if (key === 'Enter') {
      e.preventDefault();

      if (id) {
        // update existing entry
        e.target.blur();
        focusNextEntry(target);
      } else if (target.innerText.trim()) {
        // For new entry field act only if any text entered
        e.target.blur();
        // Keep focus for new entry field
        e.target.focus();
      }
    }
    if (!id && key === 'Tab') {
      text = target.innerText.trim();
      if (text) {
        e.preventDefault();
        this.submitEntry(text);
        target.innerHTML = '';
      }
    }
  };

  onKeyUp = e => {
    const { value } = this.props;
    if (e.key === 'Escape') {
      e.target.innerText = value;
      e.target.blur();
    }
  };

  submitEntry(val) {
    const { dispatch, canvasId, id, value, label } = this.props;

    if (!canvasId || val === value) {
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
    } else if (val) {
      // Creates new entry that will render via state update. Clear input for next entry
      dispatch(addEntry(canvasId, label, val));
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
        onKeyDown={this.onKeyDown}
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
