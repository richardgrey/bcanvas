import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import IconCanvas from '../Icon/IconCanvas';
import { createCanvas } from '../../actions/canvas';
import './CreateCanvasCard.scss';

import content from './local';

class CreateCanvasCard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['business', 'value', 'lean']).isRequired,
    size: PropTypes.oneOf(['small', 'normal']),
    withDescription: PropTypes.bool,
    withCTA: PropTypes.bool,
  };

  static defaultProps = {
    size: 'normal',
    withDescription: false,
    withCTA: false,
  };

  onClick() {
    const { dispatch, isAuthenticated, type } = this.props;
    if (isAuthenticated) {
      dispatch(createCanvas(type));
    }
  }

  render() {
    const { type, size, withDescription, withCTA, isAuthenticated } = this.props;
    const { title, description } = content[type];

    const inner = () => (
      <>
        <div className="create-canvas-card__media">
          <IconCanvas type={type} />
        </div>
        <h3 className="create-canvas-card__title">{title}</h3>
        {withDescription ? <p className="create-canvas-card__desc">{description}</p> : null}
        {withCTA ? (
          <div className="create-canvas-card__cta">
            <span>Create</span>
            <Icon name="arrow" />
          </div>
        ) : null}
      </>
    );

    return isAuthenticated ? (
      <div
        className={b('create-canvas-card', { type, size })}
        role="button"
        tabIndex="0"
        onClick={() => this.onClick()}
        onKeyPress={e => e.key === 'Enter' && this.onClick()}
      >
        {inner()}
      </div>
    ) : (
      <Link to="/register" className={b('create-canvas-card', { type, size })}>
        {inner()}
      </Link>
    );
  }
}
const mapStateToProps = state => {
  const { auth } = state;

  return {
    isAuthenticated: auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(CreateCanvasCard);
