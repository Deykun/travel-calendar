export const removeDiacritics = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0142/g, "l")
    .replace(/\u0141/g, "L");
};
