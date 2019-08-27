import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemsList from '../ItemsList/ItemsList';
import { fetchCanvasList } from '../../actions/canvas';

const MAX_MOCK_ITEMS_COUNT = 7;

function sortByLatestChange(a, b) {
  return b.updatedAt - a.updatedAt;
}

class MyCanvases extends Component {
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
    limit: undefined,
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
    const { canvases, isLoaded, limit, type, dispatch } = this.props;
    const mocksCount = limit ? Math.min(limit, MAX_MOCK_ITEMS_COUNT) : MAX_MOCK_ITEMS_COUNT;
    const list = canvases.sort(sortByLatestChange).slice(0, limit || canvases.length);

    return (
      <ItemsList
        type={type}
        dispatch={dispatch}
        canvases={list}
        loading={!isLoaded}
        mocksCount={mocksCount}
      />
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

export default connect(mapStateToProps)(MyCanvases);
