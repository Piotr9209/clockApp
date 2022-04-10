import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { geolocationApiKey } from "../API_KEY/geolocationApiKey";
import { worldTimeApiKey } from "../API_KEY/worldTimeApiKey";
import { quotesApiKey } from "../API_KEY/quotesApiKey";

const checkForError = (response) => {
  if (!response.ok) throw Error("ERROR" + response.statusText);
  return response.json();
};

export const getGeoIp = createAsyncThunk("geoIp/getGeoIp", async () => {
  return await fetch(geolocationApiKey)
    .then(checkForError)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("FETCH_ERROR:", error);
    });
});
export const geoLocationApiSlice = createSlice({
  name: "geolocationApi",
  initialState: {
    geoLocation: "",
    loadingGeoLocation: true,
    failedGeoLocation: false,
    successGeoLocation: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeoIp.pending, (state) => {
      state.failedGeoLocation = false;
      state.loadingGeoLocation = true;
    });
    builder.addCase(getGeoIp.fulfilled, (state, action) => {
      state.loadingGeoLocation = false;
      state.failedGeoLocation = false;
      state.successGeoLocation = true;
      state.geoLocation = action.payload;
    });
    builder.addCase(getGeoIp.rejected, (state) => {
      state.failedGeoLocation = true;
    });
  },
});

export const getWorldTimeApi = createAsyncThunk("worldTimeApi", async () => {
  return await fetch(worldTimeApiKey)
    .then(checkForError)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("FETCH_ERROR:", error);
    });
});

export const worldTimeApiSlice = createSlice({
  name: "worldTimeApi",
  initialState: {
    worldTime: "",
    loadingWorldTime: true,
    failedWorldTime: false,
    successWorldTime: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorldTimeApi.pending, (state) => {
      state.failedWorldTime = false;
      state.loadingWorldTime = true;
    });
    builder.addCase(getWorldTimeApi.fulfilled, (state, action) => {
      state.loadingWorldTime = false;
      state.failedWorldTime = false;
      state.successWorldTime = true;
      state.worldTime = action.payload;
    });
    builder.addCase(getWorldTimeApi.rejected, (state) => {
      state.failedWorldTime = true;
    });
  },
});

export const getQuotesApi = createAsyncThunk("quotesApi", async () => {
  return await fetch(quotesApiKey)
    .then(checkForError)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("FETCH_ERROR: ", error);
    });
});

export const quotesApiSlice = createSlice({
  name: "quotesApi",
  initialState: {
    quotes: "",
    loading: true,
    failed: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuotesApi.pending, (state) => {
      state.failed = false;
      state.loading = true;
    });
    builder.addCase(getQuotesApi.fulfilled, (state, action) => {
      state.loading = false;
      state.failed = false;
      state.success = true;
      state.quotes = action.payload;
    });
    builder.addCase(getQuotesApi.rejected, (state) => {
      state.failed = true;
    });
  },
});
