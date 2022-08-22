
import { configureStore } from '@reduxjs/toolkit';
import Reducer from '../reducers/Reducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: Reducer,

});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export {store};

export type RootState = ReturnType<typeof store.getState>
