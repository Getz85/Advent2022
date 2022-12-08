import {describe, expect, it} from "vitest";
import {countVisibleTrees, getBestScenicScore} from "./day8";
import fs from "node:fs/promises";
import path from "node:path";

const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');

const example = `30373
25512
65332
33549
35390`;

describe('Day 8', () => {
    describe('Day 8 - Puzzle 1', () => {
        it("Should find visible trees from example", () => {
            expect(countVisibleTrees(example)).to.equal(21);
        });

        it("Should find visible trees from input data", () => {
            expect(countVisibleTrees(inputData)).to.equal(1693);
        });
    });

    describe('Day 8 - Puzzle 2', () => {
        it("Should find best scenic score from example", () => {
            expect(getBestScenicScore(example)).to.equal(8);
        });

        it("Should find best scenic score from input data", () => {
            expect(getBestScenicScore(inputData)).to.equal(422059);
        });
    });
});