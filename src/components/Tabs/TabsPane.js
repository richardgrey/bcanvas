import React from 'react';
import PropTypes from 'prop-types';
import b from 'b_';
import './Tabs.scss'

const TabsPane = ({ children, active, disabled }) => {
  const cls = b('tabs', 'pane', { active, disabled });
  return <div className={cls}>{children}</div>;
};

TabsPane.propTypes = {
  tab: PropTypes.node.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

TabsPane.defaultProps = {
  children: null,
  icon: null,
  active: false,
  disabled: false,
};

export default TabsPane;
