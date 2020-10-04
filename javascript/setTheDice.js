import { generateRandomFaceId, setFace } from "./index.js";
import { elements } from "./elements.js";
import { colors } from "./colors.js";

//sets the dice to a random face
export function setTheDice() {
	let faceId = generateRandomFaceId();

	setFace(faceId);
}

//it sets the color of the dice of that of the currentTurn
export function setDiceColor(currentTurn) {
	elements.dice.style.backgroundColor = colors[currentTurn];
}
