/**
 * Return character priority:
 * a: 1, b: 2, c: 3 ...
 * A: 27, B: 28, C: 29 ...
 * 
 * @param char 
 * @returns 
 */
 export function getCharPriority(char: string) {
    const lowerCaseCode = {
        min: 97,
        max: 122
    };
    const upperCaseCode = {
        min: 65,
        max: 90
    };

    const charCode = char.charCodeAt(0);
    if (isBetween(charCode, lowerCaseCode.min, lowerCaseCode.max)) {
        // a: 1, b: 2, c: 3,...
        return charCode - lowerCaseCode.min + 1;
    }
    if (isBetween(charCode, upperCaseCode.min, upperCaseCode.max)) {
        // A: 27, B: 28, C: 29
        return charCode - upperCaseCode.min + 27;
    }
    return 0;
}

function isBetween(value: number, min: number, max: number) {
    return value >= min && value <= max;
}

/**
 * Find the first common char in strings
 * @param strings
 * @returns 
 */
export function  findFirstCommonCharInStrings(...strings: string[]) {
   const [baseString, ...otherStrings] = strings;
   for (const char of baseString) {
       if (otherStrings.every(str => str.includes(char))) {
           return char;
       }
   }
   return "";
}