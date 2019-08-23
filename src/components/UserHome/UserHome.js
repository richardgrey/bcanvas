import React from 'react';
import ItemsList from '../ItemsList/ItemsList';

const UserHome = () => (
  <>
    <div>
      <ItemsList limit={8} />
    </div>
    <div>
      <h2>More to come</h2>
    </div>
  </>
);

export default UserHome;
