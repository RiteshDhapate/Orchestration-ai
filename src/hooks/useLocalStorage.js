import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [state, setInternalState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Directly return the item as a string or initial value
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”: ", error);
      return initialValue;
    }
  });

  useEffect(() => {
    const onStorageUpdate = (e) => {
      if (e.key === key) {
        try {
          setInternalState(e.newValue); // Directly set the new value as a string
        } catch (error) {
          console.error("Error parsing JSON from localStorage for key “" + key + "”: ", error);
        }
      }
    };

    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, [key]);

  const setState = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setInternalState(valueToStore);
      window.localStorage.setItem(key, valueToStore); // Store the value directly as a string
    } catch (error) {
      console.error("Error writing to localStorage key “" + key + "”: ", error);
    }
  };

  return [state, setState];
}
