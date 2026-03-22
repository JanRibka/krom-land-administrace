import { RentingDecorationTheme } from "./RentingDecorationTheme";
import { RentingItem } from "./RentingItem";

export interface RentingData {
  idRentingPage: number;
  title: string;
  description: string;
  pageHeaderTextMain: string;
  pageHeaderTextMainColor: string;
  mainImage: string;
  items: RentingItem[];
  decorationThemes: RentingDecorationTheme[];
}
