import Lenis from '@studio-freight/lenis';

const lenis = new Lenis();

lenis.on('scroll', e => {
	console.log(e);
});

const raf = time => {
	lenis.raf(time);
	requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

let paragaphs = [...document.querySelectorAll('p')];
let spans = [];

paragaphs.forEach(paragaph => {
	let hmtlStrings = '';
	let pArray = paragaph.textContent.split('');

	for (let i = 0; i < pArray.length; i++) {
		hmtlStrings += `<span>${pArray[i]}</span>`;
	}
	paragaph.innerHTML = hmtlStrings;
});

spans = [...document.querySelectorAll('span')];

const revealSpans = () => {
	for (let i = 0; i < spans.length; i++) {
		if (
			spans[i].parentElement.getBoundingClientRect().top <
			window.innerHeight / 2
		) {
			let { left, top } = spans[i].getBoundingClientRect();
			top = top - window.innerHeight * 0.55; //* adjust percentage
			let opacityValue =
				1 - (top * 0.01 + left * 0.001) < 0.1
					? 0.1
					: 1 - (top * 0.01 + left * 0.001).toFixed(3);
			opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3);
			spans[i].style.opacity = opacityValue;
		}
	}
};

window.addEventListener('scroll', () => {
	revealSpans();
});

revealSpans();
