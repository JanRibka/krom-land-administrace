import { useEffect, useRef, useState } from "react";

/**
 * Hook gets current Y scroll position
 * @returns Scroll Y position
 */
const useScrollPosition = () => {
  // References
  const effectRan = useRef<boolean>(false);

  // State
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Other
  const UpdatePosition = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", UpdatePosition);

    if (
      process.env.REACT_APP_INSTANCE_NAME === "Prod" ||
      effectRan.current === true
    ) {
      UpdatePosition();
    }

    return () => {
      window.removeEventListener("scroll", UpdatePosition);
      effectRan.current = true;
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
