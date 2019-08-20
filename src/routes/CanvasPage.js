import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CanvasTitle from '../components/CanvasTitle/CanvasTitle';
import CanvasTable from '../components/CanvasTable/CanvasTable';
import CanvasTableLoading from '../components/CanvasTable/CanvasTableLoading';
import CanvasActions from '../components/CanvasActions/CanvasActions';
import { fetchCanvasWithEntries, unloadCanvas, setShareUrl } from '../actions/canvas';
import Header from '../components/Header/Header';

class CanvasPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    canvasId: PropTypes.string.isRequired,
    isPermissionDenied: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string,
      entries: PropTypes.object,
      isOwner: PropTypes.bool,
      isPublic: PropTypes.bool,
    }),
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    data: null,
    user: null,
  };

  componentDidMount() {
    const { dispatch, canvasId, match } = this.props;
    const url = `${window.location.origin}${match.url}`;

    dispatch(fetchCanvasWithEntries(canvasId));
    dispatch(setShareUrl(url));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, canvasId, match } = this.props;
    const url = `${window.location.origin}${match.url}`;

    if (canvasId !== nextProps.canvasId) {
      dispatch(unloadCanvas());
      dispatch(fetchCanvasWithEntries(nextProps.canvasId));
      dispatch(setShareUrl(url));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unloadCanvas());
  }

  render() {
    const { canvasId, dispatch, location, data, isFetching, isPermissionDenied } = this.props;

    if (isPermissionDenied) {
      return (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: {
              from: location,
            },
          }}
        />
      );
    }

    if (!data) {
      // Show loading
      return (
        <Layout fluid background="gradient">
          <Layout.Header>
            <Header
              btnDashboard
              btnUser
              fixed
              left={
                <CanvasTitle canvasId={canvasId} title={null} canEdit={false} dispatch={dispatch} />
              }
            />
          </Layout.Header>
          <Layout.Container>
            <CanvasTableLoading />
          </Layout.Container>
        </Layout>
      );
    }

    if (data && (data.isOwner || data.isPublic)) {
      const { title, type, entries, isOwner } = data;
      const canEdit = isOwner && !isFetching;
      // Canvas table
      return (
        <Layout fluid background="gradient">
          <Layout.Header>
            <Header
              btnDashboard
              btnUser
              fixed
              left={
                <CanvasTitle
                  canvasId={canvasId}
                  title={title}
                  canEdit={canEdit}
                  dispatch={dispatch}
                />
              }
              right={<CanvasActions canvas={data} dispatch={dispatch} />}
            />
          </Layout.Header>
          <Layout.Container>
            <CanvasTable
              canvasId={canvasId}
              type={type}
              entries={entries}
              isLoading={isFetching}
              canEdit={canEdit}
              dispatch={dispatch}
            />
          </Layout.Container>
        </Layout>
      );
    }

    // Not owner and not Shared
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { canvas, canvasList } = state;
  const { match } = ownProps;
  const canvasId = match.params.id;

  // Use canvas data from the list of canvases if available
  if (!canvas.data && canvasList.canvases.length) {
    const prefetchedCanvas = canvasList.canvases.find(cnvs => cnvs.id === canvasId);
    if (prefetchedCanvas) {
      return {
        canvasId,
        ...canvas,
        data: prefetchedCanvas,
        isPermissionDenied: canvas.isPermissionDenied,
      };
    }
  }

  return {
    canvasId,
    ...canvas,
    isPermissionDenied: canvas.isPermissionDenied,
  };
};

export default connect(mapStateToProps)(CanvasPage);
