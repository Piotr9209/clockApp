import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initalState = {};

const checkForError = (response) => {
  if (!response.ok) throw Error("ERROR" + response.statusText);
  return response.json();
};

export const getGeoIp = createAsyncThunk(
  "geoIp/getGeoIp",
  async (urlGeoApi) => {
    return await fetch(urlGeoApi)
      .then(checkForError)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("FETCH_ERROR:", error);
      });
  }
);

export const getWorldTimeApi = createAsyncThunk(
  "worldTimeApi",
  async (urlWorldTimeApi) => {
    return await fetch(urlWorldTimeApi)
      .then(checkForError)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("FETCH_ERROR:", error);
      });
  }
);

export const geolocationApiSlice = createSlice({
  name: "geolocationApi",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const worldTimeApiSlice = createSlice({
  name: "worldTimeApi",
  initialState: {},
  reducers: {},
  extraReducers: {},
});
