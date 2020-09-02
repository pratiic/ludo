import { elements } from "./elements.js";

let colors = {
	red: "#f23b3b",
	green: "#328b32",
	blue: "#7171bb",
	orange: "#34ea26",
};

let players = {
	red: {
		start: "bracket2",
		finish: "bracket44",
		next: "green",
		previous: "blue",
		homeStart: "bracket45",
		homeEnd: "bracket48",
		nextToFinish: "bracket1",
		home: "bracket49",
		homePlayers: [],
		finishedAllPlayers: false,
		is: false,
		userName: "",
	},

	green: {
		start: "bracket13",
		finish: "bracket11",
		next: "orange",
		previous: "red",
		homeStart: "bracket50",
		homeEnd: "bracket53",
		nextToFinish: "bracket12",
		home: "bracket54",
		homePlayers: [],
		finishedAllPlayers: false,
		is: false,
		userName: "",
	},

	orange: {
		start: "bracket24",
		finish: "bracket22",
		next: "blue",
		previous: "green",
		homeStart: "bracket55",
		homeEnd: "bracket58",
		nextToFinish: "bracket23",
		home: "bracket59",
		homePlayers: [],
		finishedAllPlayers: false,
		is: false,
		userName: "",
	},

	blue: {
		start: "bracket35",
		finish: "bracket33",
		next: "red",
		previous: "orange",
		homeStart: "bracket60",
		homeEnd: "bracket63",
		nextToFinish: "bracket34",
		home: "bracket64",
		homePlayers: [],
		finishedAllPlayers: false,
		is: false,
		userName: "",
	},
};

let gamePlayingColors = ["red", "green", "orange", "blue"];

let userNames = {
	red: "",
	green: "",
	orange: "",
	blue: "",
};

let currentTurn;
let currentTurnPlayers;

let faceValue;

let currentBracketId;

let currentGlowingPlayers = [];

let home;
let cut;

let winner;
let secondPlace;
let thirdPlace;
let fourthPlace;

let numberOfPlayers;

let selectedColors = [];

elements.playersOptions.addEventListener("click", (event) => {
	if (event.target.classList.contains("player-option")) {
		event.target.classList.add("selected");

		numberOfPlayers = Number(event.target.innerText);

		unSelectOthers(event.target, "modal one");
	}
});

function unSelectOthers(selected, message) {
	if (message === "modal one") {
		elements.playerOptions.forEach((option) => {
			if (!(option === selected)) {
				option.classList.remove("selected");
			}
		});
	} else if (message === "modal two") {
		let similarColorOptions = document.querySelectorAll(
			`.${selected.classList[1]}`
		);

		let sameRowColors = selected.parentNode.children;

		let toBeUnSelected = [...similarColorOptions, ...sameRowColors];

		toBeUnSelected.forEach((option) => {
			if (option !== selected) {
				option.classList.remove("selected");
			}
		});
	}
}

elements.nextButton.addEventListener("click", () => {
	if (numberOfPlayers) {
		showPlayersInfo();
		hidePlayersSelect();
	}
});

function showPlayersInfo() {
	elements.playersInfo.classList.add("show");

	let userRows = Array.from(elements.playersInfo.children).filter((child) => {
		if (child.classList.contains("user-row")) {
			return child;
		}
	});

	for (let i = numberOfPlayers; i < 4; i++) {
		userRows[i].classList.add("hide");
	}
}

elements.playersInfo.addEventListener("click", (event) => {
	if (event.target.classList.contains("user-color")) {
		event.target.classList.add("selected");
		unSelectOthers(event.target, "modal two");
	}
});

function hidePlayersSelect() {
	elements.playersSelect.classList.add("hide");
}

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
		document
			.querySelector(".begin-game-modal-container")
			.classList.add("hide");

		//this sets the basic properties of the board
		setBoard();
	}
});

function setBoard() {
	selectedColors.forEach((color) => {
		players[color].is = true;
		players[color].userName = userNames[color];
	});

	document.querySelectorAll(".name-tag").forEach((nameTag) => {
		nameTag.innerText = players[nameTag.id].userName;
	});

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

	//the game starts from red
	currentTurn = "red";

	setTurn(currentTurn);

	setTheDice();

	//movePlayerToBracketId("blueplayer2", "bracket25");
}

