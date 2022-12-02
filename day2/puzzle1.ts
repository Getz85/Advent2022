import {getResult, getHand, OpponentEntry, PlayerEntry} from "./common";

function computePoints(opponentEntry: OpponentEntry, playerEntry: PlayerEntry) {
    const playerHand = getHand(playerEntry);
    const opponentHand = getHand(opponentEntry);
    return playerHand + getResult(playerHand, opponentHand);
}

export function getRPSScore(input: string) {
    const turns: string[] = input.split("\n");
    return turns.reduce((points, turn) => {
        const [opponentTurn, playerTurn] = turn.split(" ");
        return points + computePoints(opponentTurn as OpponentEntry, playerTurn as PlayerEntry);
    }, 0)
}
