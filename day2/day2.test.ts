import {describe, expect, it} from 'vitest'
import fs from "node:fs/promises";
import path from "node:path";
import {getRPSScore} from "./puzzle1";
import {getRPSVariantScore} from "./puzzle2";
const example = "A Y\nB X\nC Z";

describe.concurrent('Day 2 - Puzzle1', () => {

    it('should compute exemple score', () => {
        expect(getRPSScore(example)).to.equal(15);
    });

    it('should compute real score', async () => {
        const data = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');
        expect(getRPSScore(data)).to.equal(13009);
    })
});


describe.concurrent('Day 2 - Puzzle2', () => {
    it('should compute exemple score', () => {
        expect(getRPSVariantScore(example)).to.equal(12);
    });

    it('should compute real score', async () => {
        const data = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');
        expect(getRPSVariantScore(data)).to.equal(10398);
    })
});