import { combineReducers } from 'redux';
import { starwarreducer } from './starwar';
import { userreducer } from './user';

export default combineReducers({
  swState: starwarreducer,
  userState: userreducer
})