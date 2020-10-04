import { elements } from "./elements.js";
import { numberOfPlayers } from "./index.js";

export function showPlayersSelectModal() {
	elements.playersSelect.classList.remove("hide");
}

export function hidePlayersSelectModal() {
	elements.playersSelect.classList.add("hide");
}

export function showPlayersInfoModal() {
	elements.playersInfo.classList.remove("hide");

	let userRows = Array.from(elements.playersInfo.children).filter((child) => {
		if (child.classList.contains("user-row")) {
			return child;
		}
	});

	for (let i = numberOfPlayers; i < 4; i++) {
		userRows[i].classList.add("hide");
	}
}

export function unSelectOthers(selected, message) {
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
