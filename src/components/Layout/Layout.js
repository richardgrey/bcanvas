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
    type: PropTypes.string,
    fluid: PropTypes.bool,
    noOverflow: PropTypes.bool,
    background: PropTypes.string,
  };

  static defaultProps = {
    type: undefined,
    fluid: false,
    children: null,
    noOverflow: false,
    background: undefined,
  };

  render() {
    const { type, fluid, noOverflow, children, background } = this.props;
    const cls = b('layout', {
      type,
      fluid,
      background,
      'no-overflow': noOverflow,
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
