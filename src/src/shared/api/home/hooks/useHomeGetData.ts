import { mapFromHomeDTO } from "features/webParts/home/save/mapFromHomeDTO";
import { useEffect } from "react";
import AppNotification from "shared/components/notification/AppNotification";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";

import { useGetHomeDataQuery } from "../homeApi";

export const useHomeGetData = () => {
  const { handleHomeUpdate } = useWebPartsSlice();

  const { isLoading, isFetching, isError, error, data, refetch } =
    useGetHomeDataQuery();

  const isLoadingState = isLoading || isFetching;

  // Debug: Log every render
  console.log("useHomeGetData - RENDER", {
    isLoading,
    isFetching,
    isError,
    hasData: !!data,
    hasError: !!error,
  });

  useEffect(() => {
    console.log("useHomeGetData - useEffect - data", data);
    console.log("useHomeGetData - useEffect - error", error);
    console.log("useHomeGetData - useEffect - isError", isError);
    console.log("useHomeGetData - useEffect - isLoadingState", isLoadingState);
    if (isLoading || isFetching) return;

    if (isError && error) {
      AppNotification("Chyba", error.toString(), "danger");
      return;
    }

    handleHomeUpdate(mapFromHomeDTO(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isLoading, isFetching]);

  return {
    isLoading: isLoadingState,
    refetch,
  };
};
