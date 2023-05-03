import GalleryDTO from "shared/DTOs/GalleryDTO";

import GalleryModel from "../models/GalleryModel";

export const mapToGalleryDTO = (gallery: GalleryModel) => {
  const result: GalleryDTO = {
    Id: gallery.Id,
    Title: gallery.Title,
    Description: gallery.Description,
    PageHeaderTextMain: gallery.PageHeaderTextMain,
    PageHeaderTextMainColor: gallery.PageHeaderTextMainColor,
    MainImage: null,
    ExternalGalleryLink: gallery.ExternalGalleryLink,
    Images: [],
  };

  return result;
};
