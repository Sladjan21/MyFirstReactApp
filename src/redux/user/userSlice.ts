import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteUser, getUsers, User } from "../../data/data";
import { RootState } from "../store";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => getUsers(),
);

export const removeUser = createAsyncThunk<void, number>(
  "users/deleteUser",
  async (userId: number) => {
    await deleteUser(userId);
  },
);

export interface UserState {
  userList: User[];
}

const initialState = {
  userList: [],
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // TODO: Add any needed reducers here
    // myAwesomeReducer() {}
    deleteUser(state, action) {
      // Remove user with matching id
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.userList.push(...payload);
      })
      .addCase(removeUser.fulfilled, (state, { payload, meta }) => {
        const userId = meta.arg;
        state.userList = state.userList.filter((user) => user.id !== userId);
      });
  },
});

// TODO: Export any redux actions if needed
// export const { myAwesomeReducer } = userSlice.actions;

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user.userList;
