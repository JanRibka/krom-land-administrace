import ActionDetailModel from "features/actions/models/ActionDetailModel";
import ActionsModel from "features/actions/models/ActionsModel";
import DocumentToDownloadModel from "features/actions/models/DocumentToDownloadModel";
import { ContactModel } from "features/contact/models/ContactModel";
import GalleryModel from "features/gallery/models/GalleryModel";
import HomeModel from "features/home/models/HomeModel";
import TeamMemberModel from "features/home/models/TeamMemberModel";
import DocumentModel from "shared/models/DocumentModel";
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
      action: PayloadAction<{ document: Partial<DocumentModel>; index: number }>
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
    galleryImageUpdate: (
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
