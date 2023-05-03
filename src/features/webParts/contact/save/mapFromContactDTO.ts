import ContactDTO from "shared/DTOs/ContactDTO";
import ImageModel from "shared/models/ImageModel";

import { ContactModel } from "../models/ContactModel";

export const mapFromContactDTO = (contactDTO?: ContactDTO | null) => {
  const result: ContactModel = {
    Id: contactDTO?.Id ?? 0,
    Title: contactDTO?.Title ?? "",
    Description: contactDTO?.Description ?? "",
    PageHeaderTextMain: contactDTO?.PageHeaderTextMain ?? "",
    PageHeaderTextMainColor: contactDTO?.PageHeaderTextMainColor ?? "",
    MainImage: !!contactDTO?.MainImage
      ? JSON.parse(contactDTO?.MainImage)
      : new ImageModel(),
    GoogleMapsUrl: contactDTO?.GoogleMapsUrl ?? "",
    Email: contactDTO?.Email ?? "",
    _dataLoaded: true,
  };

  return result;
};
