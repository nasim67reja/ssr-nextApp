import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  info: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
