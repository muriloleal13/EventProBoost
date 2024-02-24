export const getImageURL = (url: string) => {
  return new URL(url, import.meta.url);
};
