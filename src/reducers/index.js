import { combineReducers } from 'redux';
import auth from './auth';
import account from './account';
import canvasList from './canvasList';
import canvas from './canvas';
import app from './app';

export default combineReducers({
  auth,
  account,
  canvasList,
  canvas,
  app,
});
