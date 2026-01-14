import WebSettingsDTO from "shared/DTOs/WebSettingsDTO";

import WebSettingsModel from "../models/WebSettingsModel";

export const mapFromWebSettingsDTO = (
  webSettingsDTO?: WebSettingsDTO | null
) => {
  const result: WebSettingsModel = {
    Id: webSettingsDTO?.Id ?? 0,
    FacebookLink: webSettingsDTO?.FacebookLink ?? null,
    InstagramLink: webSettingsDTO?.InstagramLink ?? null,
    TikTokLink: webSettingsDTO?.TikTokLink ?? null,
    SubjectName: webSettingsDTO?.SubjectName ?? null,
    SubjectICO: webSettingsDTO?.SubjectICO ?? null,
    SubjectDIC: webSettingsDTO?.SubjectDIC ?? null,
    AddressName: webSettingsDTO?.AddressName ?? null,
    AddressAddress: webSettingsDTO?.AddressAddress ?? null,
    AddressLink: webSettingsDTO?.AddressLink ?? null,
    ContactName: webSettingsDTO?.ContactName ?? null,
    ContactHours: webSettingsDTO?.ContactHours ?? null,
    ContactTel: webSettingsDTO?.ContactTel ?? null,
    ContactEmail: webSettingsDTO?.ContactEmail ?? null,
    _dataLoaded: true,
  };

  return result;
};
