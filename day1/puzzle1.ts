import {getCaloriesByElf} from "./common";

/**
 * Trouver le lutin qui porte le plus de calories et retourner le nombre de calories
 */
export async function getMaxCalories() {
    const calories = await getCaloriesByElf();
    const maxIndex = calories.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    return calories[maxIndex];
}

