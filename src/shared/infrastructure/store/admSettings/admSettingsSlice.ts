import { GridRowDataModel } from "features/admSettings/admSettings/tableOfKeys/table/Table";
import UserModel from "features/admSettings/models/UserModel";
import TableOfKeysModel from "shared/models/TableOfKeysModel";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export type DropDownsDataType = {
  [key: string]: TableOfKeysModel[];
};

export interface AdmSettingsState {
  Users: UserModel[];
  RoleList: TableOfKeysModel[];
  DropDownsData: DropDownsDataType;
  _roleListLoaded: boolean;
  _admSettingsLoaded: boolean;
  _usersLoaded: boolean;
}

export const initialState: AdmSettingsState = {
  Users: [],
  RoleList: [],
  DropDownsData: {},
  _roleListLoaded: false,
  _admSettingsLoaded: false,
  _usersLoaded: false,
};

export const admSettingsSlice = createSlice({
  name: "admSettingsSlice",
  initialState,
  reducers: {
    admSettingsUpdate: (
      state,
      action: PayloadAction<Partial<AdmSettingsState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    tableOfKeyUpdate: (state, action: PayloadAction<GridRowDataModel[]>) => {
      const groupKey = action.payload[0].GroupKey;

      const newDropDownsData = { ...state.DropDownsData };

      Object.keys(newDropDownsData).forEach((item) => {
        if (item === groupKey) {
          newDropDownsData[item] = action.payload.map((item) => {
            return {
              Id: item.Id,
              GroupKey: item.GroupKey,
              Key: item.Key,
              Name: item.Name,
              Value: item.Value,
              Enabled: item.Enabled,
            } as TableOfKeysModel;
          });
        }
      });

      return {
        ...state,
        DropDownsData: newDropDownsData,
      };
    },
  },
});

export const actions = admSettingsSlice.actions;

export default admSettingsSlice.reducer;

// Selectors
export const selectAdmSettings = (state: AppState) => state.admSettings;
