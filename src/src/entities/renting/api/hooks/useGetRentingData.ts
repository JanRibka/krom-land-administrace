import { useEffect } from "react";

import { useRentingSlice } from "../../store/useRentingSlice";
import { useGetPageDataQuery } from "../rentingApi";

export function useGetRentingData(skip: boolean) {
  const { setRentingFromData } = useRentingSlice();

  const { data, isLoading, isError, error } = useGetPageDataQuery(undefined, {
    skip,
  });

  useEffect(() => {
    if (data) {
      setRentingFromData(data);
    }
  }, [data, setRentingFromData]);

  return {
    isLoading: !skip && isLoading,
    isError,
    error,
  };
};
