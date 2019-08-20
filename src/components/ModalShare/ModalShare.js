import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactSwitch from 'react-switch';
import Modal from '../Modal/Modal';
import Btn from '../Btn/Btn';
import { InputRow } from '../Form/Form';
import { toggleShareModal } from '../../actions/app';
import { saveSharingSettings } from '../../actions/canvas';

class ModalShare extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOpened: PropTypes.bool.isRequired,
    canvas: PropTypes.shape({
      id: PropTypes.string,
      shareUrl: PropTypes.string,
      isPublic: PropTypes.bool,
      isOwner: PropTypes.bool,
    }),
  };

  static defaultProps = {
    canvas: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPublic: props.canvas ? props.canvas.isPublic : false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isPublic } = this.state;
    if (nextProps.canvas && nextProps.canvas.isPublic !== isPublic) {
      this.setState({
        isPublic: nextProps.canvas.isPublic,
      });
    }
  }

  toggleIsPublic() {
    const { isPublic } = this.state;
    this.setState({
      isPublic: !isPublic,
    });
  }

  modalClose() {
    const { dispatch } = this.props;
    dispatch(toggleShareModal(false));
  }

  saveAndClose() {
    const { dispatch, canvas } = this.props;
    const { isPublic } = this.state;

    this.modalClose();
    // Update canvas only if necessary. After submission property `canvas`
    // will replaced with updated isPublic.
    if (canvas.isPublic !== isPublic) {
      dispatch(saveSharingSettings(canvas.id, { isPublic }));
    }
  }

  render() {
    const { canvas, isOpened } = this.props;
    const { isPublic } = this.state;

    return !canvas ? null : (
      <Modal
        size="small"
        containerClassName="modal-share"
        isOpened={isOpened}
        onCloseEvent={() => this.modalClose()}
      >
        <h1 className="modal__title">Share It</h1>
        {canvas.isOwner ? (
          <Fragment>
            <div className="form__row">
              <label htmlFor="ispublic" className="form__label">
                Allow anyone with the link to see this canvas
                <ReactSwitch
                  checked={isPublic}
                  onChange={() => this.toggleIsPublic()}
                  className="form__switch"
                  name="ispublic"
                  id="ispublic"
                  onColor="#63BBE4"
                  onHandleColor="#2C96CE"
                  handleDiameter={24}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={16}
                  width={36}
                />
              </label>
            </div>
          </Fragment>
        ) : null}
        <InputRow
          name="url"
          value={canvas.shareUrl}
          label="Copy this link and share"
          disabled
          onFocus={e => e.target.select()}
        />
        <div className="form__row form__row_submit modal__footer">
          {canvas.isOwner ? (
            <Btn
              styleType="primary"
              isRounded
              onClick={() => this.saveAndClose()}
            >
              Save & Close
            </Btn>
          ) : (
            <Btn
              styleType="primary"
              isRounded
              onClick={() => this.modalClose()}
            >
              Close
            </Btn>
          )}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const { app, canvas } = state;

  return {
    canvas,
    isOpened: app.isShareModalOpened,
    baseUrl: app.baseUrl,
  };
};

export default connect(mapStateToProps)(ModalShare);
