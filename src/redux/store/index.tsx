import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { ChildrenType } from "../../types/children";
import { categorySlice } from "../slice/categorySlice";

export const Store = configureStore({
  reducer: {
    [categorySlice.name]: categorySlice.reducer,
  },
});

const StoreProvider = ({ children }: ChildrenType) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

