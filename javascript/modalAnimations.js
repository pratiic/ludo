import { elements } from "./elements.js";

let timeline = gsap.timeline();

export function firstModalAnimation() {
	timeline
		.from(elements.playersSelect, {
			y: 450,
			opacity: 0,
			duration: 1,
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

export function secondModalAnimation() {
	timeline
		.to(elements.playersSelect, {
			scale: 0,
			duration: 0.7,
			ease: "power3.out",
		})
		.from(elements.playersInfo, {
			scale: 0,
			duration: 0.85,
			ease: "power4.out",
		});
}

export function modalExitAnimation() {
	timeline
		.to(elements.playersInfo, {
			y: "-150%",
			duration: 1,
		})
		.to(
			elements.beginGameModalContainer,
			{
				y: "-150%",
				duration: 1,
			},
			"-=0.5"
		);
}
