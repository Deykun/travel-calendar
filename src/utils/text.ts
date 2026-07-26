export const removeDiacritics = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u0142/g, 'l')
    .replace(/\u0141/g, 'L');
};

export const capitalize = (text: string | undefined) => {
  if (!text) {
    return text;
  }

  if (!text[0]) {
    return text;
  }

  return text[0].toUpperCase() + text.slice(1);
};
