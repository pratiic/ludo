import { selectedColors } from "./index.js";
import { players } from "./players.js";
import { userNames } from "./usernames.js";
import { gamePlayingColors } from "./gamePlayingColors.js";
import { setTheDice } from "./setTheDice.js";
import { setTurn } from "./setTurn.js";

export function setBoard() {
	//for all the colors the user has selected,
	//their is property is made tru
	//meaning they are made a part of the game
	selectedColors.forEach((color) => {
		players[color].is = true;
		players[color].userName = userNames[color];
	});

	//the names given in the players info modal are placed on respective tags
	document.querySelectorAll(".name-tag").forEach((nameTag) => {
		nameTag.innerText = players[nameTag.id].userName;
	});

	//for all the colors that are not selected by the user
	//the color house associated with them are cleared out
	//also the name tag is removed
	gamePlayingColors.forEach((color) => {
		if (!players[color].is) {
			Array.from(
				document.querySelector(`.color-house-${color}-player`).children
			).forEach((child) => {
				if (child.classList.contains("room")) {
					child.children[0].classList.add("hide");
				}
				if (child.classList.contains("name-tag")) {
					child.remove();
				}
			});
		}
	});

	//the turn is set for the first time
	setTurn("red");

	//the dice is set for the first time
	setTheDice();
}
