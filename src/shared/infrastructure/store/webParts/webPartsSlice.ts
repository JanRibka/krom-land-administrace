import ActionDetailModel from "features/actions/models/ActionDetailModel";
import ActionsModel from "features/actions/models/ActionsModel";
import { ContactModel } from "features/contact/models/ContactModel";
import GalleryModel from "features/gallery/models/GalleryModel";
import HomeModel from "features/home/models/HomeModel";
import ImageModel from "shared/models/ImageModel";
import HomeImageType from "shared/types/HomeImageType";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface WebPartsState {
  Home: HomeModel;
  Actions: ActionsModel;
  Gallery: GalleryModel;
  Contact: ContactModel;
}

export const initialState: WebPartsState = {
  Home: new HomeModel(),
  Actions: new ActionsModel(),
  Gallery: new GalleryModel(),
  Contact: new ContactModel(),
};

export const webPartsSlice = createSlice({
  name: "webPartsSlice",
  initialState,
  reducers: {
    webPartsUpdate: (state, action: PayloadAction<Partial<WebPartsState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    homeUpdate: (state, action: PayloadAction<Partial<HomeModel>>) => {
      const newHome = {
        ...state.Home,
        ...action.payload,
      };
      return {
        ...state,
        Home: newHome,
      };
    },
    homeImageUpdate: (
      state,
      action: PayloadAction<{ name: HomeImageType; image: Partial<ImageModel> }>
    ) => {
      const newImage: ImageModel = {
        ...(state.Home[action.payload.name] as ImageModel),
        ...action.payload.image,
      };

      (state.Home[action.payload.name] as ImageModel) = newImage;
    },
    actionsUpdate: (state, action: PayloadAction<Partial<ActionsModel>>) => {
      const newActions = {
        ...state.Actions,
        ...action.payload,
      };

      return {
        ...state,
        Actions: newActions,
      };
    },
    actionUpdate: (
      state,
      action: PayloadAction<{
        actionDetail: Partial<ActionDetailModel>;
        index: number;
      }>
    ) => {
      const newActionDetails = [...state.Actions.ActionDetails];

      newActionDetails[action.payload.index] = {
        ...newActionDetails[action.payload.index],
        ...action.payload.actionDetail,
      };

      state.Actions.ActionDetails = newActionDetails;
    },
    galleryUpdate: (state, action: PayloadAction<Partial<GalleryModel>>) => {
      const newGallery = {
        ...state.Gallery,
        ...action.payload,
      };

      return {
        ...state,
        Gallery: newGallery,
      };
    },
    contactUpdate: (state, action: PayloadAction<Partial<ContactModel>>) => {
      const newContact = {
        ...state.Contact,
        ...action.payload,
      };

      return {
        ...state,
        Contact: newContact,
      };
    },
  },
});

export const actions = webPartsSlice.actions;

export default webPartsSlice.reducer;

// Selectors
export const selectWebParts = (state: AppState) => state.webParts;
export const selectHome = (state: AppState) => state.webParts.Home;
export const selectActions = (state: AppState) => state.webParts.Actions;
export const selectGallery = (state: AppState) => state.webParts.Gallery;
export const selectContact = (state: AppState) => state.webParts.Contact;
