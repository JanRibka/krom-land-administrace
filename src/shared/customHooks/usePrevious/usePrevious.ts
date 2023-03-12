import { useEffect, useRef } from "react";

/**
 * Hook gets previous value from current value
 * @param value
 * @returns Previous value
 */
const usePrevious = <T>(value: T): T | undefined => {
  // References
  const effectRan = useRef<boolean>(false);

  // Consts
  const ref = useRef<T>();

  // Other
  useEffect(() => {
    if (
      process.env.REACT_APP_INSTANCE_NAME === "Prod" ||
      effectRan.current === true
    ) {
      ref.current = value;
    }

    return () => {
      effectRan.current = true;
    };
  });

  return ref.current;
};

export default usePrevious;
