import React, { Component } from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import TabsPane from './TabsPane';
import './Tabs.scss';
import Icon from '../Icon/Icon';

function firstActiveKey(children) {
  const keys = [];

  React.Children.forEach(children, child => {
    if (child && !child.props.disabled) {
      keys.push(child.key);
    }
  });

  // Will return `undefined` if no tabs;
  return keys[0];
}

function keyIsValid(children, key) {
  let isValid = false;

  React.Children.forEach(children, child => {
    if (child.key === key) {
      isValid = true;
    }
  });

  return isValid;
}

class Tabs extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['top', 'right', 'left']),
    children: PropTypes.node,
    activeKey: PropTypes.string,
    defaultActiveKey: PropTypes.string,
  };

  static defaultProps = {
    align: 'top',
    children: null,
    activeKey: undefined,
    defaultActiveKey: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    const { activeKey, children } = props;
    const currentActiveKey = state.activeKey;
    let newState = null;

    if (props.activeKey) {
      newState = { activeKey };
    } else if (!keyIsValid(children, currentActiveKey)) {
      newState = {
        activeKey: firstActiveKey(children),
      };
    }

    return newState;
  }

  constructor(props) {
    super(props);

    let activeKey;
    if (props.activeKey) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = firstActiveKey(props);
    }

    this.state = {
      activeKey,
    };
  }

  onTabClick = key => {
    this.setState({
      activeKey: key,
    });
  };

  renderTabs = () => {
    const { activeKey } = this.state;
    const { children } = this.props;
    const tabs = [];

    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }

      const { key } = child;
      const { disabled, tab, icon } = child.props;
      const active = activeKey === key;
      const tabCls = b('tabs__tab', { active, disabled, icon: !!icon });
      const events = disabled ? {} : { onClick: this.onTabClick.bind(this, key) };

      tabs.push(
        <div
          className={tabCls}
          key={key}
          role="tab"
          aria-selected={active ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : 'false'}
          {...events}
        >
          {icon ? <Icon name={icon} className="tabs__tab-icon" /> : null}
          {tab}
        </div>,
      );
    });

    return <div className="tabs__tabs-bar">{tabs}</div>;
  };

  renderContent = () => {
    const { activeKey } = this.state;
    const { children } = this.props;

    const content = [];

    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }

      const active = activeKey === child.key;
      content.push(React.cloneElement(child, { active }));
    });

    return <div className="tabs__content">{content}</div>;
  };

  render() {
    const { align } = this.props;

    const cls = b('tabs', { align });
    return (
      <div className={cls}>
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}

Tabs.TabsPane = TabsPane;

export default Tabs;
