import { elements } from "./elements.js";
import { colors } from "./colors.js";
import { players } from "./players.js";
import { gamePlayingColors } from "./gamePlayingColors.js";
import { userNames } from "./usernames.js";
import {
	diceRoll,
	playerCut,
	playerHome,
	playerMove,
	sixRolled,
} from "./sounds.js";
import {
	showPlayersSelectModal,
	hidePlayersSelectModal,
	showPlayersInfoModal,
	unSelectOthers,
} from "./gameStartModals.js";
import { setBoard } from "./startGame.js";
import { currentTurn, setTurn } from "./setTurn.js";
import { showFirstModal } from "./modalAnimations.js";

//specifies the players in the current turn
let currentTurnPlayers;

//the value given by the dice
let faceValue;

//the id of the bracket that the current player is in
let currentBracketId;

//it specifies which players can be moved
let currentGlowingPlayers = [];

//these are for changing the turn
//if a home or cut has been made recently,
//the turn does not change
let home, cut;

//these specify who won, who came second and so on
let winner, secondPlace, thirdPlace;

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
showFirstModal();

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
		//hide the current modal
		hidePlayersSelectModal();
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
		//the modal container is hidden
		//this shows the game board
		document
			.querySelector(".begin-game-modal-container")
			.classList.add("hide");

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
	if (
		(event.target.classList.contains("face") ||
			event.target.classList.contains("point")) &&
		currentGlowingPlayers.length === 0
	) {
		rollTheDice(currentTurn);
	}
});

//it generates a random faceId for the dice
export function generateRandomFaceId() {
	let faceId = `face${Math.ceil(Math.random() * 6)}`;
	return faceId;
}

