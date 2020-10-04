import { players } from "./players.js";
import { elements } from "./elements.js";
import { setDiceColor } from "./setTheDice.js";

export let currentTurn;

//turn is given to whatever color is in currentTurn
export function setTurn(turn) {
	if (players[turn].finishedAllPlayers === false && players[turn].is) {
		currentTurn = turn;

		elements.turnTags.forEach((tag) => {
			if (
				tag.classList.contains(`${turn}-turn-tag`) ||
				tag.classList.contains("finished")
			) {
				tag.classList.add("show");
			} else {
				tag.classList.remove("show");
			}
		});
	} else {
		setTurn(players[turn].next);
	}

	setDiceColor(currentTurn);
}
