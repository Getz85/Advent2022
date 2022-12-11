/**
 * Day 11 - Puzzle 1 & 2
 * @see https://adventofcode.com/2022/day/11
 * @param input 
 */
export function getMonkeyBusiness(input: string, rounds = 20, monkeyLevelDivision: number | null = 3) {
    const monkeys = initMonkeys(input, monkeyLevelDivision);
    for (let round = 0; round < rounds; round++) {
        for (const monkey of monkeys) {

            monkey.inspect((monkeyId, worryLvl) => {
                const receiverMonkey = monkeys.find(m => m.id === monkeyId);
                if (receiverMonkey) {
                    receiverMonkey.addItem(worryLvl);
                } else {
                    throw new Error(`Monkey ${monkeyId} not found`);
                }
            });
        }
        if (round === 999 || round === 19) {
            console.log(`After round ${round + 1}`);
            monkeys.forEach(m => console.log(`Monkey ${m.id} inspected items ${m.inspections} times`));
        }
    }
    const inspections = monkeys.map(m => m.inspections).sort((a, b) => b - a);
    return inspections[0] * inspections[1];
}

function initMonkeys(input: string, monkeyLevelDivision: number | null): Monkeys {
    const monkeysInput = input.split("\n\n");
    const monkeys: Monkeys = [];
    for (const monkeyInput of monkeysInput) {
        monkeys.push(new Monkey(monkeyInput, monkeyLevelDivision));
    }
    return monkeys;
}

class Monkey {
    protected _id: number;
    protected _items: number[];
    protected operation: (old: number) => number
    protected test: (worryLvl: number) => number
    protected _inspectionsCount = 0;
    /**
     * 
     * @param monkeyInput Input as string
     * @example 
     * Monkey 0:
     *   Starting items: 79, 98
     *   Operation: new = old * 19
     *   Test: divisible by 23
     *     If true: throw to monkey 2
     *     If false: throw to monkey 3
     */
    constructor(monkeyInput: string, protected monkeyLevelDivision: number | null) {
        const lines = monkeyInput.split("\n");
        this._id = parseInt(lines[0].substring(7).replace(":", ""));
        this._items = lines[1].substring(18).split(",").map(i => parseInt(i));
        this.operation = (old) => {
            const oldOrValue = (v: string) => v === "old" ? old : parseInt(v);
            const [l, operator, r] = lines[2].substring(19).split(" ");
            const left = oldOrValue(l);
            const right = oldOrValue(r);
            try {
            switch (operator) {
                case "+":
                    return left + right;
                case "*":
                    return left * right;
                case "-":
                    return left - right;
                case "/":
                    return left / right;
                default:
                    throw new Error(`Unknown operator ${operator}`)
            }
        } catch(err) {
            console.error(err, left, right);
            throw err;
        }
        };
        const divisible = parseInt(lines[3].substring(21));
        const trueCondition = parseInt(lines[4].substring(29));
        const falseCondition = parseInt(lines[5].substring(30));
        this.test = (worryLvl) => worryLvl % divisible === 0 ? trueCondition : falseCondition;
    }

    get id() {
        return this._id;
    }

    get items() {
        return this._items;
    }

    get inspections() {
        return this._inspectionsCount;
    }

    inspect(throwToMonkey: (monkeyId: number, worryLvl: number) => void) {
        while (this._items.length > 0) {
            const item = this._items[0];
            this._inspectionsCount++;
            // console.log(`Monkey ${this._id} inspects an item with a worry level of ${item}.`);
            let worryLvl = this.operation(item);
            if (worryLvl === Infinity) {
                //TODO Part 2 : What to do here...
                throw new Error("Operation overflows");
            }
            // console.log(`Worry level goes to ${worryLvl}`);
            if (this.monkeyLevelDivision) {
                worryLvl = Math.floor(Number(worryLvl) / this.monkeyLevelDivision);
            }
            // console.log(`Monkey gets bored with item. Worry level is divided by 3 to ${worryLvl}.`);
            const monkeyId = this.test(worryLvl);
            // console.log(`Item with worry level ${worryLvl} is thrown to monkey ${monkeyId}.`)
            throwToMonkey(monkeyId, worryLvl);
            this._items.splice(0, 1);
        }
    }

    addItem(item: number) {
        this._items.push(item);
    }
}

type Monkeys = Array<Monkey>;