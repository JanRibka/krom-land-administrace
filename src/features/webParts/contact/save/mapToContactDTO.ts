import ContactDTO from "shared/DTOs/ContactDTO";

import { ContactModel } from "../models/ContactModel";

export const mapToContactDTO = (contact: ContactModel) => {
  const result: ContactDTO = {
    Id: contact.Id,
    Title: contact.Title,
    Description: contact.Description,
    PageHeaderTextMain: contact.PageHeaderTextMain,
    PageHeaderTextMainColor: contact.PageHeaderTextMainColor,
    MainImage: null,
    GoogleMapsUrl: contact.GoogleMapsUrl,
    Email: contact.Email,
  };

  return result;
};
