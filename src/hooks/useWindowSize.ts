import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setScreenSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });

    window.addEventListener("resize", () => {
      setScreenSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });

    return () => {
      window.removeEventListener("resize", () => {
        setScreenSize({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      });
    };
  }, []);

  return screenSize;
};
