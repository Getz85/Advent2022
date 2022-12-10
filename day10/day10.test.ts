import {describe, expect, it} from "vitest";
import {getCRTOutput, getSignalStrength} from "./day10";
import fs from "node:fs/promises";
import path from "node:path";

const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');
const example = await fs.readFile(path.join(path.resolve(__dirname), './example.txt'), 'utf-8');

describe('Day 10', () => {
    describe('Day 10 - Puzzle 1', () => {
        const cycles = [20, 60, 100, 140, 180, 220];
        it("Should get signal strength from example", () => {
            expect(getSignalStrength(example, cycles)).to.equal(13140);
        });
        it("Should get signal strength  from input data", () => {
            expect(getSignalStrength(inputData, cycles)).to.equal(12740);
        });
    });

    describe('Day 10 - Puzzle 2', () => {
        const cycles = [20, 60, 100, 140, 180, 220];
        it("Should get CRT Ouput from example", () => {
            const output = 
`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;
            expect(getCRTOutput(example)).to.equal(output);
        });
        it("Should get signal strength  from input data", () => {
            const output = 
`###..###..###...##..###...##...##..####.
#..#.#..#.#..#.#..#.#..#.#..#.#..#.#....
#..#.###..#..#.#..#.#..#.#..#.#....###..
###..#..#.###..####.###..####.#.##.#....
#.#..#..#.#....#..#.#.#..#..#.#..#.#....
#..#.###..#....#..#.#..#.#..#..###.#....`
            expect(getCRTOutput(inputData)).to.equal(output);
        });
    });
});