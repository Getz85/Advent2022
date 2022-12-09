/**
 * Day 9, puzzle 1 & 2
 * @see https://adventofcode.com/2022/day/9
 * @param input
 * @param knotsNumber
 */
export function countUniqueTailPositions(input: string, knotsNumber = 2) {
    if (knotsNumber < 2) {
        throw new Error("We need at least 2 knots");
    }
    const moves = getMovesFromInput(input);
    const knotPositions = new Array(knotsNumber).fill(undefined).map(() => ({x: 0, y: 0}));
    const tailPositions: Coord[] = [knotPositions[knotsNumber - 1]];
    for (const move of moves) {
        for (let i = 0; i < move.steps; i++) {
            knotPositions[0] = moveOneStep(knotPositions[0], move.direction);
            for (let knot = 1; knot < knotsNumber; knot++) {
                knotPositions[knot] = followPosition(knotPositions[knot], knotPositions[knot - 1]);
            }
            const tailPosition = knotPositions[knotsNumber - 1];
            if (!tailPositions.some(({x,y}) => x === tailPosition.x && y === tailPosition.y)) {
                tailPositions.push(tailPosition);
            }
        }
    }
    return tailPositions.length;
}

/**
 * Move the coordinates of one step in the direction
 * @param position
 * @param direction
 */
function moveOneStep(position: Coord, direction: Direction): Coord {
    let x = position.x;
    let y = position.y;
    switch (direction) {
        case "R":
            return {x: ++x, y};
        case "L":
            return {x: --x, y};
        case "D":
            return {x, y: --y};
        case "U":
            return {x, y: ++y};
        default:
            throw new Error(`Unknown direction ${direction}`);
    }
}

/**
 * Returns the coordinates of tailPosition after a move of headPosition.
 *
 * @param tailPosition
 * @param headPosition
 */
function followPosition(tailPosition: Coord, headPosition: Coord): Coord {
    if(isPositionsClose(tailPosition, headPosition)) {
       return tailPosition;
    }
    if (tailPosition.y === headPosition.y) {
        // same column
        return {
            y: tailPosition.y,
            x: tailPosition.x > headPosition.x ? tailPosition.x - 1 : tailPosition.x + 1
        }
    } else if (tailPosition.x === headPosition.x) {
        // same line
        return {
            y: tailPosition.y > headPosition.y ?  tailPosition.y - 1 : tailPosition.y + 1,
            x: tailPosition.x
        }
    } else {
        // move diagonally
        return {
            y: tailPosition.y > headPosition.y ?  tailPosition.y - 1 : tailPosition.y + 1,
            x: tailPosition.x > headPosition.x ? tailPosition.x - 1 : tailPosition.x + 1
        }
    }

}

/**
 * Check if the position1 is near the position2
 * @param pos1
 * @param pos2
 */
function isPositionsClose(pos1: Coord, pos2: Coord) {
    const minX = pos2.x - 1;
    const maxX = pos2.x + 1;
    const minY = pos2.y - 1;
    const maxY = pos2.y + 1;
    return pos1.x >= minX && pos1.x <= maxX && pos1.y >= minY && pos1.y <= maxY;
}

function getMovesFromInput(input: string): Move[] {
    return input.split("\n").map(line => {
        const [d, s] = line.split(" ");
        return {
            direction: d as Direction,
            steps: parseInt(s)
        }
    });
}

interface Coord {
    x: number,
    y: number
}

type Direction = "R" | "L" | "U" | "D"

interface Move {
    direction: Direction
    steps: number
}

