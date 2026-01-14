import WebSettingsDTO from "shared/DTOs/WebSettingsDTO";

import WebSettingsModel from "../models/WebSettingsModel";

export const mapToWebSettingsDTO = (webSettings: WebSettingsModel) => {
  const result: WebSettingsDTO = {
    Id: webSettings.Id,
    FacebookLink: webSettings.FacebookLink,
    InstagramLink: webSettings.InstagramLink,
    TikTokLink: webSettings.TikTokLink,
    SubjectName: webSettings.SubjectName,
    SubjectICO: webSettings.SubjectICO,
    SubjectDIC: webSettings.SubjectDIC,
    AddressName: webSettings.AddressName,
    AddressAddress: webSettings.AddressAddress,
    AddressLink: webSettings.AddressLink,
    ContactName: webSettings.ContactName,
    ContactHours: webSettings.ContactHours,
    ContactTel: webSettings.ContactTel,
    ContactEmail: webSettings.ContactEmail,
  };

  return result;
};
