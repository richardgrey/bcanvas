import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import './Layout.scss';

const LayoutHeader = ({ children }) => <>{children}</>;

const LayoutContainer = ({ children }) => <div className="layout__container">{children}</div>;

LayoutHeader.propTypes = { children: PropTypes.node.isRequired };
LayoutContainer.propTypes = LayoutHeader.propTypes;

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    fluid: PropTypes.bool,
    background: PropTypes.oneOf(['gradient', 'magnus']),
  };

  static defaultProps = {
    fluid: false,
    children: null,
    background: undefined,
  };

  render() {
    const { fluid, children, background } = this.props;
    const cls = b('layout', {
      fluid,
      background,
    });

    return <div className={cls}>{children}</div>;
  }
}

Layout.Header = LayoutHeader;
Layout.Container = LayoutContainer;

export default Layout;
