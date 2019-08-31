import React, { Component } from 'react';
import Button from '../Button/Button';
import ModalNew from '../ModalNew/ModalNew';
import './ToolbarNewCanvas.scss';
import Icon from '../Icon/Icon';

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
    const { isOpened } = this.state;
    return (
      <div className="toolbar-new-canvas">
        <Button className="toolbar-new-canvas__tablet" size="x-small" onClick={this.open}>
          New canvas
        </Button>
        <Button className="toolbar-new-canvas__mobile" size="x-small" onClick={this.open}>
          <Icon name="plus" />
        </Button>
        <ModalNew isOpened={isOpened} close={this.close} />
      </div>
    );
  }
}

export default ToolbarNewCanvas;
