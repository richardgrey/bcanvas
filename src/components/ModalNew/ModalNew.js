import React from 'react';
import PropTypes from 'prop-types';
import CreateCanvasSection from '../CreateCanvasSection/CreateCanvasSection';
import Modal from '../Modal/Modal';

const ModalNew = ({ isOpened, close }) => (
  <Modal size="large" isOpened={isOpened} onClose={close}>
    <div className="modal-new">
      <h2 className="text_align_center">Create new canvas</h2>
      <CreateCanvasSection size="small" />
    </div>
  </Modal>
);

ModalNew.propTypes = {
  isOpened: PropTypes.bool,
  close: PropTypes.func,
};

ModalNew.defaultProps = {
  isOpened: false,
  close: null,
};

export default ModalNew;
