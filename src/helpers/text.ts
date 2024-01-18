export const capitalizeText = (text: string) => {
  if (text) {
    const result = text.charAt(0).toUpperCase() + text.slice(1) || text;

    return result;
  }
  return "";
};
