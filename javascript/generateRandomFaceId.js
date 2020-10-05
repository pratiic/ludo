//it generates a random faceId for the dice
export function generateRandomFaceId() {
	let faceId = `face${Math.ceil(Math.random() * 6)}`;
	return faceId;
}
