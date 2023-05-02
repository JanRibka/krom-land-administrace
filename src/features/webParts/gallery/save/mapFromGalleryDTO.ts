import GalleryDTO from "shared/DTOs/GalleryDTO";
import WebPartsDTO from "shared/DTOs/WebPartsDTO";
import {
  initialState,
  WebPartsState,
} from "shared/infrastructure/store/webParts/webPartsSlice";
import DocumentModel from "shared/models/DocumentModel";
import ImageModel from "shared/models/ImageModel";

import GalleryImageModel from "../models/GalleryImageModel";
import GalleryModel from "../models/GalleryModel";

export const mapFromGalleryDTO = (galleryDTO?: GalleryDTO | null) => {
  const result: GalleryModel = {
    ...initialState.Gallery,

    Title: galleryDTO?.Title ?? "",
    Description: galleryDTO?.Description ?? "",
    PageHeaderTextMain: galleryDTO?.PageHeaderTextMain ?? "",
    PageHeaderTextMainColor: galleryDTO?.PageHeaderTextMainColor ?? "",
    MainImage: !!galleryDTO?.MainImage
      ? JSON.parse(galleryDTO?.MainImage)
      : new ImageModel(),
    ExternalGalleryLink: galleryDTO?.ExternalGalleryLink ?? "",
    Images:
      galleryDTO?.Images.map(
        (item) =>
          new GalleryImageModel({
            Id: item?.Id ?? 0,
            Image: !!item?.Image
              ? JSON.parse(item.Image)
              : new GalleryImageModel(),
            Delete: item?.Delete ?? false,
          })
      ) ?? [],
    _dataLoaded: true,
  };

  return result;
};
