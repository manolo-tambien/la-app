import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'session',
  initialState: {
    user: null
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
    resetSession: state => {
      state.user = null;
    }
  },
});

export { actions as sessionActions };
export { reducer as sessionReducer };
