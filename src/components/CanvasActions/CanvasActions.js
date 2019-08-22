import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalShare from '../ModalShare/ModalShare';
import HeaderButton from '../HeaderButton/HeaderButton';

class CanvasActions extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    canvas: PropTypes.shape({}).isRequired,
  };

  state = {
    isShareModalOpened: false,
  };

  onShareClick = () => {
    this.setState({
      isShareModalOpened: true,
    })
  };

  onPrintClick = () => {
    window.print();
  };

  shareClose = () => {
    this.setState({
      isShareModalOpened: false,
    });
  };

  render() {
    const { canvas, dispatch } = this.props;
    const { isShareModalOpened } = this.state;
    return (
      <>
        <HeaderButton icon="print" label="Print" onClick={this.onPrintClick} />
        <HeaderButton icon="share" label="Share" onClick={this.onShareClick} />
        <ModalShare
          isOpened={isShareModalOpened}
          canvas={canvas}
          dispatch={dispatch}
          close={this.shareClose}
        />
      </>
    );
  }
}

export default CanvasActions;
