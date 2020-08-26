import { elements } from "./elements.js";

elements.colorHouses.forEach((colorHouse) => {
	drawRooms(colorHouse);
});

function drawRooms(colorHouse) {
	for (let i = 0; i < 4; i++) {
		colorHouse.innerHTML += ` <div class = "room"></div> `;
	}
}

elements.tracksIndividual.forEach((track) => {
	for (let i = 0; i < 5; i++) {
		track.innerHTML += ` <div class = "bracket"></div> `;
	}
});