//rolls the dice to a random face
function rollTheDice(currentTurn) {
	let faceId = generateRandomFaceId();
	currentTurnPlayers = document.querySelectorAll(`.${currentTurn}-player`);

	home = false;
	cut = false;

	diceRoll.play();

	let currentInHousePlayers = Array.from(currentTurnPlayers).filter(
		(player) => {
			if (player.classList.contains(`${currentTurn}-player`)) {
				return player;
			}
		}
	);

	showAnimation();

	setTimeout(function () {
		setFace(faceId);

		hideAnimation();

		faceValue = document.getElementById(faceId).children.length;

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

//it shows the animation of the roll of the dice
function showAnimation() {
	elements.dice.style.animation = ` diceRollAnimation 300ms ease-in 3  `;
}

//it sets the dice to the random number generated by rollTheDice() function
export function setFace(faceId) {
	elements.faces.forEach((face) => {
		if (face.id === faceId) {
			face.classList.add("turn");
			face.classList.remove("hide");
		} else {
			face.classList.add("hide");
			face.classList.remove("turn");
		}
	});
}

//it hides the animation of the roll of the dice
function hideAnimation() {
	elements.dice.style.animation = "none";
}

//it makes the currentTurnPlayers glow
function glow(player) {
	let playerBracketId = player.parentNode.id;
	let playerBracketIdNum = getBracketIdNum(playerBracketId);
	let playerHomeBracketIdNum = getBracketIdNum(players[currentTurn].home);

	if (playerBracketIdNum + faceValue <= playerHomeBracketIdNum) {
		player.classList.add("glow");
		currentGlowingPlayers.push(player);
	}
}

//event listener for when the user clickes one of the glowing currentTurn players
elements.gameBoard.addEventListener("click", (event) => {
	if (event.target.classList.contains("glow")) {
		stopGlowing(document.querySelectorAll(".player"));

		currentBracketId = event.target.parentNode.id;

		if (event.target.classList.contains("in-house-player")) {
			movePlayerToBracketId(event.target, players[currentTurn].start);
		} else {
			moveForward(event.target);
		}
	}
});

//it stops the glowing of all currentTurnPlayers
function stopGlowing(players) {
	players.forEach((player) => {
		player.classList.remove("glow");
	});

	currentGlowingPlayers = [];
}

//it moves the clicked player to the bracket of the id
function movePlayerToBracketId(player, nextBracketId) {
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

	currentBracketId = bracket.id;

	checkEachBracket("overlap");
}

//it moves the clicked player forward
function moveForward(player) {
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
			home = true;

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

function getNextBracketId(bracketId) {
	return `bracket${bracketId + 1}`;
}

function checkEachBracket(message) {
	let brackets = document.querySelectorAll(".bracket");

	brackets.forEach((bracket) => {
		if (bracket.children.length > 1) {
			if (!message) {
				if (!bracket.classList.contains("safe-bracket")) {
					cutPlayers(Array.from(bracket.children));
					//checkEachBracket();
				}
			}

			if (bracket.children.length === 2) {
				bracket.children[0].classList.add("shift-left");
				bracket.children[1].classList.add("shift-right");
			}

			if (bracket.children.length === 3) {
				bracket.children[0].classList.add("shift-left");
				bracket.children[1].classList.add("shift-right");
				bracket.children[2].classList.add("shift-top");
			}

			if (bracket.children.length === 4) {
				bracket.children[0].classList.add("shift-left");
				bracket.children[1].classList.add("shift-right");
				bracket.children[2].classList.add("shift-top");
				bracket.children[3].classList.add("shift-bottom");
			}
		} else {
			Array.from(bracket.children).forEach((child) => {
				child.classList.remove("shift-left");
				child.classList.remove("shift-right");
				child.classList.remove("shift-top");
				child.classList.remove("shift-bottom");
			});
		}
	});
}

function getBracketIdNum(bracketId) {
	let currentBracketIdArr = bracketId.split("");
	let currentBracketIdNumArr = currentBracketIdArr.filter((ele) => {
		if (Number(ele) === Number(ele)) {
			return ele;
		}
	});
	return Number(currentBracketIdNumArr.join(""));
}

function cutPlayers(players) {
	let cuttingPlayer = players[players.length - 1];
	let cutPlayers = [];
	for (let i = 0; i < players.length - 1; i++) {
		if (!players[i].classList.contains(`${cuttingPlayer.classList[1]}`)) {
			cutPlayers.push(players[i]);
		}
	}

	cutPlayers.forEach((player) => {
		let colorHouse = document.querySelector(
			`.color-house-${player.classList[1]}`
		);
		let colorHouseRooms = colorHouse.children;
		let emptyHouseRooms = [];

		Array.from(colorHouseRooms).forEach((room) => {
			if (room.classList.contains("room") && room.children.length === 0) {
				emptyHouseRooms.push(room);
			}
		});

		let room = emptyHouseRooms[0];

		room.parentNode.classList.add("cut");

		player.classList.add("cut");

		cut = true;

		playerCut.play();

		setTimeout(function () {
			room.parentNode.classList.remove("cut");
			player.classList.remove("cut");
			sendPlayerToHouse(player, room);
			checkEachBracket("overlap");
		}, 1500);
	});
}

function sendPlayerToHouse(player, room) {
	// let playerProperties = player.getBoundingClientRect();

	// let roomProperties = room.getBoundingClientRect();

	// let roomX = parseInt(roomProperties.left);
	// let roomY = parseInt(roomProperties.top);
	// let roomHeight = parseInt(roomProperties.height);
	// let roomWidth = parseInt(roomProperties.width);

	// let playerHeight = parseInt(playerProperties.height);
	// let playerWidth = parseInt(playerProperties.width);

	// player.style.top = `${
	// 	roomY + parseInt(roomWidth / 2) - parseInt(playerHeight / 2)
	// }px`;
	// player.style.left = `${
	// 	roomX + parseInt(roomHeight / 2) - parseInt(playerWidth / 2)
	// }px`;

	// player.style.top = `${roomY}px`;
	// player.style.left = `${roomX}px`;

	player.classList.remove("outside-player");
	room.innerHTML += `<div class = "${String(
		player.classList
	)} in-house-player" id = "${player.id}"></div>`;
	player.remove();
}

function showGameOverModal() {
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

elements.resetButton.addEventListener("click", () => {
	location.reload();
});

elements.keepPlayingButton.addEventListener("click", () => {
	elements.gameOverModal.classList.remove("show");
	setTurn(players[currentTurn].next);
});

function getLastPlayer() {
	for (let i = 0; i < gamePlayingColors.length; i++) {
		if (
			players[gamePlayingColors[i]].is === true &&
			players[gamePlayingColors[i]].finishedAllPlayers === false
		) {
			return gamePlayingColors[i];
		}
	}
}

function changeTurnTag(tag, message) {
	tag.innerText = message;
	tag.classList.add("show");
	tag.classList.add("finished");
}
