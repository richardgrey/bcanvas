import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import b from 'b_';
import CanvasCard from '../CanvasCard/CanvasCard';
import CanvasCardMock from '../CanvasCard/CanvasCardMock';
import { fetchCanvasList } from '../../actions/canvas';
import './ItemsList.scss';

const MAX_MOCK_ITEMS_COUNT = 7;

class ItemsList extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['vertical', 'grid']),
    limit: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
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
    limit: null,
  };

  state = {
    load: !this.props.isLoaded,
  };

  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props;

    if (isAuthenticated) {
      dispatch(fetchCanvasList());
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, isAuthenticated } = this.props;

    if (isAuthenticated && !prevProps.isAuthenticated) {
      dispatch(fetchCanvasList());
    }
  }

  renderItems = () => {
    const { isLoaded, canvases, dispatch, limit } = this.props;
    const sortByLatestChange = (o1, o2) => o2.updatedAt - o1.updatedAt;

    // Show dummy for loading state
    if (!isLoaded) {
      const mockCount = Math.min(limit, MAX_MOCK_ITEMS_COUNT);
      const mockItems = Array(mockCount).fill(0);

      return mockItems.map((i, j) => (
        <li className="items-list__item" key={j}>
          <CanvasCardMock />
        </li>
      ));
    }

    // Renders list of loaded canvases sorted by latest change
    return canvases
      .sort(sortByLatestChange)
      .slice(0, limit || canvases.length)
      .map(canvas => (
        <li className="items-list__item" key={canvas.id}>
          <CanvasCard canvas={canvas} dispatch={dispatch} />
        </li>
      ));
  };

  render() {
    const { type } = this.props;
    const { load } = this.state;
    const cls = b('items-list', {
      [type]: !!type,
      load,
    });

    return (
      <div className={cls}>
        {/* eslint-disable-next-line no-undef */}
        <ul className="items-list__list">{this.renderItems()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { canvasList, auth } = state;
  const { isAuthenticated } = auth;
  return {
    isAuthenticated,
    ...canvasList,
  };
};

export default connect(mapStateToProps)(ItemsList);
