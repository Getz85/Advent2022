import {getCaloriesByElf} from "./common";

/**
 * Trouver les 3 lutins qui porte le plus de calories et retourner la somme de leurs calories
 */
try {
    const calories = await getCaloriesByElf();
    calories.sort((a,b) => b - a);
    console.log(`Les 3 lutins avec le plus de calories portent ${calories[0] + calories[1] + calories[2]} calories`);
} catch (err) {
    console.error(err);
}

/**
 * Trouver le lutin qui porte le plus de calories et retourner le nombre de calories
 */
export async function get3MaxCalories() {
    const calories = await getCaloriesByElf();
    calories.sort((a,b) => b - a);
    return calories[0] + calories[1] + calories[2];
}

