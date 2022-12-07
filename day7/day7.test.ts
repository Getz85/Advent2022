import {describe, expect, it} from "vitest";
import {countDirectoriesTotalSize, getDirectorySizeToRemove} from "./day7";
import fs from "node:fs/promises";
import path from "node:path";

const example = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const inputData = await fs.readFile(path.join(path.resolve(__dirname), './data.txt'), 'utf-8');

describe('Day 6 - Puzzle 1', () => {
    it("Should find total size of directories that has a size less than 100000 with example", () => {
        expect(countDirectoriesTotalSize(example, 100000)).to.equal(95437);
    });

    it("Should find total size of directories that has a size less than 100000 with input data" , () => {
        expect(countDirectoriesTotalSize(inputData, 100000)).to.equal(1783610);
    });
});

describe('Day 6 - Puzzle 2', () => {
    const fileSystemSize = 70000000;
    const spaceNeeded = 30000000;
    it("Should find the directory to remove with example", () => {
        expect(getDirectorySizeToRemove(example, fileSystemSize, spaceNeeded)).to.equal(24933642);
    });

    it("Should find the directory to remove with input data", () => {
        expect(getDirectorySizeToRemove(inputData, fileSystemSize, spaceNeeded)).to.equal(4370655);
    });
});