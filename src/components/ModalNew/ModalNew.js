import React from 'react';
import PropTypes from 'prop-types';
import CreateCanvasSection from '../CreateCanvasSection/CreateCanvasSection';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const ModalNew = ({ isOpened, close }) => (
  <Modal size="large" isOpened={isOpened} onClose={close}>
    <div className="modal-new">
      <h2>Create New Canvas</h2>
      <CreateCanvasSection size="small" withDescription />
      <Button size="small" styleType="ghost" onClick={close}>
        Cancel
      </Button>
    </div>
  </Modal>
);

ModalNew.propTypes = {
  close: PropTypes.func,
  isOpened: PropTypes.bool,
};
ModalNew.defaultProps = {
  isOpened: false,
  close: null,
};

export default ModalNew;
