export function sendPlayerToHouse(player, room) {
	player.classList.remove("outside-player");
	room.innerHTML += `<div class = "${String(
		player.classList
	)} in-house-player" id = "${player.id}"></div>`;
	player.remove();
}
