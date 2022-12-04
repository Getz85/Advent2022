/**
 * https://adventofcode.com/2022/day/4
 */

/**
 * Puzzle 1
 * Get the number of pairs fully overlapping, given entry as:
 * ["2-4,6-8", "2-3,4-5"]
 * 
 * @param pairs 
 * @returns 
 */
export function countFullyOverlappingPairs(pairs: Array<string>) {
    return pairs.reduce((nb, pair) => {
        const [left, right] = pair.split(",");
        return nb + (arePairsOverlapping(left, right) ? 1 : 0)
    }, 0);
}

/**
 * Puzzle 2
 * Get the number of pairs that intersect, given entry as:
 * ["2-4,6-8", "2-3,4-5"]
 * 
 * @param pairs 
 * @returns 
 */
 export function countIntersectingPairs(pairs: Array<string>) {
    return pairs.reduce((nb, pair) => {
        const [left, right] = pair.split(",");
        return nb + (arePairsIntersecting(left, right) ? 1 : 0)
    }, 0);
}

/**
 * Check if two pairs (ex: "2-4" and "6-8") are overlapping (= one pair is fully contained in the other)
 * @param pair1 
 * @param pair2 
 * @returns 
 */
function arePairsOverlapping(pair1: string, pair2: string): boolean {
    const [min1, max1] = getMinMaxFromPair(pair1);
    const [min2, max2] = getMinMaxFromPair(pair2);
    return min1 <= min2 && max1 >= max2 || min2 <= min1 && max2 >= max1;
}

/**
 * Check if two pairs (ex: "2-4" and "6-8") are intersecting (= one pair has at least one common value with the other)
 * @param pair1 
 * @param pair2 
 * @returns 
 */
 function arePairsIntersecting(pair1: string, pair2: string): boolean {
    const [min1, max1] = getMinMaxFromPair(pair1);
    const [min2, max2] = getMinMaxFromPair(pair2);
    return min2 >= min1 && max1 >= min2 || min1 >= min2 && max2 >= min1;
}

/**
 * Get the min and max value from a pair
 * @param pair 
 * @returns 
 */
function getMinMaxFromPair(pair: string): number[] {
    return pair.split("-").map(v => parseInt(v, 10));
}