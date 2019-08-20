import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CanvasCard from '../CanvasCard/CanvasCard';
import { fetchCanvasList } from '../../actions/canvas';
import './ItemsList.scss';
import CanvasCardMock from '../CanvasCard/CanvasCardMock';

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

  render() {
    const { isLoaded, canvases, dispatch, type, limit } = this.props;
    const sortByLatestChange = (a, b) => b.updatedAt - a.updatedAt;
    const renderItems = () => {
      // Show dummy for loading state
      if (!isLoaded) {
        return [1, 2, 3, 4, 5, 6, 7].map(i => (
          <li key={i}>
            <CanvasCardMock />
          </li>
        ));
      }

      // Renders list of loaded canvases sorted by latest change
      return canvases
        .sort(sortByLatestChange)
        .slice(0, limit || canvases.length)
        .map(canvas => (
          <li key={canvas.id}>
            <CanvasCard canvas={canvas} dispatch={dispatch} />
          </li>
        ));
    };

    return (
      <div className={`items-list items-list_${type}`}>
        <ul>{renderItems()}</ul>
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
