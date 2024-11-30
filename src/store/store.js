import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import templateReducer from "./templateSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    template: templateReducer,
  },
});
