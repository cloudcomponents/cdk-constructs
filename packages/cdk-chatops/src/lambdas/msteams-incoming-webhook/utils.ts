export const capitalizeFirstLetter = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const isEmpty = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length === 0;
