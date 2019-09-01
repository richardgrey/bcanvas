import React from 'react';
import './AccountFormSuccess.scss';

const AccountFormSuccess = () => (
  <div className="account-form-success">
    <div className="account-form-success__pic">
      <img src={require('./img/following-the-idea.svg')} alt="All Done" />
    </div>
    <div className="account-form-success__content">
      <h3 className="account-form-success__title">All done!</h3>
      <p>We have carefully saved all the changes you made.</p>
    </div>
  </div>
);

export default AccountFormSuccess;
