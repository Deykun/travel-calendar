const initStackCache = () => {
  const cache: {
    [key: string]: Blob;
  } = {};

  return {
    getItem: (key: string) => {
      return cache[key];
    },
    setItem: (key: string, value: Blob) => {
      cache[key] = value;
    },
  };
};

export const stackCache = initStackCache();
