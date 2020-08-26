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

elements.safeBrackets.forEach((bracket) => {
	bracket.innerText = "x";
});

elements.brackets.forEach((bracket) => {
	if (!bracket.classList.contains("safe-bracket")) {
		bracket.innerText = "";
	}
});
