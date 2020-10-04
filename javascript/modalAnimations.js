import { elements } from "./elements.js";

let timeline = gsap.timeline();

export function firstModalAnimation() {
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

export function secondModalAnimation() {
	timeline
		.to(elements.beginGameModal, {
			scale: 0,
			duration: 0.3,
		})
		.to(elements.beginGameModal, {
			scale: 1,
			duration: 0.4,
			ease: "power0.easeNone",
		});
}

export function modalExitAnimation() {
	timeline
		.to(elements.beginGameModal, {
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
