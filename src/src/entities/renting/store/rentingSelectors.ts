import { RootState } from "shared/infrastructure/store/store";

export const selectRenting = (state: RootState) => state.renting;
