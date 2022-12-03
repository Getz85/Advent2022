import { describe, expect, it } from 'vitest'
import fs from "node:fs/promises";
import path from "node:path";
import { getCommonItemPriority, getItemsListPriority } from "./puzzle1";
import { getBadgeItemPriority, getTotalBadgeItemPriority } from './puzzle2';
const example = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');

describe('Day 3 - Puzzle1', () => {
    describe("Priority for two compartments", () => {
        it('should get priority for vJrwpWtwJgWrhcsFMMfFFhFp', () => {
            expect(getCommonItemPriority("vJrwpWtwJgWrhcsFMMfFFhFp")).to.equal(16);
        });

        it('should get priority for jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', () => {
            expect(getCommonItemPriority("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).to.equal(38);
        });

        it('should get priority for PmmdzqPrVvPwwTWBwg', () => {
            expect(getCommonItemPriority("PmmdzqPrVvPwwTWBwg")).to.equal(42);
        });

        it('should get priority for wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', () => {
            expect(getCommonItemPriority("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn")).to.equal(22);
        });

        it('should get priority for ttgJtRGJQctTZtZT', () => {
            expect(getCommonItemPriority("ttgJtRGJQctTZtZT")).to.equal(20);
        });

        it('should get priority for CrZsJsPPZsGzwwsLwLmpwMDw', () => {
            expect(getCommonItemPriority("CrZsJsPPZsGzwwsLwLmpwMDw")).to.equal(19);
        });
    });

    describe("Priority for a list of compartments", () => {
        it('should get priority for example compartments', () => {
            expect(getItemsListPriority(example)).to.equal(157);
        });

        it('should get priority for input data', async () => {
            expect(getItemsListPriority(inputData)).to.equal(8139);
        });
    });
});

describe('Day 3 - Puzzle2', () => {
    describe("Priority badge for one group of 3", () => {
        it('should get priority for first data test input', () => {
            expect(getBadgeItemPriority("vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg")).to.equal(18);
        });

        it('should get priority for first data test input', () => {
            expect(getBadgeItemPriority("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw")).to.equal(52);
        });
    });

    describe("Total priority badge", () => {
        it('should get priority for data test input', () => {
            expect(getTotalBadgeItemPriority(example)).to.equal(70);
        });

        it('should get priority for first data test input', () => {
            expect(getTotalBadgeItemPriority(inputData)).to.equal(2668);
        });
    });
});