import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    id: "",
  },
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = {
        username: action.payload.username,
        id: action.payload._id,
      };
    },
    removeUser: (state, action) => {
      state.value = {
        username: "",
        id: "",
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
