import ImageModel from "shared/models/ImageModel";

import { RentingDecorationTheme } from "./RentingDecorationTheme";
import { RentingItem } from "./RentingItem";

export interface RentingData {
  idRentingPage: number;
  title: string;
  description: string;
  pageHeaderTextMain: string;
  pageHeaderTextMainColor: string;
  mainImage: ImageModel;
  items: RentingItem[];
  decorationThemes: RentingDecorationTheme[];
}
