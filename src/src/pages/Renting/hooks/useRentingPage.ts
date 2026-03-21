import {
  RentingData,
  selectRenting,
  useGetRentingData,
  useRentingSlice,
  useUpdatePageDataMutation,
} from "entities/renting";
import React from "react";
import AppNotification from "shared/components/notification/AppNotification";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { useAppSelector } from "shared/infrastructure/store/store";
import { nameof } from "shared/nameof";

export function useRentingPage() {
  const authentication = useAppSelector(selectAuthentication);
  const renting = useAppSelector(selectRenting);
  const disable = authentication.UserRole === UserRoleEnum.USER;

  const { isLoading } = useGetRentingData(renting._dataLoaded);
  const { rentingUpdate } = useRentingSlice();
  const [updatePageData, { isLoading: isSaving }] = useUpdatePageDataMutation();

  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    rentingUpdate({ [name]: value });
  };

  const handleSaveOnClick = async () => {
    try {
      await updatePageData(renting).unwrap();
    } catch (error: any) {
      if (typeof error === "string") {
        AppNotification("Chyba", "Chyba při ukládání dat", "danger");
      } else {
        AppNotification("Chyba", error.message, "danger");
      }
    }
  };

  return {
    renting,
    disable,
    isLoading,
    isSaving,
    handleTextFieldOnBlur,
    handleSaveOnClick,
    // Helpery pro nameof, aby se nemusely importovat v komponentě
    nameofRenting: (prop: keyof RentingData) => nameof<RentingData>(prop),
  };
}
