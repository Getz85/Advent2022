import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Retourne la somme des calories de chaque lutin sous forme de tableau
 */
export async function getCaloriesByElf() {
    const data = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');
    const elves = data.split("\n\n");
    return elves.reduce((calories: number[], elve:string) => {
        calories.push(elve.split('\n').map(cal => parseInt(cal, 10)).reduce((a, b) => a + b, 0));
        return calories;
    }, [])
}
