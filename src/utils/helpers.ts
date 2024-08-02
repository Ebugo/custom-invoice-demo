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
  arr: T[],
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
