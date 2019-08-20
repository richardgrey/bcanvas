import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalShare from '../ModalShare/ModalShare';
import HeaderButton from '../HeaderButton/HeaderButton';
import { toggleShareModal } from '../../actions/app';

class CanvasActions extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  onShareClick() {
    const { dispatch } = this.props;
    dispatch(toggleShareModal(true));
  }

  // eslint-disable-next-line class-methods-use-this
  onPrintClick() {
    window.print();
  }

  render() {
    return (
      <>
        <HeaderButton icon="print" label="Print" onClick={this.onPrintClick} />
        <HeaderButton icon="share" label="Share" onClick={() => this.onShareClick()} />
        <ModalShare />
      </>
    );
  }
}

export default CanvasActions;
