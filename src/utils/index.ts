export const pause = async (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const shuffle = <T = unknown>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createSquareArray = <T = unknown>(size: number, value: T): T[][] => {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => value));
};
