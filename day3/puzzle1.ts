import { findFirstCommonCharInStrings, getCharPriority } from "./common";

/**
 * https://adventofcode.com/2022/day/3
 * 
 * Get the priority of the item in common in both compartments (= in each half of the string)
 * @param items List of items as a string
 */
export function getCommonItemPriority(items: string) {    
    const [compartment1, compartment2] = cutStringInHalf(items);
    const itemInCommon = findFirstCommonCharInStrings(compartment1, compartment2);
    if (itemInCommon) {
        return getCharPriority(itemInCommon);
    }
    return 0;
}

/**
 * Get the total priority of a list of items, considering itemsString as a string like:
 * vJrwpWtwJgWrhcsFMMfFFhFp
 * jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
 * PmmdzqPrVvPwwTWBwg
 * wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
 * ttgJtRGJQctTZtZT
 * CrZsJsPPZsGzwwsLwLmpwMDw
 * @param itemsList 
 * */
export function getItemsListPriority(itemsList: string) {
    const itemsArray = itemsList.split("\n");
    return itemsArray.reduce((priority, items) => priority + getCommonItemPriority(items), 0);
}

/**
 * Cut a string in two strings of same length
 * @param str The string to cut
 * @returns An array with the two strings
 */
function cutStringInHalf(str: string): [string, string] {
    const half = Math.round(str.length / 2);
    return [str.substring(0, half), str.substring(half, str.length)];
}