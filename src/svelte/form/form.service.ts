export const getFormMeta = (key: string) => {
  const url = `${window.location.origin}/api/forms-meta?name=${key}`;
  return fetch(url, { credentials: "same-origin" });
};
