import React from 'react';
import { Picture } from 'react-responsive-picture';
import Tabs from '../Tabs/Tabs';
import Icon from '../Icon/Icon';
import './FeaturesTabs.scss';

import tabs from './local';

const FeaturesTabs = () => (
  <div className="features-tabs">
    <h2 className="h1 text_align_center">Design innovative business model</h2>
    <Tabs align="right">
      {tabs.map(({ key, icon, tab, img }) => (
        <Tabs.Pane key={key} tab={tab} icon={icon}>
          <div className="features-tabs__section">
            <h4 className="features-tabs__title hidden visible_mobile">
              <Icon name={icon} />
              {tab}
            </h4>
            <Picture className="elevation-10" alt={tab} {...img} />
          </div>
        </Tabs.Pane>
      ))}
    </Tabs>
  </div>
);

export default FeaturesTabs;
