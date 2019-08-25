/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Portal from '../Portal/Portal';
import Icon from '../Icon/Icon';
import { locationPropType } from '../../utils/propTypes';
import './Modal.scss';

const MOUNT_NODE_LOCK_CLASS = 'modal-scroll-lock';

class Modal extends Component {
  static propTypes = {
    location: locationPropType.isRequired,
    isOpened: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),
    // Call callback that should change isOpened property.
    onClose: PropTypes.func,
  };

  static defaultProps = {
    size: 'medium',
    onClose: null,
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
    const { location, isOpened } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      this.onClose();
    }
    if (isOpened !== prevProps.isOpened) {
      this[isOpened ? 'onOpen' : 'onClose']();
    }
  }

  componentWillUnmount() {
    this.originalTarget = null;
    if (this.props.isOpened) {
      this.onClose();
    }
  }

  onOpen = () => {
    const doc = this.mountNode;
    doc.addEventListener('keydown', this.onDocumentKeyDown, false);
    doc.classList.add(MOUNT_NODE_LOCK_CLASS);
  };

  onClose = () => {
    const doc = this.mountNode;
    doc.removeEventListener('keydown', this.onDocumentKeyDown, false);
    doc.classList.remove(MOUNT_NODE_LOCK_CLASS);
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  onDocumentKeyDown = e => {
    // Escape key
    if (e.key === 'Escape') {
      this.onClose();
    }
  };

  onBackdropMouseDown = e => {
    this.originalTarget = e.target;
  };

  onBackdropMouseUp = e => {
    if (this.originalTarget === e.currentTarget) {
      this.onClose();
    }
  };

  render() {
    const { isOpened, children, size, onClose } = this.props;
    const modSize = ` modal__container_size_${size}`;

    if (!isOpened) {
      return null;
    }

    return (
      <Portal>
        <div className="modal">
          <div
            className="modal__backdrop"
            onMouseDown={this.onBackdropMouseDown}
            onMouseUp={this.onBackdropMouseUp}
          >
            <div className={`modal__container${modSize}`}>
              {children}
              <button type="button" className="modal__close" onClick={onClose}>
                <Icon name="cross" />
              </button>
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

export default withRouter(Modal);
