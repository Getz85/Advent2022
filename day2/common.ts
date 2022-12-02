export type OpponentEntry = "A" | "B" | "C";
export type PlayerEntry = "X" | "Y" | "Z";

export enum Hand {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

export enum Result {
    Lose = 0,
    Draw = 3,
    Victory = 6
}

export function getResult(playerHand: Hand, opponentHand: Hand) {
    if (playerHand === opponentHand) {
        return Result.Draw
    }
    if (playerHand === Hand.Scissors && opponentHand === Hand.Rock) {
        return Result.Lose;
    }
    if (opponentHand === Hand.Scissors && playerHand === Hand.Rock) {
        return Result.Victory;
    }
    if (playerHand > opponentHand) {
        return Result.Victory;
    } else {
        return Result.Lose;
    }
}

export function getHand(hand: OpponentEntry | PlayerEntry): Hand {
    switch (hand) {
        case "A":
        case "X":
            return Hand.Rock;
        case "B":
        case "Y":
            return Hand.Paper;
        case "C":
        case "Z":
            return Hand.Scissors
    }
}