import { changeTurnTag } from "./changeTurnTag.js";
import { players } from "./players.js";
import { getLastPlayer } from "./getLastPlayer.js";
import { currentTurn } from "./setTurn.js";
import { elements } from "./elements.js";
import { numberOfPlayers } from "./index.js";

//these specify who won, who came second and so on
let winner, secondPlace, thirdPlace;

export function showGameOverModal() {
	let finishingPlayerTurnTag = document.querySelector(
		`.${currentTurn}-turn-tag`
	);

	if (!winner) {
		elements.gameOverModalBody.querySelector(
			".message"
		).innerHTML += `<p class = "message-winner">winner: <span class = "${currentTurn}">${currentTurn}</span></p>`;

		winner = currentTurn;

		changeTurnTag(finishingPlayerTurnTag, "winner");

		players[currentTurn].finishedAllPlayers = true;
	} else if (winner && !secondPlace) {
		elements.gameOverModalBody.querySelector(
			".message"
		).innerHTML += `<p class = "message-second-place">second place: <span class = "${currentTurn}">${currentTurn}</span></p>`;

		secondPlace = currentTurn;

		changeTurnTag(finishingPlayerTurnTag, "second place");

		players[currentTurn].finishedAllPlayers = true;
	} else if (winner && secondPlace && !thirdPlace) {
		elements.gameOverModalBody.querySelector(
			".message"
		).innerHTML += `<p class = "message-third-place">third place: <span class = "${currentTurn}">${currentTurn}</span></p>`;

		thirdPlace = currentTurn;

		changeTurnTag(finishingPlayerTurnTag, "third place");

		players[currentTurn].finishedAllPlayers = true;
	}

	let lastPlayer = getLastPlayer();

	let lastPlayerTurnTag = document.querySelector(`.${lastPlayer}-turn-tag`);

	if (numberOfPlayers === 4) {
		if (winner && secondPlace && thirdPlace) {
			elements.gameOverModalBody.querySelector(
				".message"
			).innerHTML += `<p class = "message-fourth-place">fourth place: <span class = "${lastPlayer}">${lastPlayer}</span></p>`;

			changeTurnTag(lastPlayerTurnTag, "fourth place");

			elements.keepPlayingButton.remove();
		}
	} else if (numberOfPlayers === 3) {
		if (winner && secondPlace) {
			elements.gameOverModalBody.querySelector(
				".message"
			).innerHTML += `<p class = "message-third-place">third place: <span class = "${lastPlayer}">${lastPlayer}</span></p>`;

			changeTurnTag(lastPlayerTurnTag, "third place");

			elements.keepPlayingButton.remove();
		}
	} else if (numberOfPlayers === 2) {
		if (winner) {
			elements.gameOverModalBody.querySelector(
				".message"
			).innerHTML += `<p class = "message-second-place">second place: <span class = "${lastPlayer}">${lastPlayer}</span></p>`;

			changeTurnTag(lastPlayerTurnTag, "second place");

			elements.keepPlayingButton.remove();
		}
	}

	setTimeout(function () {
		elements.gameOverModal.classList.add("show");
	}, 1300);
}

export function hideGameOverModal() {
	elements.gameOverModal.classList.remove("show");
}
