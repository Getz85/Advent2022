/**
 * Day 8 - Puzzle 1
 * Count number of visible trees
 * @see https://adventofcode.com/2022/day/8
 * @param input
 */
export function countVisibleTrees(input: string) {
    const trees = getTreesFromInput(input);
    let visibleTreesCount = 0;
    const visibleTrees: Array<string[]> = [];
    for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
        const treesRow = trees[rowIndex];
        visibleTrees[rowIndex] = [];
        for (let treeIndex = 0; treeIndex < treesRow.length; treeIndex++) {
            if (isTreeVisible(trees, rowIndex, treeIndex)) {
                visibleTreesCount++;
                visibleTrees[rowIndex][treeIndex] = "⇞";
            } else {
                visibleTrees[rowIndex][treeIndex] = " ";
            }

        }
    }
    // Show my beautiful forest
    console.log(visibleTrees);
    return visibleTreesCount;
}

/**
 * Day 8 - Puzzle 2
 * Returns the best scenic score: the place in the forest where we can see the maximum of trees
 * @see https://adventofcode.com/2022/day/8
 * @param input
 */
export function getBestScenicScore(input: string): number {
    const trees = getTreesFromInput(input);
    let bestScenicScore = 0;
    for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
        const treesRow = trees[rowIndex];
        for (let treeIndex = 0; treeIndex < treesRow.length; treeIndex++) {
            const scenicScore = getScenicScore(trees, rowIndex, treeIndex);
            bestScenicScore = Math.max(scenicScore, bestScenicScore);
        }
    }
    return bestScenicScore;
}

/**
 * Get an array of array of trees from the input.
 * Each element is the height of the tree
 * @param input
 */
function getTreesFromInput(input: string): Trees {
    const trees: Trees = [];
    const lines = input.split("\n");
    for (const line of lines) {
        trees.push((line.split("").map(tree => parseInt(tree))));
    }
    return trees;
}

/**
 * Check if the tree is visible from at least one of the edge
 * @param trees All the trees of the forest
 * @param rowIndex The row index
 * @param treeIndex The tree index in the row
 */
function isTreeVisible(trees: Trees, rowIndex: number, treeIndex: number) {
    if (rowIndex === 0) {
        // First row, tree is visible
        return true;
    }
    if (rowIndex === (trees.length - 1)) {
        // Last row, tree is visible
        return true;
    }
    if (treeIndex === 0) {
        // First column, tree is visible
        return true;
    }
    const treesRow = trees[rowIndex];
    if (treeIndex === (treesRow.length - 1)) {
        // Last column, tree is visible
        return true;
    }
    const tree = treesRow[treeIndex];
    const {left, right, top, bottom} = getSurroundingTrees(trees, rowIndex, treeIndex);
    // The tree is visible if the tree is taller than the other one at least on one side
    return isTreeTaller(tree, left) || isTreeTaller(tree, right) || isTreeTaller(tree, top) || isTreeTaller(tree, bottom);
}

/**
 * Returns the tree surrounding the current tree on each side
 * @param trees
 * @param rowIndex
 * @param treeIndex
 */
function getSurroundingTrees(trees: Trees, rowIndex: number, treeIndex: number): {left: number[], right: number[], top: number[], bottom: number[]} {
    const treesRow = trees[rowIndex];
    const leftTrees = treesRow.slice(0,treeIndex);
    const rightTrees = treesRow.slice(treeIndex + 1, treesRow.length);
    const topTrees = trees.filter((_,i) => i < rowIndex).map(row => row[treeIndex]);
    const bottomTrees = trees.filter((_,i) => i > rowIndex).map(row => row[treeIndex]);
    return {
        left: leftTrees,
        right: rightTrees,
        top: topTrees,
        bottom: bottomTrees
    };
}

/**
 * Check if a tree is taller than the other ones
 * @param tree
 * @param otherTrees
 */
function isTreeTaller(tree: number, otherTrees: number[]) {
    return otherTrees.every(t => tree > t);
}

/**
 * Compute a scenic score for a specific tree
 * @param trees
 * @param rowIndex
 * @param treeIndex
 */
function getScenicScore(trees: Trees, rowIndex: number, treeIndex: number) {
    let {left, right, top, bottom} = getSurroundingTrees(trees, rowIndex, treeIndex);
    // We reverse the left and top because the nearest tree is the last tree of the array, we want the nearest tree first
    left = left.reverse();
    top = top.reverse();
    const tree = trees[rowIndex][treeIndex];
    const leftIndexTaller = findFirstTallerTreeIndex(tree, left);
    const rightIndexTaller = findFirstTallerTreeIndex(tree, right);
    const topIndexTaller = findFirstTallerTreeIndex(tree, top);
    const bottomIndexTaller = findFirstTallerTreeIndex(tree, bottom);
    const leftScore = countNumberOfTreesVisible(left, leftIndexTaller);
    const rightScore = countNumberOfTreesVisible(right, rightIndexTaller);
    const topScore = countNumberOfTreesVisible(top, topIndexTaller);
    const bottomScore = countNumberOfTreesVisible(bottom, bottomIndexTaller);
    return leftScore * rightScore * topScore * bottomScore;
}

/**
 * Find the index of the first taller (or same size) tree in trees
 * @param tree
 * @param trees
 */
function findFirstTallerTreeIndex(tree: number, trees: number[]) {
    return trees.findIndex(t => t >= tree);
}

/**
 * Get the number of trees visible
 * @param trees
 * @param treeIndex
 */
function countNumberOfTreesVisible(trees: number[], treeIndex: number) {
    // 0 tree taller : all trees are visible
    // At least one tree taller: the taller one is visible
    return treeIndex >= 0 ? trees.slice(0, treeIndex + 1).length : trees.length;
}

type Trees = Array<Array<number>>;