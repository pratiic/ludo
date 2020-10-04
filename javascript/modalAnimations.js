import { elements } from "./elements.js";

let timeline = gsap.timeline();

export function showFirstModal() {
	timeline
		.from(elements.beginGameModal, {
			y: 350,
			opacity: 0,
			duration: 1,
			ease: "power3.out",
		})
		.to(elements.lettersInLudo, {
			y: 0,
			opacity: 1,
			duration: 0.3,
			stagger: 0.2,
			ease: "back.out(3)",
		});
}
