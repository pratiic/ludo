import { gamePlayingColors } from "./gamePlayingColors.js";
import { players } from "./players.js";

export function getLastPlayer() {
	for (let i = 0; i < gamePlayingColors.length; i++) {
		if (
			players[gamePlayingColors[i]].is === true &&
			players[gamePlayingColors[i]].finishedAllPlayers === false
		) {
			return gamePlayingColors[i];
		}
	}
}
