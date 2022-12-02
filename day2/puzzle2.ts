import {getHand, getResult, Hand, OpponentEntry, PlayerEntry} from "./common";

function getVariantHand(playerEntry: PlayerEntry, opponentHand: Hand): Hand {
    if (playerEntry === "Y") {
        return opponentHand;
    } else if (playerEntry === "X") {
        const hand = opponentHand - 1;
        if (hand === 0) {
            return Hand.Scissors;
        }
        return hand;
    } else {
        const hand = opponentHand + 1;
        if (hand === 4) {
            return Hand.Rock;
        }
        return hand;
    }
}
function computePoints(opponentEntry: OpponentEntry, playerEntry: PlayerEntry) {
    const opponentHand = getHand(opponentEntry);
    const playerHand = getVariantHand(playerEntry, opponentHand);
    return playerHand + getResult(playerHand, opponentHand);
}

export function getRPSVariantScore(input: string) {
    const turns: string[] = input.split("\n");
    return turns.reduce((points, turn) => {
        const [opponentTurn, playerTurn] = turn.split(" ");
        return points + computePoints(opponentTurn as OpponentEntry, playerTurn as PlayerEntry);
    }, 0)
}
