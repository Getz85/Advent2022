import { describe, expect, it } from "vitest";
import { countFullyOverlappingPairs, countIntersectingPairs } from "./day4";
import fs from "node:fs/promises";
import path from "node:path";

const example = [
    "2-4,6-8",
    "2-3,4-5",
    "5-7,7-9",
    "2-8,3-7",
    "6-6,4-6",
    "2-6,4-8"
];
const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');

describe('Day 4 - Puzzle1', () => {
    it("Should find two pairs that contains the other one based on example", () => {
        expect(countFullyOverlappingPairs(example)).to.equal(2);
    });
    it("Should find the number of pairs that contains the other one based on input data", () => {
        const pairs = inputData.split("\n");
        expect(countFullyOverlappingPairs(pairs)).to.equal(571);
    });
});

describe('Day 4 - Puzzle2', () => {
    it("Should find four pairs that intersect based on example", () => {
        expect(countIntersectingPairs(example)).to.equal(4);
    });
    it("Should find four pairs that intersect based on input data", () => {
        const pairs = inputData.split("\n");
        expect(countIntersectingPairs(pairs)).to.equal(917);
    });
});