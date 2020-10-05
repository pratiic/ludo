import { getBracketIdNum } from "./bracketId.js";
import { currentTurn } from "./setTurn.js";
import { players } from "./players.js";
import { faceValue, currentGlowingPlayers } from "./index.js";

//it makes the currentTurnPlayers glow
export function glow(player) {
	let playerBracketId = player.parentNode.id;
	let playerBracketIdNum = getBracketIdNum(playerBracketId);
	let playerHomeBracketIdNum = getBracketIdNum(players[currentTurn].home);

	if (playerBracketIdNum + faceValue <= playerHomeBracketIdNum) {
		player.classList.add("glow");
		currentGlowingPlayers.push(player);
	}
}

//it stops the glowing of all currentTurnPlayers
export function stopGlowing(players) {
	players.forEach((player) => {
		player.classList.remove("glow");
	});
}
