import { elements } from "./elements.js";
import { players } from "./players.js";
import { userNames } from "./usernames.js";
import {
	showPlayersSelectModal,
	showPlayersInfoModal,
	unSelectOthers,
} from "./gameStartModals.js";
import { setBoard } from "./startGame.js";
import { currentTurn, setTurn } from "./setTurn.js";
import {
	firstModalAnimation,
	secondModalAnimation,
	modalExitAnimation,
} from "./modalAnimations.js";
import { rollTheDice } from "./rollTheDice.js";
import { stopGlowing } from "./glow.js";
import { moveForward } from "./moveForward.js";
import { movePlayerToBracketId } from "./movePlayerToBracketId.js";
import { hideGameOverModal } from "./gameOverModal.js";

//specifies the players in the current turn
export let currentTurnPlayers;

//the value given by the dice
export let faceValue;

//the id of the bracket that the current player is in
export let currentBracketId;

export function setCurrentBracketId(bracketId) {
	currentBracketId = bracketId;
}

//it specifies which players can be moved
export let currentGlowingPlayers = [];

//these are for changing the turn
//if a home or cut has been made recently,
//the turn does not change

export let home, cut;

/* 

	below this are the variables for when different menus are shown to
	the user to choose from
	
*/

//specifies how many players the user chose
export let numberOfPlayers;

//specifies what colors the user chose for the players
export let selectedColors = [];

/* ----------
	here the modals for different game menu start to be displayed
	--------- */

//the first modal that shows options to choose the number of players is displayed
showPlayersSelectModal();

//the animation for the first modal is shown
firstModalAnimation();

//playersOptions is a row that contains different options for
//the number of players
elements.playersOptions.addEventListener("click", (event) => {
	//if one of the options for the number of players is clicked
	if (event.target.classList.contains("player-option")) {
		event.target.classList.add("selected");

		numberOfPlayers = Number(event.target.innerText);

		//when one option is selected, all others are unselected
		unSelectOthers(event.target, "modal one");
	}
});

//when the next button on the first modal is clicked
elements.nextButton.addEventListener("click", () => {
	//if one of the options has been selected
	if (numberOfPlayers) {
		//show the second modal
		showPlayersInfoModal();

		//the animation for the second modal is shown and also hides the first modal
		secondModalAnimation();
	}
});

//when the user selects colors for each of the players
elements.playersInfo.addEventListener("click", (event) => {
	if (event.target.classList.contains("user-color")) {
		event.target.classList.add("selected");
		//other colors are unselected
		unSelectOthers(event.target, "modal two");
	}
});

elements.playButton.addEventListener("click", () => {
	let userColors = document.querySelectorAll(".user-color");
	userColors.forEach((userColor) => {
		if (userColor.classList.contains("selected")) {
			userNames[userColor.innerText] =
				userColor.parentNode.parentNode.children[0].value;
			selectedColors.push(userColor.innerText);
		}
	});

	if (selectedColors.length >= numberOfPlayers) {
		//the animation of modal exit is shown here
		modalExitAnimation();
		/* 
			---------
			here the actual game starts
			the board is set according to the user's choices
			the game begins
			---------
		*/

		//this is the function that does above mentioned things
		setBoard();
	}
});

// elements.safeBrackets.forEach((bracket) => {
// 	bracket.innerText = "x";
// });

elements.brackets.forEach((bracket) => {
	if (!bracket.classList.contains("safe-bracket")) {
		bracket.innerText = "";
	}
});

//event listener to listen for clicking of the dice
elements.dice.addEventListener("click", (event) => {
	//if one of the faces of the dice is clicked and
	//or if one of the points on the face of dice is clicked
	//and there are not still active players from the previous roll
	if (
		(event.target.classList.contains("face") ||
			event.target.classList.contains("point")) &&
		currentGlowingPlayers.length === 0
	) {
		rollTheDice(currentTurn);
	}
});

export function setCurrentTurnPlayers() {
	currentTurnPlayers = document.querySelectorAll(`.${currentTurn}-player`);
}

export function setHome(val) {
	home = val;
}

export function setCut(val) {
	cut = val;
}

export function setFaceValue(val) {
	faceValue = val;
}

//event listener for when the user clickes one of the glowing currentTurn players
elements.gameBoard.addEventListener("click", (event) => {
	if (event.target.classList.contains("glow")) {
		stopGlowing(document.querySelectorAll(".player"));

		currentGlowingPlayers = [];

		currentBracketId = event.target.parentNode.id;

		if (event.target.classList.contains("in-house-player")) {
			movePlayerToBracketId(event.target, players[currentTurn].start);
		} else {
			moveForward(event.target);
		}
	}
});

elements.resetButton.addEventListener("click", () => {
	location.reload();
});

elements.keepPlayingButton.addEventListener("click", () => {
	hideGameOverModal();
	setTurn(players[currentTurn].next);
});
