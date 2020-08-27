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

let diceRolled = 0;

rollTheDice();

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
		rollTheDice();
	}
});

function rollTheDice() {
	let faceId = `face${Math.ceil(Math.random() * 6)}`;

	if (diceRolled !== 0) {
		showAnimation();
	}

	setTimeout(function () {
		elements.faces.forEach((face) => {
			if (face.id === faceId) {
				face.classList.add("turn");
				face.classList.remove("hide");
			} else {
				face.classList.add("hide");
				face.classList.remove("turn");
			}
		});

		hideAnimation();
	}, 900);

	diceRolled++;
}

function showAnimation() {
	elements.dice.style.animation = ` diceRollAnimation 300ms ease-in 3  `;
}

function hideAnimation() {
	elements.dice.style.animation = "none";
}
