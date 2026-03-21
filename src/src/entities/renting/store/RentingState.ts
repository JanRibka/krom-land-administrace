import ImageModel from "shared/models/ImageModel";
import { RentingDecorationTheme, RentingItem } from "../types";

export interface RentingState {
  idRentingPage: number;
  title: string;
  description: string;
  pageHeaderTextMain: string;
  pageHeaderTextMainColor: string;
  mainImage: ImageModel;
  items: RentingItem[];
  decorationThemes: RentingDecorationTheme[];
  _dataLoaded: boolean;
}