//turn is given to whatever color is in currentTurn
function setTurn(turn) {
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

		setDiceColor(currentTurn);
	} else {
		setTurn(players[turn].next);
	}
}

//it sets the color of the dice of that of the currentTurn
function setDiceColor(currentTurn) {
	elements.dice.style.backgroundColor = colors[currentTurn];
}

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

//sets the dice to a random face
function setTheDice() {
	let faceId = generateRandomFaceId();

	setFace(faceId);
}

//it generates a random faceId for the dice
function generateRandomFaceId() {
	let faceId = `face${Math.ceil(Math.random() * 6)}`;
	return faceId;
}

//rolls the dice to a random face
function rollTheDice(currentTurn) {
	let faceId = generateRandomFaceId();
	currentTurnPlayers = document.querySelectorAll(`.${currentTurn}-player`);

	home = false;
	cut = false;

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
					if (currentGlowingPlayers.length === 0) {
						setTurn(players[currentTurn].next);
					}
				});
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
function setFace(faceId) {
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
			moveForward(event.target, currentBracketId);
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
	}

	let playerClass = String(player.classList);
	let playerId = player.id;

	let bracket = document.getElementById(nextBracketId);

	document.getElementById(playerId).remove();
	//player.remove();

	bracket.innerHTML += ` <div class="${playerClass}" id=${playerId}></div> `;

	currentBracketId = bracket.id;

	checkEachBracket("overlap");

	// if (faceValue !== 6 && home !== true && cut !== true) {
	// 	setTurn(players[currentTurn].next);
	// }
}

//it moves the clicked player forward
function moveForward(player) {
	let currentBracketIdNum = getBracketIdNum(currentBracketId);

	for (let i = 0; i < faceValue; i++) {
		let nextBracketId;

		nextBracketId = getNextBracketId(currentBracketIdNum + i);

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

	if (faceValue !== 6 && home !== true) {
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
			} else if (bracket.children.length === 3) {
				bracket.children[0].classList.add("shift-left");
				bracket.children[1].classList.add("shift-right");
				bracket.children[2].classList.add("shift-top");
			} else if (bracket.children.length === 4) {
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

		setTimeout(function () {
			sendPlayerToHouse(player, room);
			checkEachBracket("overlap");
			cut = true;
		}, 700);

		setTimeout(function () {
			room.parentNode.classList.remove("cut");
			player.classList.remove("cut");
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
	} else if (!secondPlace) {
		elements.gameOverModalBody.querySelector(
			".message"
		).innerHTML += `<p class = "message-secondPlace">second place: <span class = "${currentTurn}">${currentTurn}</span></p>`;

		secondPlace = currentTurn;

		changeTurnTag(finishingPlayerTurnTag, "second place");

		players[currentTurn].finishedAllPlayers = true;
	} else if (!thirdPlace) {
		elements.gameOverModalBody.querySelector(
			".message"
		).innerHTML += `<p class = "message-thirdPlace">third place: <span class = "${currentTurn}">${currentTurn}</span></p>`;

		thirdPlace = currentTurn;

		changeTurnTag(finishingPlayerTurnTag, "third place");

		players[currentTurn].finishedAllPlayers = true;
	}

	if (winner && secondPlace && thirdPlace) {
		elements.gameOverModalBody.querySelector(
			".message"
		).innerHTML += `<p class = "message-fourthPlace">fourth place: <span class = "${getLastPlayer()}">${getLastPlayer()}</span></p>`;

		changeTurnTag(finishingPlayerTurnTag, "fourth place");

		elements.keepPlayingButton.remove();
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
		if (players[gamePlayingColors[i]].finishedAllPlayers === false) {
			return gamePlayingColors[i];
		}
	}
}

function changeTurnTag(tag, message) {
	tag.innerText = message;
	tag.classList.add("show");
	tag.classList.add("finished");
}
