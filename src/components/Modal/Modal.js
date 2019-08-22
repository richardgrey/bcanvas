/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Icon from '../Icon/Icon';
import './Modal.scss';

const MOUNT_NODE_LOCK_CLASS = 'modal-scroll-lock';

class Modal extends Component {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),
    containerClassName: PropTypes.string,
    // Call callback that should change isOpened property.
    onClose: PropTypes.func,
  };

  static defaultProps = {
    size: 'medium',
    containerClassName: null,
    onClose: () => {},
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
    doc.classList.add(MOUNT_NODE_LOCK_CLASS);
  }

  onClose() {
    const doc = this.mountNode;
    doc.removeEventListener('keydown', this.onDocumentKeyDown, false);
    doc.classList.remove(MOUNT_NODE_LOCK_CLASS);
  }

  onDocumentKeyDown = (e) => {
    // Escape key
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.onClose();
  };

  render() {
    const { isOpened, children, size, containerClassName, onClose } = this.props;
    const modSize = ` modal__container_size_${size}`;

    if (!isOpened) {
      return null;
    }

    return (
      <Portal onRendered={this.onRendered}>
        <div className="modal">
          <div className="modal__backdrop" onClick={this.onBackdropClick}>
            <div className={`modal__container${modSize} ${containerClassName || ''}`}>
              {children}
              <button type="button" className="modal__close" onClick={() => onClose()}>
                <Icon name="cross" />
              </button>
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

Modal.open = function open(props) {
  const { onClose, content, ...others } = props;
  const div = document.createElement('div');
  document.body.appendChild(div);

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (onClose) {
      onClose();
    }
  }

  function render() {
    ReactDOM.render(
      <Modal isOpened onClose={destroy} {...others}>
        {React.cloneElement(content, { close: destroy })}
      </Modal>,
      div,
    );
  }

  render();

  return { close: destroy };
};

export default Modal;
