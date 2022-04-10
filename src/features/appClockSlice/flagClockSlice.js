import { createSlice } from "@reduxjs/toolkit";

export const flagClockSlice = createSlice({
  name: "flagClock ",
  initialState: {
    detailsInformationTimeAndHideQuote: false,
  },
  reducers: {
    toggleDetailsInformationTimeAndHideQuote: (state) => {
      state.detailsInformationTimeAndHideQuote =
        !state.detailsInformationTimeAndHideQuote;
    },
  },
});

export const { toggleDetailsInformationTimeAndHideQuote } =
  flagClockSlice.actions;
