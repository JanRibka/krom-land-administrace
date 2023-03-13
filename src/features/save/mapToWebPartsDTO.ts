import WebPartsDTO from 'shared/DTOs/WebPartsDTO';
import { WebPartsState } from 'shared/infrastructure/store/webParts/webPartsSlice';

export const mapToWebPartsDTO = (webPartsState: WebPartsState) => {
  const result: WebPartsDTO = {
    Home: {
      Id: null,
      Title: webPartsState.Home.Title,
      Description: webPartsState.Home.Description,
      MainImagePath: webPartsState.Home.MainImagePath,
      MainImageAlt: webPartsState.Home.MainImageAlt,
      AboutUs: webPartsState.Home.AboutUs,
      AboutUsImagePath: webPartsState.Home.AboutUsImagePath,
      AboutUsImageAlt: webPartsState.Home.AboutUsImageAlt,
      PeopleSay1Text: webPartsState.Home.PeopleSay1Text,
      PeopleSay1Name: webPartsState.Home.PeopleSay1Name,
      PeopleSay2Text: webPartsState.Home.PeopleSay2Text,
      PeopleSay2Name: webPartsState.Home.PeopleSay2Name,
      PeopleSay3Text: webPartsState.Home.PeopleSay3Text,
      PeopleSay3Name: webPartsState.Home.PeopleSay3Name,
    },
  };

  return result;
};
