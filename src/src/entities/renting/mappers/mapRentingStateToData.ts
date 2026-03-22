import { RentingState } from "../store";
import { RentingData } from "../types";

/**
 * Maps the store shape (RentingState) back to API data (RentingData).
 * Converts mainImage from an ImageModel instance back to a JSON string.
 */
export function mapRentingStateToData(state: RentingState): RentingData {
  return {
    idRentingPage: state.idRentingPage,
    title: state.title,
    description: state.description,
    pageHeaderTextMain: state.pageHeaderTextMain,
    pageHeaderTextMainColor: state.pageHeaderTextMainColor,
    mainImage: JSON.stringify(state.mainImage),
    items: state.items,
    decorationThemes: state.decorationThemes,
  };
}
