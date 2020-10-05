import { elements } from "./elements.js";

//it shows the animation of the roll of the dice
export function showDiceAnimation() {
	elements.dice.style.animation = ` diceRollAnimation 300ms ease-in 3  `;
}

//it hides the animation of the roll of the dice
export function hideDiceAnimation() {
	elements.dice.style.animation = "none";
}
