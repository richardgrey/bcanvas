import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { createCanvas } from '../../actions/canvas';
import schemas from '../../constants/schemas';
import './CreateCanvasCard.scss';

import { CANVAS_TYPE_BUSINESS, CANVAS_TYPE_LEAN, CANVAS_TYPE_VALUE } from '../../constants';

const content = {
  [CANVAS_TYPE_BUSINESS]: {
    title: 'Business Model Canvas',
    description: `
      The Business Model Canvas is a strategic management and entrepreneurial tool. It allows 
      you to describe, design, challenge, invent, and pivot your business model.
    `,
  },
  [CANVAS_TYPE_VALUE]: {
    title: 'Value Proposition Canvas',
    description: `
      The Value Proposition Canvas helps you tackle the core challenges of every business — 
      creating compelling products and services customers want to buy.
    `,
  },
  [CANVAS_TYPE_LEAN]: {
    title: 'Lean Canvas',
    description: `
      The Business Model Canvas is a strategic management and entrepreneurial tool. It allows 
      you to describe, design, challenge, invent, and pivot your business model.
    `,
  },
};

class CreateCanvasCard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['business', 'value', 'lean']).isRequired,
    size: PropTypes.oneOf(['small', null]),
    withDescription: PropTypes.bool,
    withCTA: PropTypes.bool,
  };

  static defaultProps = {
    size: null,
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
    const { icon } = schemas[type];

    const inner = () => (
      <div className="create-canvas-card__inner">
        <div className="create-canvas-card__media">
          <img src={`${process.env.PUBLIC_URL}${icon}`} alt={title} />
        </div>
        <h3 className="create-canvas-card__title">{title}</h3>
        {withDescription ? <p className="create-canvas-card__desc">{description}</p> : null}
        {withCTA ? (
          <div className="create-canvas-card__cta">
            <span>Create</span>
            <Icon name="arrow" />
          </div>
        ) : null}
      </div>
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
      <Link to="/register" className={b('create-canvas-card', { type })}>
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
