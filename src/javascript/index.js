console.clear();

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
		start: "spot2",
		finish: "spot44",
		next: "green",
	},

	green: {
		start: "spot13",
		finish: "spot11",
		next: "orange",
	},

	blue: {
		start: "spot35",
		finish: "spot33",
		next: "red",
	},

	orange: {
		start: "spot24",
		finish: "spot22",
		next: "blue",
	},
};

let currentTurn;

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

elements.safeBrackets.forEach((bracket) => {
	bracket.innerText = "x";
});

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

function rollTheDice(turn) {
	let faceId = generateRandomFaceId();
	let currentTurnPlayers = elements[`${currentTurn}Players`];

	showAnimation();

	setTimeout(function () {
		setFace(faceId);

		hideAnimation();

		let faceValue = document.getElementById(faceId).children.length;

		if (faceValue === 6) {
			currentTurnPlayers.forEach((player) => {
				glow(player);

				currentTurnPlayers.forEach((player) => {
					player.addEventListener("click", () => {
						stopGlowing(currentTurnPlayers);
						setTurn(players[turn].next);
					});
				});
			});
		} else {
			setTurn(players[turn].next);
		}
	}, 900);
}

function glow(player) {
	player.classList.add("glow");
}

function stopGlowing(players) {
	players.forEach((player) => {
		player.classList.remove("glow");
	});
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
