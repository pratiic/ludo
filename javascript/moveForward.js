//it moves the clicked player forward
import { playerMove, playerHome } from "./sounds.js";
import { faceValue, currentBracketId, setHome, home, cut } from "./index.js";
import { getBracketIdNum, getNextBracketId } from "./bracketId.js";
import { currentTurn, setTurn } from "./setTurn.js";
import { players } from "./players.js";
import { movePlayerToBracketId } from "./movePlayerToBracketId.js";
import { showGameOverModal } from "./gameOverModal.js";
import { checkEachBracket } from "./checkEachBracket.js";

export function moveForward(player) {
	playerMove.play();

	for (let i = 0; i < faceValue; i++) {
		let currentBracketIdNum = getBracketIdNum(currentBracketId);

		let nextBracketId;

		nextBracketId = getNextBracketId(currentBracketIdNum);

		if (nextBracketId === "bracket45" && currentTurn !== "red") {
			nextBracketId = `bracket${faceValue - i}`;
			movePlayerToBracketId(player, nextBracketId);
			break;
		}

		if (nextBracketId === `${players[currentTurn].nextToFinish}`) {
			let homeStartBracketIdNum = getBracketIdNum(
				players[currentTurn].homeStart
			);
			nextBracketId = `bracket${
				homeStartBracketIdNum + (faceValue - i - 1)
			}`;
			movePlayerToBracketId(player, nextBracketId);
			break;
		}

		if (nextBracketId === `${players[currentTurn].home}`) {
			nextBracketId = players[currentTurn].home;
			movePlayerToBracketId(player, nextBracketId);

			setHome(true);

			let homePlayer = document.getElementById(player.id);

			players[currentTurn].homePlayers = [
				...players[currentTurn].homePlayers,
				homePlayer,
			];

			homePlayer.classList.add("home");

			let homePlayerColorHouse = document.querySelector(
				`.color-house-${currentTurn}-player`
			);

			homePlayerColorHouse.classList.add("home");

			playerHome.play();

			if (players[currentTurn].homePlayers.length === 4) {
				showGameOverModal();
			}

			setTimeout(function () {
				homePlayer.classList.remove("home");
				homePlayerColorHouse.classList.remove("home");
			}, 1500);

			document
				.getElementById(`${player.id}`)
				.classList.remove("outside-player");
			break;
		}

		movePlayerToBracketId(player, nextBracketId);
	}

	checkEachBracket();

	if (faceValue !== 6 && home !== true && cut !== true) {
		setTurn(players[currentTurn].next);
	}
}
