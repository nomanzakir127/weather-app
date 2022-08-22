import { combineReducers } from '@reduxjs/toolkit';
import locationReducer from './LocationSlice';

const rootReducer = combineReducers({
  location: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;