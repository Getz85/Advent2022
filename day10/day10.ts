/**
 * Day 10 - Puzzle 1
 * @see https://adventofcode.com/2022/day/10
 * @param input 
 * @param cycles The list of cycles where measurements must be made
 */
export function getSignalStrength(input: string, cycles: number[]): number {
    const commandLines = input.split("\n");
    let x = 1;
    let currentCycle = 0;
    const xValueByCycle: Record<number, number> = {};
    for (let commandLine of commandLines) {
        currentCycle++;
        registerXValueIfNeeded(currentCycle, cycles, xValueByCycle, x);
        const [cmd, arg] = commandLine.split(" ");
        if (cmd === "addx") {
            // addx needs two cycles to execute
            currentCycle ++;
            registerXValueIfNeeded(currentCycle, cycles, xValueByCycle, x);
            // The addition is set at the end of the second cycle
            x += parseInt(arg);
        }
    }
    // The signal strength is the sum of the multiplication of the x measure and the cycle number
    return Object.entries(xValueByCycle).reduce((count, [cycle, x]) => count + parseInt(cycle) * x, 0);
}

/**
 * Add the measure of x to the object xValueByCycle if the cycle is in the cycles
 * @param cycle 
 * @param cycles 
 * @param xValueByCycle 
 * @param x 
 */
function registerXValueIfNeeded(cycle: number, cycles: number[], xValueByCycle: Record<number, number>, x: number) {
    if (cycles.includes(cycle)) {
        xValueByCycle[cycle] = x;
    }
}

/**
 * * Day 10 - Puzzle 2
 * @param input 
 * @param screenWidth 
 */
export function getCRTOutput(input: string, screenWidth = 40) {
    const commandLines = input.split("\n");
    let x = 1;
    let currentCycle = 0;
    let chars = "";
    for (let commandLine of commandLines) {
        currentCycle++;
        chars += getPixelOutput(currentCycle, screenWidth, x);
        const [cmd, arg] = commandLine.split(" ");
        if (cmd === "addx") {
            // addx needs two cycles to execute
            currentCycle++;
            chars += getPixelOutput(currentCycle, screenWidth, x);
            // The addition is set at the end of the second cycle
            x += parseInt(arg);
        }
    }
    // Draw the real crt ouput
    const output = [];
    for (let i = 0; i < chars.length; i += screenWidth) {
        output.push(chars.slice(i, i + screenWidth));
    }
    return output.join("\n");
}

/**
 * Returns the pixel to display
 * @param cycle 
 * @param screenWidth 
 * @param spritePosition 
 * @returns 
 */
function getPixelOutput(cycle: number, screenWidth: number, spritePosition: number) {
    return isPixelDisplayed(cycle, screenWidth, spritePosition) ? "#" : ".";
}

/**
 * Check if the pixel is displayed.
 * @param cycle
 * @param screenWidth 
 * @param spritePosition 
 * @returns 
 */
function isPixelDisplayed(cycle: number, screenWidth: number, spritePosition: number) {
    // The x position is determined from the cycle and the screenWidth: 
    // By example: for a screenWidth of 40, the xPosition is 1 in the 41th cycle
    const xPosition = (cycle - 1) % screenWidth;
    // The sprite is 3 pixel wide
    const minX = spritePosition - 1;
    const maxX = spritePosition + 1;
    // At least one pixel of the sprite is visible on the x position
    return minX <= xPosition && maxX >= xPosition;
}