import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import CanvasCard from '../CanvasCard/CanvasCard';
import CanvasCardMock from '../CanvasCard/CanvasCardMock';
import './ItemsList.scss';

class ItemsList extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['vertical', 'grid']),
    mocksCount: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    canvases: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        createdAt: PropTypes.number,
        updatedAt: PropTypes.number,
      }),
    ).isRequired,
  };

  static defaultProps = {
    type: 'grid',
    mocksCount: null,
    loading: false,
  };

  renderItems = () => {
    const { loading, canvases, dispatch, mocksCount } = this.props;

    // Show dummy for loading state
    if (loading) {
      const mocksItems = [...Array(mocksCount).keys()];

      return mocksItems.map(i => (
        <li className="items-list__item" key={i}>
          <CanvasCardMock />
        </li>
      ));
    }

    // Renders list of loaded canvases
    return canvases.map(canvas => (
      <li className="items-list__item" key={canvas.id}>
        <CanvasCard canvas={canvas} dispatch={dispatch} />
      </li>
    ));
  };

  render() {
    const { type } = this.props;
    const cls = b('items-list', {
      [type]: !!type,
    });

    return (
      <div className={cls}>
        <ul className="items-list__list">{this.renderItems()}</ul>
      </div>
    );
  }
}

export default ItemsList;
