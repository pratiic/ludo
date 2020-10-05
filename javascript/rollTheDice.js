import { generateRandomFaceId } from "./generateRandomFaceId.js";
import {
	currentTurnPlayers,
	setCurrentTurnPlayers,
	setCut,
	setHome,
	setFaceValue,
	faceValue,
	currentGlowingPlayers,
} from "./index.js";
import { diceRoll, sixRolled } from "./sounds.js";
import { setTurn, currentTurn } from "./setTurn.js";
import { setFace } from "./setTheDice.js";
import { glow } from "./glow.js";
import { players } from "./players.js";
import { showDiceAnimation, hideDiceAnimation } from "./diceAnimations.js";

//rolls the dice to a random face
export function rollTheDice(currentTurn) {
	let faceId = generateRandomFaceId();

	setCurrentTurnPlayers();

	setHome(false);

	setCut(false);

	diceRoll.play();

	let currentInHousePlayers = Array.from(currentTurnPlayers).filter(
		(player) => {
			if (player.classList.contains(`${currentTurn}-player`)) {
				return player;
			}
		}
	);

	showDiceAnimation();

	setTimeout(function () {
		setFace(faceId);

		hideDiceAnimation();

		setFaceValue(document.getElementById(faceId).children.length);

		if (faceValue === 6) {
			sixRolled.play();

			currentTurnPlayers.forEach((player) => {
				glow(player);
			});
		} else {
			let currentOutsidePlayers = document.querySelectorAll(
				`.outside-player.${currentTurn}-player`
			);
			if (currentOutsidePlayers.length > 0) {
				Array.from(currentOutsidePlayers).forEach((player) => {
					glow(player);
				});

				if (currentGlowingPlayers.length === 0) {
					setTurn(players[currentTurn].next);
				}
			} else {
				setTurn(players[currentTurn].next);
			}
		}
	}, 900);
}
