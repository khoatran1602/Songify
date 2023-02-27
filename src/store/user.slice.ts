import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "../types";

interface InitialStateProps {
  // undefined = checking if user is logged in
  // null = user is NOT logged in
  // AppUser = user is logged in
  user: AppUser | null | undefined;
}

const initialState: InitialStateProps = {
  user: undefined,
};

// const signOut = createAsyncThunk("user/signOut", async () => {
// 	await firebaseAuth.signOut();
// });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userNotLoggedIn: (state) => {
      state.user = null;
    },
    userLoggedIn: (state, action: PayloadAction<AppUser>) => {
      state.user = action.payload;
    },
  },
  // extraReducers: (builder) => {
  // 	builder

  // 		.addCase(signOut.fulfilled, (state) => {
  // 			state.user = null;
  // 		})
  // 		.addCase(signOut.rejected, (state) => {
  // 			state.user = null;
  // 		});
  // },
});
// export { signOut };
export const { userNotLoggedIn, userLoggedIn } = userSlice.actions;
export default userSlice.reducer;
