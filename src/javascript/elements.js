export let elements = {
	gameBoard: document.querySelector(".game-board"),

	colorHouses: document.querySelectorAll(".color-house"),

	redRooms: document.querySelectorAll(".red-room"),
	greenRooms: document.querySelectorAll(".green-room"),
	blueRooms: document.querySelectorAll(".bleu-room"),
	orangeRooms: document.querySelectorAll(".orange-room"),

	tracks: document.querySelectorAll(".tracks"),
	tracksHorizontal: document.querySelectorAll(".tracks-horizontal"),
	tracksVertical: document.querySelectorAll(".tracks-vertical"),
	tracksHorizontalIndividual: document.querySelectorAll(".track-horizontal"),
	tracksVerticalIndividual: document.querySelectorAll(".track-vertical"),
	tracksIndividual: document.querySelectorAll(".track"),

	brackets: document.querySelectorAll(".bracket"),
	safeBrackets: document.querySelectorAll(".safe-bracket"),

	dice: document.querySelector(".dice"),
	faces: document.querySelectorAll(".face"),

	turnTags: document.querySelectorAll(".turn-tag"),

	redPlayers: document.querySelectorAll(".red-player"),
	greenPlayers: document.querySelectorAll(".green-player"),
	bluePlayers: document.querySelectorAll(".blue-player"),
	orangePlayers: document.querySelectorAll(".orange-player"),
	players: document.querySelectorAll(".player"),
	inHousePlayers: document.querySelectorAll(".in-house-player"),

	redHome: document.querySelector(".red-color-home"),
	greenHome: document.querySelector(".green-color-home"),
	orangeHome: document.querySelector(".orange-color-home"),
	blueHome: document.querySelector(".blue-color-home"),

	gameOverModal: document.querySelector(".gameover-modal"),
	gameOverModalBody: document.querySelector(".gameover-modal-body"),

	resetButton: document.querySelector(".reset-button"),
	keepPlayingButton: document.querySelector(".keep-playing-button"),
};
