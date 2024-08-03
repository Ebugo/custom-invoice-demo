import { IOptionsType } from "@/types";

/**
 * Takes in array and returns the array in required options format
 *
 * @param {Array} arr array
 * @param {string} valueKey value key
 * @param {string} labelKey label key
 * @returns {Array} the result array
 */
export const createCustomOptions = <T extends { [key: string]: string }>(
  arr: T[] | any[],
  valueKey: string = "value",
  labelKey: string = "label"
): Array<IOptionsType> => {
  if (!Array.isArray(arr)) return [];

  return arr.reduce((acc: IOptionsType[], curr) => {
    const value = {
      label: curr[labelKey],
      value: curr[valueKey],
    };
    acc.push(value);
    return acc;
  }, []);
};

/**
 * Debounce utility function
 * @param func callback function
 * @param wait wait duration in milliseconds
 * @returns calls callback function after wait duration
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
