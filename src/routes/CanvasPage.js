import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import CanvasTitle from '../components/CanvasTitle/CanvasTitle';
import CanvasTable from '../components/CanvasTable/CanvasTable';
import CanvasTableLoading from '../components/CanvasTable/CanvasTableLoading';
import CanvasActions from '../components/CanvasActions/CanvasActions';
import { fetchCanvas, setShareUrl, setPreloadedCanvas } from '../actions/canvas';
import { locationPropType } from '../utils/propTypes';

class CanvasPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    location: locationPropType.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool,
    isLoaded: PropTypes.bool,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    entries: PropTypes.shape({}),
    canView: PropTypes.bool,
    canEdit: PropTypes.bool,
    preloaded: PropTypes.shape({}),
  };

  static defaultProps = {
    isFetching: false,
    title: '',
    type: undefined,
    entries: {},
    canView: undefined,
    canEdit: undefined,
    isLoaded: false,
    preloaded: undefined,
  };

  componentDidMount() {
    const { dispatch, id, isLoaded, preloaded, match } = this.props;
    const url = `${window.location.origin}${match.url}`;

    console.log('componentDidMount');

    if (!isLoaded) {
      dispatch(fetchCanvas(id));
    } else if (preloaded) {
      dispatch(setPreloadedCanvas(preloaded));
    }
    dispatch(setShareUrl(url));
  }

  componentWillReceiveProps(nextProps) {
    // const { dispatch, id, match } = this.props;
    // const url = `${window.location.origin}${match.url}`;
    //
    // if (id !== nextProps.id) {
    //   dispatch(unloadCanvas());
    //   dispatch(fetchCanvas(nextProps.id));
    //   dispatch(setShareUrl(url));
    // }
  }

  render() {
    const {
      dispatch,
      location,
      isAuthenticated,
      id,
      type,
      title,
      canEdit,
      canView,
      entries,
      isFetching,
    } = this.props;

    // Must be strictly False
    if (canView === false) {
      if (isAuthenticated) {
        return <Redirect to="/" />;
      }
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

    // No information about type of the canvas, so must be fetched before full render
    if (type) {
      return (
        <Layout fluid background="gradient">
          <Layout.Header>
            <Header
              btnDashboard
              btnUser
              fixed
              left={
                <CanvasTitle canvasId={id} title={title} canEdit={canEdit} dispatch={dispatch} />
              }
              right={<CanvasActions dispatch={dispatch} />}
            />
          </Layout.Header>
          <Layout.Container>
            <CanvasTable
              canvasId={id}
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

    // We don't know the type of the canvas, so showing general loading state
    return (
      <Layout fluid background="gradient">
        <Layout.Header>
          <Header
            btnDashboard
            btnUser
            fixed
            left={<CanvasTitle canvasId={id} title={title} canEdit={canEdit} dispatch={dispatch} />}
          />
        </Layout.Header>
        <Layout.Container>
          <CanvasTableLoading />
        </Layout.Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { canvas, auth, account, canvasList } = state;
  const canvasId = match.params.id;
  const { isAuthenticated } = auth;

  const prepareData = data => {
    const isOwner = data.ownerId === account.uid;
    const canView = !data.isDenied && (isOwner || data.isPublic);
    const canEdit = isOwner && !data.isFetching;

    // Preparing entries for rendering
    const entries = data.entries || {};
    const preparedEntries = Object.keys(entries)
      .sort((a, b) => entries[a].createdAt - entries[b].createdAt)
      .reduce((obj, id) => {
        const entr = entries[id];
        obj[entr.label] = obj[entr.label] || [];
        obj[entr.label].push({
          id,
          ...entr,
        });
        return obj;
      }, {});

    return {
      ...data,
      entries: preparedEntries,
      isOwner,
      canView,
      canEdit,
      isLoaded: true,
      isAuthenticated,
    };
  };

  // Canvas with ID is loaded
  if (canvasId === canvas.id) {
    return prepareData(canvas);
  }

  if (canvasList.isLoaded) {
    const canvasFromList = canvasList.canvases.find(cnvs => cnvs.id === canvasId);
    if (canvasFromList) {
      return {
        ...prepareData(canvasFromList),
        preloaded: canvasFromList,
      };
    }
  }

  return {
    id: canvasId,
    isFetching: canvas.isFetching,
    canEdit: canvas.isFetching,
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(CanvasPage);
