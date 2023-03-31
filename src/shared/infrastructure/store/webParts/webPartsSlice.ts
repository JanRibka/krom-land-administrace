import ActionDetailModel from "features/webParts/actions/models/ActionDetailModel";
import ActionsModel from "features/webParts/actions/models/ActionsModel";
import DocumentToDownloadModel from "features/webParts/actions/models/DocumentToDownloadModel";
import { ContactModel } from "features/webParts/contact/models/ContactModel";
import GalleryImageModel from "features/webParts/gallery/models/GalleryImageModel";
import GalleryModel from "features/webParts/gallery/models/GalleryModel";
import HomeModel from "features/webParts/home/models/HomeModel";
import TeamMemberModel from "features/webParts/home/models/TeamMemberModel";
import ConditionsModel from "shared/models/ConditionsModel";
import ImageModel from "shared/models/ImageModel";
import ActionsImageType from "shared/types/ActionsImageType";
import ContactImageType from "shared/types/ContactImageType";
import GalleryImageType from "shared/types/GalleryImageType";
import HomeImageType from "shared/types/HomeImageType";

import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface WebPartsState {
  Home: HomeModel;
  Actions: ActionsModel;
  Gallery: GalleryModel;
  Contact: ContactModel;
  Conditions: ConditionsModel;
}

export const initialState: WebPartsState = {
  Home: new HomeModel(),
  Actions: new ActionsModel(),
  Gallery: new GalleryModel(),
  Contact: new ContactModel(),
  Conditions: new ConditionsModel(),
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
    homeTeamMemberAdd: (state, action: Action) => {
      const newTeamMembers = [...state.Home.TeamMembers];

      newTeamMembers.push(new TeamMemberModel());

      return {
        ...state,
        Home: {
          ...state.Home,
          TeamMembers: newTeamMembers,
        },
      };
    },
    homeTeamMemberUpdate: (
      state,
      action: PayloadAction<{ member: Partial<TeamMemberModel>; index: number }>
    ) => {
      let newTeamMembers = [...state.Home.TeamMembers];
      const teamMember = {
        ...newTeamMembers[action.payload.index],
        ...action.payload.member,
      };

      newTeamMembers[action.payload.index] = teamMember;

      state.Home.TeamMembers = newTeamMembers;
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
    actionsImageUpdate: (
      state,
      action: PayloadAction<{
        name: ActionsImageType;
        image: Partial<ImageModel>;
      }>
    ) => {
      const newImage: ImageModel = {
        ...(state.Actions[action.payload.name] as ImageModel),
        ...action.payload.image,
      };

      (state.Actions[action.payload.name] as ImageModel) = newImage;
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
    actionsDocumentAdd: (state, action: Action) => {
      const newdocumentsToDownload = [...state.Actions.DocumentsToDownload];

      newdocumentsToDownload.push(new DocumentToDownloadModel());

      return {
        ...state,
        Actions: {
          ...state.Actions,
          DocumentsToDownload: newdocumentsToDownload,
        },
      };
    },
    actionsDocumentUpadate: (
      state,
      action: PayloadAction<{
        document: Partial<DocumentToDownloadModel>;
        index: number;
      }>
    ) => {
      let newDocumentsToDownload = [...state.Actions.DocumentsToDownload];
      const document = {
        ...newDocumentsToDownload[action.payload.index],
        ...action.payload.document,
      };

      newDocumentsToDownload[action.payload.index] = document;

      state.Actions.DocumentsToDownload = newDocumentsToDownload;
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
    galleryMainImageUpdate: (
      state,
      action: PayloadAction<{
        name: GalleryImageType;
        image: Partial<ImageModel>;
      }>
    ) => {
      const newImage: ImageModel = {
        ...(state.Gallery[action.payload.name] as ImageModel),
        ...action.payload.image,
      };

      (state.Gallery[action.payload.name] as ImageModel) = newImage;
    },
    galleryImageAdd: (state, action: Action) => {
      const newImages = [...state.Gallery.Images];

      newImages.push(new GalleryImageModel());

      return {
        ...state,
        Gallery: {
          ...state.Gallery,
          Images: newImages,
        },
      };
    },
    galleryGalleryImageUpadate: (
      state,
      action: PayloadAction<{
        image: Partial<GalleryImageModel>;
        index: number;
      }>
    ) => {
      let newGalleryImages = [...state.Gallery.Images];
      const image = {
        ...newGalleryImages[action.payload.index],
        ...action.payload.image,
      };

      newGalleryImages[action.payload.index] = image;

      state.Gallery.Images = newGalleryImages;
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
    contactImageUpdate: (
      state,
      action: PayloadAction<{
        name: ContactImageType;
        image: Partial<ImageModel>;
      }>
    ) => {
      const newImage: ImageModel = {
        ...(state.Contact[action.payload.name] as ImageModel),
        ...action.payload.image,
      };

      (state.Contact[action.payload.name] as ImageModel) = newImage;
    },
    conditionsUpdate: (
      state,
      action: PayloadAction<Partial<ConditionsModel>>
    ) => {
      const newConditions = {
        ...state.Conditions,
        ...action.payload,
      };

      return {
        ...state,
        Conditions: newConditions,
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
export const selectConditions = (state: AppState) => state.webParts.Conditions;
