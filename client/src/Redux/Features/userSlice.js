import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { addAuthUser } = userSlice.actions;
export default userSlice.reducer;
