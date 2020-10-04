import { elements } from "./elements.js";

let timeline = gsap.timeline();

export function showFirstModal() {
	timeline
		.from(elements.beginGameModal, {
			y: 350,
			opacity: 0,
			duration: 0.75,
			ease: "back.out(1.7)",
		})
		.to(elements.lettersInLudo, {
			y: -20,
			duration: 0.25,
			stagger: 0.1,
			ease: "power3.easeout",
		})
		.to(elements.lettersInLudo, {
			y: 0,
			duration: 0.3,
			ease: "power3.easeout",
		});
}
