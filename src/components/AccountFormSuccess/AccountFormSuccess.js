import React from 'react';
import './AccountFormSuccess.scss';

const AccountFormSuccess = () => (
  <div className="account-form-success">
    <div className="account-form-success__pic">
      <img src={require('./done.png')} alt="Done" />
    </div>
    <div className="account-form-success__content">
      <h3 className="account-form-success__title">All done!</h3>
    </div>
  </div>
);

export default AccountFormSuccess;
