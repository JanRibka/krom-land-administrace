import WebPartsDTO from "shared/DTOs/WebPartsDTO";
import {
  initialState,
  WebPartsState,
} from "shared/infrastructure/store/webParts/webPartsSlice";

export const mapFromWebPartsDTO = (webPartsDTO?: WebPartsDTO | null) => {
  const result: WebPartsState = {
    ...initialState,
    Home: {
      Title: webPartsDTO?.Home?.Title ?? "",
      Description: webPartsDTO?.Home?.Description ?? "",
      MainImagePath: webPartsDTO?.Home?.MainImagePath ?? "",
      MainImageAlt: webPartsDTO?.Home?.MainImageAlt ?? "",
      AboutUs: webPartsDTO?.Home?.AboutUs ?? "",
      AboutUsImagePath: webPartsDTO?.Home?.AboutUsImagePath ?? "",
      AboutUsImageAlt: webPartsDTO?.Home?.AboutUsImageAlt ?? "",
      PeopleSay1Text: webPartsDTO?.Home?.PeopleSay1Text ?? "",
      PeopleSay1Name: webPartsDTO?.Home?.PeopleSay1Name ?? "",
      PeopleSay2Text: webPartsDTO?.Home?.PeopleSay2Text ?? "",
      PeopleSay2Name: webPartsDTO?.Home?.PeopleSay2Name ?? "",
      PeopleSay3Text: webPartsDTO?.Home?.PeopleSay3Text ?? "",
      PeopleSay3Name: webPartsDTO?.Home?.PeopleSay3Name ?? "",
    },
  };

  return result;
};
