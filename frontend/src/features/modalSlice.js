import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: {
    profile: false,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleProfileModal: (state) => {
      state.isOpen.profile = !state.isOpen.profile;
    },
  },
});

export const { toggleProfileModal } = modalSlice.actions;

export default modalSlice.reducer;
