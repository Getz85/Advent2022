import {describe, expect, it} from 'vitest'
import {getMaxCalories} from "./puzzle1";
import {get3MaxCalories} from "./puzzle2";

describe.concurrent('Day 1 - Puzzle1', () => {
    it('should compute calories', async () => {
        expect(await getMaxCalories()).to.equal(69912);
    });
});

describe.concurrent('Day 1 - Puzzle2', () => {
    it('should compute calories', async () => {
        expect(await get3MaxCalories()).to.equal(208180);
    });
});