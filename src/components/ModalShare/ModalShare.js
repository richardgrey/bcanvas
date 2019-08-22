import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import { Checkbox, FormRow } from '../Form/Form';
import { saveSharingSettings } from '../../actions/canvas';

class ModalShare extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOpened: PropTypes.bool,
    close: PropTypes.func,
    canvas: PropTypes.shape({
      id: PropTypes.string,
      shareUrl: PropTypes.string,
      isPublic: PropTypes.bool,
      isOwner: PropTypes.bool,
    }),
  };

  static defaultProps = {
    isOpened: false,
    canvas: null,
    close: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPublic: props.canvas ? props.canvas.isPublic : false,
    };
  }

  toggleIsPublic = () => {
    const { isPublic } = this.state;
    this.setState({
      isPublic: !isPublic,
    });
  };

  modalClose = () => {
    const { close } = this.props;
    if (close) {
      close();
    }
  };

  saveAndClose = () => {
    const { dispatch, canvas } = this.props;
    const { isPublic } = this.state;

    this.modalClose();
    // Update canvas only if necessary. After submission property `canvas`
    // will replaced with updated isPublic.
    if (canvas.isPublic !== isPublic) {
      dispatch(saveSharingSettings(canvas.id, { isPublic }));
    }
  };

  render() {
    const { canvas, isOpened } = this.props;
    const { isPublic } = this.state;

    return (
      <Modal isOpened={isOpened} size="medium" onClose={this.modalClose}>
        <h3>Share with others</h3>
        <FormRow>
          <p>Copy this link and share</p>
          <InputText
            name="url"
            value={canvas.shareUrl}
            disabled
            onFocus={e => { e.target.select()}}
          />
        </FormRow>
        {canvas.isOwner ? (
          <FormRow>
            <Checkbox name="s_public" isChecked={isPublic} onChange={this.toggleIsPublic}>
              Allow anyone with the link to see this canvas
            </Checkbox>
          </FormRow>
        ) : null}
        <FormRow type="submit">
          {canvas.isOwner ? (
            <Button styleType="primary" size="small" onClick={this.saveAndClose}>
              Save & Close
            </Button>
          ) : (
            <Button styleType="primary" size="small" onClick={this.modalClose}>
              Close
            </Button>
          )}
        </FormRow>
      </Modal>
    );
  }
}

export default ModalShare;
