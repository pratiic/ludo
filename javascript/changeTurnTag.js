export function changeTurnTag(tag, message) {
	tag.innerText = message;
	tag.classList.add("show");
	tag.classList.add("finished");
}
