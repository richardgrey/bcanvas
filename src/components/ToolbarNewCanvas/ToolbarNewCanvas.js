import React, { Component } from 'react';
import Button from '../Button/Button';
import ModalNew from '../ModalNew/ModalNew';
import './ToolbarNewCanvas.scss';

class ToolbarNewCanvas extends Component {
  state = {
    isOpened: false,
  };

  open = () => {
    this.setState({ isOpened: true });
  };

  close = () => {
    this.setState({ isOpened: false });
  };

  render() {
    return (
      <div className="toolbar-new-canvas">
        <Button size="x-small" onClick={this.open}>
          New Canvas
        </Button>
        <ModalNew isOpened={this.state.isOpened} close={this.close} />
      </div>
    );
  }
};

export default ToolbarNewCanvas;
