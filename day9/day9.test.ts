import {describe, expect, it} from "vitest";
import {countUniqueTailPositions} from "./day9";
import fs from "node:fs/promises";
import path from "node:path";

const example = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');
describe('Day 9', () => {
    describe('Day 9 - Puzzle 1', () => {
        it("Should count unique tail positions from example", () => {
            expect(countUniqueTailPositions(example)).to.equal(13);
        });
        it("Should count unique tail positions from input data", () => {
            expect(countUniqueTailPositions(inputData)).to.equal(6190);
        });
    });

    describe('Day 9 - Puzzle 2', () => {
        const example2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
        it("Should count unique tail positions from example with 10 knots", () => {
            expect(countUniqueTailPositions(example, 10)).to.equal(1);
        });
        it("Should count unique tail positions from example 2 with 10 knots", () => {
            expect(countUniqueTailPositions(example2, 10)).to.equal(36);
        });
        it("Should count unique tail positions from input data with 10 knots", () => {
            expect(countUniqueTailPositions(inputData, 10)).to.equal(2516);
        });
    });
});