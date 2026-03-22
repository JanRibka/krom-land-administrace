import ImageModel from "shared/models/ImageModel";

import { createSlice } from "@reduxjs/toolkit";

import { mapRentingDataToState } from "../mappers/mapRentingDataToState";
import { RentingData, RentingImageType } from "../types";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RentingState } from "./RentingState";

export const initialState: RentingState = {
  idRentingPage: 0,
  title: "",
  description: "",
  pageHeaderTextMain: "",
  pageHeaderTextMainColor: "",
  mainImage: new ImageModel(),
  items: [],
  decorationThemes: [],
  _dataLoaded: false,
};

export const rentingSlice = createSlice({
  name: "renting",
  initialState,
  reducers: {
    setRentingFromData: (state, action: PayloadAction<RentingData>) => {
      return {
        ...state,
        ...mapRentingDataToState(action.payload),
        _dataLoaded: true,
      };
    },
    rentingUpdate: (state, action: PayloadAction<Partial<RentingState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    imageUpdate: (
      state,
      action: PayloadAction<{
        name: RentingImageType;
        image: Partial<ImageModel>;
      }>,
    ) => {
      const newImage: ImageModel = {
        ...(state[action.payload.name] as ImageModel),
        ...action.payload.image,
      };

      (state[action.payload.name] as ImageModel) = newImage;
    },
  },
});

export const actions = rentingSlice.actions;
export default rentingSlice.reducer;
