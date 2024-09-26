import { useEffect } from "react";

export const useDarkMode = () => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);
};

export default useDarkMode;
