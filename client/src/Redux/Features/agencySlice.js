import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authAgency: {},
  profile: {},
  allTours: [{}],
};

export const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    addAuthAgency: (state, action) => {
      return {
        ...state,
        authAgency: action.payload,
      };
    },
    addProfile: (state, action) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
    addTours: (state, action) => {
      return {
        ...state,
        allTours: action.payload,
      };
    },
  },
});

export const { addAuthAgency, addProfile, addTours } = agencySlice.actions;
export default agencySlice.reducer;
