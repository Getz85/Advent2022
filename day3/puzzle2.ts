import { findFirstCommonCharInStrings, getCharPriority } from "./common";

/**
 * Get the priority of the common badge in the group of items
 * @param items1
 * @param items2
 * @param items3
 */
export function getBadgeItemPriority(items1: string, items2: string, items3: string) {
    const commonChar = findFirstCommonCharInStrings(items1, items2, items3);
    if (commonChar) {
        return getCharPriority(commonChar);
    }
    return 0;
}

/**
 * Compute the total badge priority from a set of data
 * @param input 
 */
export function getTotalBadgeItemPriority(input: string) {
    let total = 0;
    const lines = input.split("\n");
    for (let index = 0; index < lines.length; index+= 3) {
        total += getBadgeItemPriority(lines[index], lines[index + 1], lines[index + 2]);
    }
    return total;
}