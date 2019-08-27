import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import Footer from '../Footer/Footer';
import './Layout.scss';

const LayoutHeader = ({ children }) => <>{children}</>;
const LayoutContainer = ({ children }) => <div className="layout__container">{children}</div>;
const LayoutInner = ({ children }) => <div className="layout__inner">{children}</div>;

LayoutHeader.propTypes = { children: PropTypes.node.isRequired };
LayoutContainer.propTypes = LayoutHeader.propTypes;
LayoutInner.propTypes = LayoutHeader.propTypes;

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    fluid: PropTypes.bool,
    background: PropTypes.string,
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

    return (
      <div className={cls}>
        {children}
        <div className="layout__footer">
          <LayoutInner>
            <Footer />
          </LayoutInner>
        </div>
      </div>
    );
  }
}

Layout.Header = LayoutHeader;
Layout.Container = LayoutContainer;
Layout.Inner = LayoutInner;

export default Layout;
