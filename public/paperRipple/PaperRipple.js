const buttons = document.getElementsByTagName('button');
const anchortags = document.getElementsByTagName('a');
console.log(buttons);
class paperRipple {
	constructor(button) {
		this.button = button;
		this.wavesContainer = this.wavesContainer();
		this.#paperRipple();
	}
	wavesContainer() {
		const paperRipple = document.createElement(`paper-ripple`);
		paperRipple.classList.add(`paper-style`);
		paperRipple.classList.add(`paper-ripple`);
		const wavesContainer = document.createElement(`div`);
		wavesContainer.classList.add(`paper-style`);
		wavesContainer.classList.add(`waves`);
		paperRipple.appendChild(wavesContainer);
		this.button.appendChild(paperRipple);
		return wavesContainer;
	}
	#paperRipple() {
		const buttonStyles = window.getComputedStyle(this.button);
		const removeWaveTiming = Number.parseFloat(
			buttonStyles.getPropertyValue(`--opacity-duration-wms`)
		);
		const transitionDuration = Number.parseFloat(
			buttonStyles.getPropertyValue(`--tansition-duration-wm`)
		);
		const addOpacityClass = 45;
		this.button.addEventListener(`pointerdown`, e => {
			if (e.buttons !== 1) return;
			if (e.target !== this.button) return;

			// Coordinates
			const { x, y, width, height } = this.button.getBoundingClientRect();
			const xCoordinate = `${e.clientX - x}`;
			const yCoordinate = `${e.clientY - y}`;
			const xCoordinatePC = `${(xCoordinate / width) * 100}%`;
			const yCoordinatePC = `${(yCoordinate / height) * 100}%`;
			const max = Math.max(height, width)
			// let adaptation;
			// if(max == height){
			// 	adaptation = Math.abs(e.clientY - (height / 2))
			// } else {
			// 	adaptation = Math.abs((e.clientX - x ) + (width / 2))

			// }
			const hypotenus = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
			const rippleScale = (hypotenus ) / max
			// Wave

			const wave = document.createElement(`div`);
			wave.classList.add(`wave`);
			wave.classList.add(`animate-wave`);
			this.wavesContainer.appendChild(wave);
			wave.style.setProperty(`--x`, xCoordinatePC);
			wave.style.setProperty(`--y`, yCoordinatePC);
			wave.style.setProperty('--ripple-scale', rippleScale)
			this.button.addEventListener(
				`pointerup`,
				e => {
					setTimeout(() => {
						wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
					}, transitionDuration+removeWaveTiming);
				},
				{ once: true }
			);
			this.button.addEventListener(
				`pointerleave`,
				e => {
						wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
				},
				{ once: true }
			);
		});
		this.button.addEventListener(`keydown`, e => {
			if (e.key !== ` ` && e.key !== `Enter`) return;
			if (e.repeat) return;
			// Coordinates
			const xCoordinatePC = `${50}%`;
			const yCoordinatePC = `${50}%`;
			const { x, y, width, height } = this.button.getBoundingClientRect();

			// Wave

			const wave = document.createElement(`div`);
			wave.classList.add(`wave`);
			wave.classList.add(`animate-wave`);
			this.wavesContainer.appendChild(wave);
			wave.style.setProperty(`--x`, xCoordinatePC);
			wave.style.setProperty(`--y`, yCoordinatePC);
			const max = Math.max(height, width)
			
			const hypotenus = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
			const rippleScale = (hypotenus ) / max
			wave.style.setProperty('--ripple-scale', rippleScale)
			this.button.addEventListener(
				`keyup`,
				e => {
					wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
				},
				{ once: true }
			);
			this.button.addEventListener(
				`blur`,
				e => {
					setTimeout(() => {
						wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
					}, addOpacityClass);
				},
				{ once: true }
			);
		});
	}
}

function rippleHTMLELements(element) {
	if (typeof element === Array) return;
	const elementType = element.nodeName.toLowerCase();
	const elementFullName = element.constructor.name;
	if ( !element.querySelector('.paper-ripple')) {
		new paperRipple(element);
	} else {
		console.error(`${elementFullName} has already been rippled`);
	}
}

export { rippleHTMLELements };

export default function ripple() {
	[...buttons].forEach(button => {
		new paperRipple(button);
	});
	[...anchortags].forEach(anchortag => {
		new paperRipple(anchortag);
	});
}
