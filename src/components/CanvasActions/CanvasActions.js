import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalShare from '../ModalShare/ModalShare';
import HeaderButton from '../HeaderButton/HeaderButton';
import Modal from '../Modal/Modal';

class CanvasActions extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    canvas: PropTypes.shape({}).isRequired,
  };

  onShareClick = () => {
    const { dispatch, canvas } = this.props;

    Modal.open({
      size: 'medium',
      content: <ModalShare canvas={canvas} dispatch={dispatch} />,
    });
  };

  onPrintClick = () => {
    window.print();
  };

  render() {
    return (
      <>
        <HeaderButton icon="print" label="Print" onClick={this.onPrintClick} />
        <HeaderButton icon="share" label="Share" onClick={this.onShareClick} />
      </>
    );
  }
}

export default CanvasActions;
