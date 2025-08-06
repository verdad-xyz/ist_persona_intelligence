import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fraudNames: [],
  isLoading: false,
  isError: false,
  message: null,
};

const baseUrl = "http://localhost:5000";

export const fetchFraudNames = createAsyncThunk(
  "fraudNames/fetchFraudNames",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/fraudnames`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Gagal mengambil data fraud names"
      );
    }
  }
);

const fraudNamesSlice = createSlice({
  name: "fraudNames",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFraudNames.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = null;
      })
      .addCase(fetchFraudNames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fraudNames = action.payload;
        state.isError = false;
        state.message = null;
      })
      .addCase(fetchFraudNames.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default fraudNamesSlice.reducer;
