//this object contains the details about each of the players

export let players = {
	red: {
		//where the game for this player starts
		start: "bracket2",
		//the bracket before its home path
		finish: "bracket44",
		next: "green",
		previous: "blue",
		//starting bracket of its home path
		homeStart: "bracket45",
		//ending bracket of its home path
		nextToFinish: "bracket1",
		//its home bracket
		home: "bracket49",
		//it contains how many players have made it to the home bracket
		homePlayers: [],
		//indicates whether all players have made it to the home bracket
		finishedAllPlayers: false,
		//whether this color was chosen by the user as one of the players
		is: false,
		//the username of the player
		userName: "",
	},

	green: {
		start: "bracket13",
		finish: "bracket11",
		next: "orange",
		previous: "red",
		homeStart: "bracket50",
		nextToFinish: "bracket12",
		home: "bracket54",
		homePlayers: [],
		finishedAllPlayers: false,
		is: false,
		userName: "",
	},

	orange: {
		start: "bracket24",
		finish: "bracket22",
		next: "blue",
		previous: "green",
		homeStart: "bracket55",
		nextToFinish: "bracket23",
		home: "bracket59",
		homePlayers: [],
		finishedAllPlayers: false,
		is: false,
		userName: "",
	},

	blue: {
		start: "bracket35",
		finish: "bracket33",
		next: "red",
		previous: "orange",
		homeStart: "bracket60",
		nextToFinish: "bracket34",
		home: "bracket64",
		homePlayers: [],
		finishedAllPlayers: false,
		is: false,
		userName: "",
	},
};
