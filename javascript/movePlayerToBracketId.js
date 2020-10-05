import { playerMove } from "./sounds.js";
import { setCurrentBracketId } from "./index.js";
import { checkEachBracket } from "./checkEachBracket.js";

//it moves the clicked player to the bracket of the id
export function movePlayerToBracketId(player, nextBracketId) {
	if (player.classList.contains("in-house-player")) {
		player.classList.remove("in-house-player");
		player.classList.add("outside-player");
		playerMove.play();
	}

	let playerClass = String(player.classList);
	let playerId = player.id;

	let bracket = document.getElementById(nextBracketId);

	document.getElementById(playerId).remove();

	bracket.innerHTML += ` <div class="${playerClass}" id=${playerId}></div> `;

	setCurrentBracketId(bracket.id);

	checkEachBracket("overlap");
}
