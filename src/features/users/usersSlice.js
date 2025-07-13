import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      lastActivity: "2025-07-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Manager User",
      email: "manager@example.com",
      role: "Manager",
      lastActivity: "2025-07-09",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Employee User",
      email: "employee@example.com",
      role: "Employee",
      lastActivity: "2025-07-08",
      status: "Active",
    },
  ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
