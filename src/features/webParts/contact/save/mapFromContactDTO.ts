import ContactDTO from 'shared/DTOs/ContactDTO';
import { initialState } from 'shared/infrastructure/store/webParts/webPartsSlice';
import ImageModel from 'shared/models/ImageModel';

import { ContactModel } from '../models/ContactModel';

export const mapFromContactDTO = (contactDTO?: ContactDTO | null) => {
  const result: ContactModel = {
    ...initialState.Contact,
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
