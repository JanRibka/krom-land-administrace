import React, { useMemo } from "react";

import { RentingImageType } from "entities/renting";
import {
  selectRenting,
  useRentingSlice,
} from "entities/renting/store";
import ImageService from "features/ImageService";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import { useAppSelector } from "shared/infrastructure/store/store";
import ImageModel from "shared/models/ImageModel";

export function usePageHeaderLogic() {
  const renting = useAppSelector(selectRenting);

  // Constants
  const _imageService = useMemo(() => new ImageService(), []);
  const { rentingUpdate, imageUpdate } = useRentingSlice();

  // Handlers
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    rentingUpdate({ [name]: value });
  };

  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string,
  ) => {
    const image = new ImageModel({
      path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      alt: alt,
      name: fileName,
    });

    rentingUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = (name: string) => {
    imageUpdate(name as RentingImageType, new ImageModel());
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = renting[name as RentingImageType] as ImageModel;

    image = {
      ...image,
      path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.name,
    };

    const result = await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.RENTING,
      renting.idRentingPage,
    );

    if (result) {
      imageUpdate(name as RentingImageType, {
        path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.name,
      });
    }
  };

  return {
    renting,
    handleTextFieldOnBlur,
    handleOnAfterFileUpload,
    handleOnAfterFileDelete,
    handleOnFileSave,
  };
};
