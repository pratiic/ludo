export function getBracketIdNum(bracketId) {
	let currentBracketIdArr = bracketId.split("");
	let currentBracketIdNumArr = currentBracketIdArr.filter((ele) => {
		if (Number(ele) === Number(ele)) {
			return ele;
		}
	});
	return Number(currentBracketIdNumArr.join(""));
}

export function getNextBracketId(bracketId) {
	return `bracket${bracketId + 1}`;
}
