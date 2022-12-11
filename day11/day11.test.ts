import {describe, expect, it} from "vitest";
import {getMonkeyBusiness} from "./day11";
import fs from "node:fs/promises";
import path from "node:path";

const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');
const example = await fs.readFile(path.join(path.resolve(__dirname), './example.txt'), 'utf-8');

describe('Day 11', () => {
    describe('Day 11 - Puzzle 1', () => {
        it("Should get monkey business from example", () => {
            expect(getMonkeyBusiness(example)).to.equal(10605);
        });
        it("Should get monkey business from input data", () => {
            expect(getMonkeyBusiness(inputData)).to.equal(61503);
        });
    });

    describe('Day 11 - Puzzle 2', () => {
        it("Should get monkey business without worry level limit from example", () => {
            expect(getMonkeyBusiness(example, 10000, null)).to.equal(2713310158);
        });
        it("Should get monkey business without worry level limit from input data", () => {
            expect(getMonkeyBusiness(inputData, 10000, null)).to.equal(14081365540);
        });
    });
});