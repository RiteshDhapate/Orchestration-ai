import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  clientToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setClientToken: (state, action) => {
      state.clientToken = action.payload;
    },
  },
});

export const { setToken, setClientToken } = authSlice.actions;

export default authSlice.reducer;
