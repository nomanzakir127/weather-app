import { createSlice } from '@reduxjs/toolkit';


const initialState: any = {
  lat : '',
  lon : ''
};

const location = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, { payload }) {
      return state = {...payload}
    },
  },
});

export const { setLocation } = location.actions;
export default location.reducer;