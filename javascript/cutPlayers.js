import { setCut } from "./index.js";
import { playerCut } from "./sounds.js";
import { checkEachBracket } from "./checkEachBracket.js";
import { sendPlayerToHouse } from "./sendPlayerToHouse.js";

export function cutPlayers(players) {
	let cuttingPlayer = players[players.length - 1];
	let cutPlayers = [];
	for (let i = 0; i < players.length - 1; i++) {
		if (!players[i].classList.contains(`${cuttingPlayer.classList[1]}`)) {
			cutPlayers.push(players[i]);
		}
	}

	cutPlayers.forEach((player) => {
		let colorHouse = document.querySelector(
			`.color-house-${player.classList[1]}`
		);
		let colorHouseRooms = colorHouse.children;
		let emptyHouseRooms = [];

		Array.from(colorHouseRooms).forEach((room) => {
			if (room.classList.contains("room") && room.children.length === 0) {
				emptyHouseRooms.push(room);
			}
		});

		let room = emptyHouseRooms[0];

		room.parentNode.classList.add("cut");

		player.classList.add("cut");

		setCut(true);

		playerCut.play();

		setTimeout(function () {
			room.parentNode.classList.remove("cut");
			player.classList.remove("cut");
			sendPlayerToHouse(player, room);
			checkEachBracket("overlap");
		}, 1500);
	});
}
