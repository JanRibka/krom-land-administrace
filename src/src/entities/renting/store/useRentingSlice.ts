import { useAppDispatch } from "shared/infrastructure/store/store";
import ImageModel from "shared/models/ImageModel";

import { RentingData, RentingImageType } from "../types";
import { actions } from "./rentingSlice";

import type { RentingState } from "./RentingState";

export function useRentingSlice() {
  const dispatch = useAppDispatch();

  const setRentingFromData = (data: RentingData) => {
    dispatch(actions.setRentingFromData(data));
  };

  const rentingUpdate = (data: Partial<RentingState>) => {
    dispatch(actions.rentingUpdate(data));
  };

  const imageUpdate = (name: RentingImageType, image: Partial<ImageModel>) => {
    dispatch(actions.imageUpdate({ name, image }));
  };

  return { setRentingFromData, rentingUpdate, imageUpdate };
};
