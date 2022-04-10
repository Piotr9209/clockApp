import { configureStore } from "@reduxjs/toolkit";
import {
  geoLocationApiSlice,
  quotesApiSlice,
  worldTimeApiSlice,
} from "../appClockSlice/apiClockSlice";
import { flagClockSlice } from "../appClockSlice/flagClockSlice";

const store = configureStore({
  reducer: {
    worldTime: worldTimeApiSlice.reducer,
    geoLocationApi: geoLocationApiSlice.reducer,
    quotes: quotesApiSlice.reducer,
    toggleFlag: flagClockSlice.reducer,
  },
});

export default store;
