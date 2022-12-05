import { describe, expect, it } from "vitest";
import { getTopCratesOfStacksAfterOrderedRearrangement, getTopCratesOfStacksAfterUnorderedRearrangement } from "./day5";
import fs from "node:fs/promises";
import path from "node:path";

const example = 
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');

describe('Day 5 - Puzzle1', () => {
    it("Should find the three top crates after unordered rearrangement based on example", () => {
        expect(getTopCratesOfStacksAfterUnorderedRearrangement(example)).to.equal("CMZ");
    });
    it("Should find the top crates after unordered rearrangement based on input data", () => {
        expect(getTopCratesOfStacksAfterUnorderedRearrangement(inputData)).to.equal("NTWZZWHFV");
    });
});

describe('Day 5 - Puzzle2', () => {
    it("Should find the three top crates after ordered rearrangement based on example", () => {
        expect(getTopCratesOfStacksAfterOrderedRearrangement(example)).to.equal("MCD");
    });
    it("Should find the top crates after ordered rearrangement based on input data", () => {
        expect(getTopCratesOfStacksAfterOrderedRearrangement(inputData)).to.equal("BRZGFVBTJ");
    });
});