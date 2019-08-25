import React from 'react';
import ItemsList from '../ItemsList/ItemsList';
import './UserHome.scss';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const UserHome = () => (
  <div className="user-home">
    <div className="user-home__latest">
      <h3>My latest canvases</h3>
      <ItemsList limit={4} />
      <div className="user-home__latest-more">
        <Button href="/dashboard" styleType="secondary" isFullWidth>
          <Icon name="dashboard" />
          All my canvases
        </Button>
      </div>
    </div>
    <div>
      <h2 className="text_align_center">Tips & trick on business ideation</h2>
    </div>
  </div>
);

export default UserHome;
