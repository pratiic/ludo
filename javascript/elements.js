//this is an object that contains all the elements of the game

export let elements = {
	beginGameModal: document.querySelector(".begin-game-modal"),
	beginGameModalContainer: document.querySelector(
		".begin-game-modal-container"
	),

	playersOptions: document.querySelector(".players-options"),
	playerOptions: document.querySelectorAll(".player-option"),
	playersSelect: document.querySelector(".players-select"),
	nextButton: document.querySelector(".next-button"),
	playersInfo: document.querySelector(".players-info"),
	players: document.querySelector(".players"),
	playButton: document.querySelector(".play-button"),

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

	nameTags: document.querySelectorAll(".name-tag"),

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

	beginGameModal: document.querySelector(".begin-game-modal"),
};
