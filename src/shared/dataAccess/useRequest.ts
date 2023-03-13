import { DependencyList, useEffect, useState } from "react";
import IRequest from "shared/infrastructure/repositiory/IRequest";
import Repository from "shared/infrastructure/repositiory/Repository";

import IRequestExecCondition from "./IRequestExecCondition";

export const useRequest = <T>(
  request: IRequest,
  initialData: T,
  dependences: DependencyList = [],
  requestExecCondition?: IRequestExecCondition,
  afterLoadAction?: (data: T, isError?: boolean) => void
) => {
  // Constants
  const _repositiory = new Repository();

  // State
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Other
  useEffect(() => {
    if (requestExecCondition !== undefined && requestExecCondition.apply) {
      if (requestExecCondition.condition()) getData();
    } else {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependences]);

  const getData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setIsError(false);

    try {
      let result: T;

      result = await _repositiory.get<T>(request);

      if (result) {
        setData(result);
        afterLoadAction?.(result, false);
      }
    } catch (ex) {
      setIsError(true);
      afterLoadAction?.(data, true);
    }

    setIsLoading(false);
  };

  return { data, isLoading, isError, setData };
};
