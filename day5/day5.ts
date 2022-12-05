/**
 * Puzzle 1: get top crates after rearrangement without keeping the order of crates moved: each crate is moved one by one
 * @param input 
 * @returns 
 */
export function getTopCratesOfStacksAfterUnorderedRearrangement(input: string): string {
    const { stacks, movements } = initStacksAndMovements(input);
    const rearrangement = new UnorderedRearrangement(stacks, movements);
    rearrangement.makeRearrangement();
    return rearrangement.getTopCrates();
}

/**
 * Puzzle 2: get top crates after rearrangement, keeping the order of crates moved
 * @param input 
 * @returns 
 */
export function getTopCratesOfStacksAfterOrderedRearrangement(input: string): string {
    const { stacks, movements } = initStacksAndMovements(input);
    const rearrangement = new OrderedRearrangement(stacks, movements);
    rearrangement.makeRearrangement();
    return rearrangement.getTopCrates();
}


interface Stack {
    index: number
    crates: string[]
}

interface Movement {
    from: number
    to: number
    count: number
}

abstract class Rearrangement {
    constructor(public stacks: Stack[], protected movements: Movement[]) { }

    abstract makeRearrangement(): void

    getTopCrates() {
        return this.stacks.map(s => s.crates[s.crates.length - 1]).join("");
    }


    protected findStack(index: number): Stack | undefined {
        return this.stacks.find(s => s.index === index);
    }
}

class UnorderedRearrangement extends Rearrangement {
    makeRearrangement(): void {
        for (const movement of this.movements) {
            const fromStack = this.findStack(movement.from);
            const toStack = this.findStack(movement.to);
            for (let i = 0; i < movement.count; i++) {
                const crate = fromStack?.crates.pop();
                if (toStack && crate) {
                    toStack.crates.push(crate)
                }
            }
        }
    }
}

class OrderedRearrangement extends Rearrangement {
    makeRearrangement(): void {
        for (const movement of this.movements) {
            const fromStack = this.findStack(movement.from);
            const toStack = this.findStack(movement.to);
            const removedCrates = fromStack?.crates.splice(-movement.count);
            if (removedCrates) {
                toStack?.crates.push(...removedCrates);
            }
        }
    }
}


/**
 * Parse data from input to create associated stacks and movements
 * @param input 
 */
function initStacksAndMovements(input: string): { stacks: Stack[], movements: Movement[] } {
    // stacks and movements are separated by two line break
    const [stacksInput, movementsInput] = input.split("\n\n");
    // Each movement describe the origin stack, the destination stack and the number of item to take
    const movements: Movement[] = movementsInput.split("\n").map(line => {
        const movementInfo = line.split(" ");
        return {
            from: parseInt(movementInfo[3]),
            to: parseInt(movementInfo[5]),
            count: parseInt(movementInfo[1])
        }
    });

    const allStackLines = stacksInput.split("\n");
    // The last stack lines represents the stacks number
    const stackLinesNumber = allStackLines.pop()?.split("  ").map(l => l.trim()) ?? [];
    const stacks: Stack[] = stackLinesNumber.map(num => {
        return {
            index: parseInt(num),
            crates: []
        }
    });
    const stackLines = allStackLines.reverse();
    for (const stackLine of stackLines) {
        // Each line can be split by group of 4 characters. If the first character is a "[", so the stack is filled with a crate.
        for (let stackIndex = 0; stackIndex < stackLine.length; stackIndex += 4) {
            if (stackLine[stackIndex] === "[") {
                // There is a crate, otherwise it would be a space
                const stack = stacks[stackIndex / 4];
                stack.crates.push(stackLine[stackIndex + 1]);
            }
        }
    }
    return { stacks, movements };
}