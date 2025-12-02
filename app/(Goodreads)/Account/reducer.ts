import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role: string;
  lastActivity?: string;
}

interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
    currentUser: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
    },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;