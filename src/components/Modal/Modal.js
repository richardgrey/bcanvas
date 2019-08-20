/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Icon from '../Icon/Icon';
import './Modal.css';

class Modal extends Component {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),
    containerClassName: PropTypes.string,
    // Call callback that should change isOpened property.
    onCloseEvent: PropTypes.func,
  };

  static defaultProps = {
    size: 'medium',
    containerClassName: null,
    onCloseEvent: () => {},
  };

  constructor(props) {
    super(props);
    this.mountNode = document.body;
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.isOpened) {
      this.onOpen();
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpened } = this.props;

    if (isOpened && !prevProps.isOpened) {
      this.onOpen();
    } else if (!isOpened && prevProps.isOpened) {
      this.onClose();
    }
  }

  componentWillUnmount() {
    if (this.props.isOpened) {
      this.onClose();
    }
  }

  onRendered() {
    // Do something with component node once rendered
  }

  onOpen() {
    const doc = this.mountNode;
    doc.addEventListener('keydown', this.onDocumentKeyDown, false);
    doc.classList.add('body_lock');
  }

  onClose() {
    const doc = this.mountNode;
    doc.removeEventListener('keydown', this.onDocumentKeyDown, false);
    doc.classList.remove('body_lock');
  }

  onDocumentKeyDown(e) {
    // Escape key
    if (e.key === 'Escape') {
      this.props.onCloseEvent();
    }
  }

  onBackdropClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onCloseEvent();
  }

  render() {
    const {
      isOpened,
      children,
      size,
      containerClassName,
      onCloseEvent,
    } = this.props;
    const modSize = ` modal__container_size_${size}`;

    if (!isOpened) {
      return null;
    }

    return (
      <Portal onRendered={this.onRendered}>
        <div className="modal">
          <div
            className="modal__backdrop"
            onClick={e => this.onBackdropClick(e)}
          >
            <div className={`modal__container${modSize} ${containerClassName || ''}`}>
              {children}
              <button className="modal__close" onClick={() => onCloseEvent()}>
                <Icon name="cross" />
              </button>
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

export default Modal;
