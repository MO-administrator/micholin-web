import { useState, useEffect } from "react";

function getLocalStorageItem(key: string, initialValue: string) {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);
  return initialValue;
}
function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}
function setLocalStorageItem(key: string, value: string) {
  if (!value) return removeLocalStorageItem(key);
  localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage(key: string, initialValue = "") {
  const [item, setItem] = useState(() =>
    getLocalStorageItem(key, initialValue)
  );

  useEffect(() => {
    setLocalStorageItem(key, item);

    // return () => {
    //   removeLocalStorageItem(key);
    // };
  }, [item, key]);

  return [item, setItem];
}
