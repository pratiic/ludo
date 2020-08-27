import { elements } from "./elements.js";

let safeBrackets = [
	"bracket2",
	"bracket8",
	"bracket13",
	"bracket19",
	"bracket24",
	"bracket30",
	"bracket35",
	"bracket41",
];

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
	},

	green: {
		start: "bracket13",
		finish: "bracket11",
		next: "orange",
	},

	orange: {
		start: "bracket24",
		finish: "bracket22",
		next: "blue",
	},

	blue: {
		start: "bracket35",
		finish: "bracket33",
		next: "red",
	},
};

let currentTurn;
let currentTurnPlayers;

setBoard();

function setBoard() {
	currentTurn = "red";

	setTurn(currentTurn);

	setTheDice();

	//elements.dice.style.border = ` 3px solid ${colors[turn]} `;
}

function setTurn(turn) {
	currentTurn = turn;

	elements.turnTags.forEach((tag) => {
		if (tag.classList.contains(`${turn}-turn-tag`)) {
			tag.classList.add("show");
		} else {
			tag.classList.remove("show");
		}
	});

	setDiceColor(currentTurn);
}

// elements.safeBrackets.forEach((bracket) => {
// 	bracket.innerText = "x";
// });

elements.brackets.forEach((bracket) => {
	if (!bracket.classList.contains("safe-bracket")) {
		bracket.innerText = "";
	}
});

elements.dice.addEventListener("click", (event) => {
	if (
		event.target.classList.contains("face") ||
		event.target.classList.contains("point")
	) {
		rollTheDice(currentTurn);
	}
});

function setTheDice() {
	let faceId = generateRandomFaceId();

	setFace(faceId);
}

function rollTheDice(currentTurn) {
	let faceId = generateRandomFaceId();
	currentTurnPlayers = elements[`${currentTurn}Players`];

	showAnimation();

	setTimeout(function () {
		setFace(faceId);

		hideAnimation();

		let faceValue = document.getElementById(faceId).children.length;

		if (faceValue === 6) {
			currentTurnPlayers.forEach((player) => {
				glow(player);
			});
		} else {
			setTurn(players[currentTurn].next);
		}
	}, 900);
}

elements.gameBoard.addEventListener("click", (event) => {
	if (event.target.classList.contains("glow")) {
		stopGlowing(currentTurnPlayers);
		getPlayerOut(event.target);
		setTurn(players[currentTurn].next);
	}
});

function glow(player) {
	player.classList.add("glow");
}

function stopGlowing(players) {
	players.forEach((player) => {
		player.classList.remove("glow");
	});
}

function getPlayerOut(player) {
	let playerClass = String(player.classList);
	let playerId = player.id;
	let bracketId = players[currentTurn].start;
	console.log(bracketId);
	player.remove();
	document.getElementById(
		bracketId
	).innerHTML += ` <div class="${playerClass}" id=${playerId}></div> `;
}

function showAnimation() {
	elements.dice.style.animation = ` diceRollAnimation 300ms ease-in 3  `;
}

function hideAnimation() {
	elements.dice.style.animation = "none";
}

function generateRandomFaceId() {
	let faceId = `face${Math.ceil(Math.random() * 6)}`;
	return faceId;
}

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

function setDiceColor(currentTurn) {
	elements.dice.style.backgroundColor = colors[currentTurn];
}
