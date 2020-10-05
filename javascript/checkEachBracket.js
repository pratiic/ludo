import { cutPlayers } from "./cutPlayers.js";

export function checkEachBracket(message) {
	let brackets = document.querySelectorAll(".bracket");

	brackets.forEach((bracket) => {
		if (bracket.children.length > 1) {
			if (!message) {
				if (!bracket.classList.contains("safe-bracket")) {
					cutPlayers(Array.from(bracket.children));
					//checkEachBracket();
				}
			}

			if (bracket.children.length >= 2) {
				bracket.children[0].classList.add("shift-left");
				bracket.children[1].classList.add("shift-right");
			}

			if (bracket.children.length >= 3) {
				// bracket.children[0].classList.add("shift-left");
				// bracket.children[1].classList.add("shift-right");
				bracket.children[2].classList.add("shift-top");
			}

			if (bracket.children.length >= 4) {
				// bracket.children[0].classList.add("shift-left");
				// bracket.children[1].classList.add("shift-right");
				// bracket.children[2].classList.add("shift-top");
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
