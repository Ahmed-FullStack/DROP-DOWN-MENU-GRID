import ripple, { rippleHTMLELements } from './paperRipple/PaperRipple.js';
const lightThemeChanger = document.querySelector(`[light-theme-changer]`);
const DarkThemeChanger = document.querySelector(`[dark-theme-changer]`);
const SystemThemeChanger = document.querySelector(`[system-theme-changer]`);
const root = document.querySelector(`:root`);
const themeList = document.querySelectorAll(`#theme-changer`);
const primaryHeader = document.querySelector(`.primary-main`);
const navFixer = document.querySelector(`.nav-fix`);
const allListWrapper = document.querySelectorAll(`list-wrapper`);
const ripples = document.querySelectorAll(`.ripple`);
const addElement = document.querySelector('.add-el')
addElement.addEventListener('pointerdown', e => {
	const el = document.createElement('button')
	document.body.appendChild(el)
	el.classList.add(
		'animate-new-btn'
	)
	el.addEventListener('animationend',e => {
		el.classList.remove('animate-new-btn')
	}, {once: true})
	ripples.forEach(ripple => {
		rippleHTMLELements(ripple);
	});
	el.textContent= 'Long Ripple Long Ripple'
	rippleHTMLELements(el)
})
ripples.forEach(ripple => {
	rippleHTMLELements(ripple);
});
ripple();
allListWrapper.forEach(unfocusEl);
function unfocusEl(el) {
	const interactiveELement =
		el.nodeName !== `H1` &&
		el.nodeName !== `H2` &&
		el.nodeName !== `H3` &&
		el.nodeName !== `H4` &&
		el.nodeName !== `H5` &&
		el.nodeName !== `H6` &&
		el.nodeName !== `P` &&
		el.nodeName !== `DIV`;

	el.setAttribute(`aria-hidden`, true);

	interactiveELement && el.setAttribute(`disabled`, true);
	const modalChild = [...el.children];
	modalChild.forEach(unfocusEl);
}

function focusEl(el) {
	el.removeAttribute(`aria-hidden`, ``);
	el.removeAttribute(`disabled`, ``);
	const modalChild = [...el.children];
	modalChild.forEach(focusEl);
}
const { height: navFixHeight } = navFixer.getBoundingClientRect();
primaryHeader.style.setProperty(`--nav-fix`, `${navFixHeight}px`);

clickListener(lightThemeChanger, themeChangerHandler.bind(null, 'light'));
clickListener(DarkThemeChanger, themeChangerHandler.bind(null, 'dark'));
clickListener(SystemThemeChanger, systemThemeChangerHandler);
function themeChangerHandler(theme) {
	localStorage.removeItem('interactiveTheme');
	localStorage.removeItem('system');

	root.removeAttribute('light');
	root.removeAttribute('dark');
	root.removeAttribute('system');

	root.setAttribute('animate', '');

	root.setAttribute(theme, '');
	localStorage.setItem('interactiveTheme', theme);
	setTimeout(() => {
		root.removeAttribute('animate');
	}, 900);
}
function systemThemeChangerHandler(theme) {
	localStorage.removeItem('interactiveTheme');
	localStorage.removeItem('system');

	root.removeAttribute('light');
	root.removeAttribute('dark');
	root.setAttribute('system', '');
	localStorage.setItem('system', 'true');

	const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
	root.setAttribute('animate', '');

	prefersColorScheme.matches
		? root.setAttribute('dark', '')
		: root.setAttribute('light', '');

	prefersColorScheme.matches
		? localStorage.setItem('interactiveTheme', 'dark')
		: localStorage.setItem('interactiveTheme', 'light');

	function handleSystemTheme(e) {
		localStorage.removeItem('interactiveTheme');
		localStorage.setItem('system', 'true');

		root.removeAttribute('light');
		root.removeAttribute('dark');

		e.matches ? root.setAttribute('dark', '') : root.setAttribute('light', '');
		e.matches
			? localStorage.setItem('interactiveTheme', 'dark')
			: localStorage.setItem('interactiveTheme', 'light');
	}
	prefersColorScheme.addEventListener('change', handleSystemTheme, {
		once: true,
	});

	setTimeout(() => {
		root.removeAttribute('animate');
	}, 900);
}
const system = localStorage.getItem('system');

themeList.forEach(ThemeList => {
	const list = ThemeList.querySelector(`[data-list]`);
	const listItems = list.querySelectorAll(`[data-list-items]`);
	const listSelect = ThemeList.previousElementSibling;
	const selectText = listSelect.querySelector(`span`);

	const theme = localStorage.getItem(`interactiveTheme`);
	const system = localStorage.getItem(`system`);
	theme === `light` && (selectText.innerHTML = `Light Theme`);
	theme === `dark` && (selectText.innerHTML = `Dark Theme`);
	system === `true` && (selectText.innerHTML = `System Theme`);
	listItems.forEach(listItem => {
		theme + ` theme` === listItem.textContent.trim().toLowerCase() &&
			system == null &&
			listItem.classList.add(`hover`);

		system == `true` &&
			`system theme` === listItem.textContent.trim().toLowerCase() &&
			listItem.classList.add(`hover`);
	});
});
function setTheme() {
	if (system) {
		root.setAttribute(`system`, '');

		root.removeAttribute('light');
		root.removeAttribute('dark');
		const prefersColorScheme = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);
		localStorage.removeItem('theme');
		prefersColorScheme.matches
			? localStorage.setItem('theme', 'dark')
			: localStorage.setItem('theme', 'light');
		function handleSystemTheme(e) {
			localStorage.removeItem('theme');

			root.removeAttribute('light');
			root.removeAttribute('dark');

			e.matches
				? root.setAttribute('dark', '')
				: root.setAttribute('light', '');
			e.matches
				? localStorage.setItem('theme', 'dark')
				: localStorage.setItem('theme', 'light');
		}
		prefersColorScheme.addEventListener('change', handleSystemTheme, {
			once: true,
		});
	}
	const theme = localStorage.getItem('interactiveTheme');
	root.setAttribute(theme, '');
}

document.onload = setTheme();

// fetchDatabase()

async function fetchDatabase() {
	try {
		const requestedResults = await fetch('https://swapi.py4e.com/api/films/');
		const data = await requestedResults.json();

		data.results.map(dt => {
			let div = document.createElement('div');
			div.classList.add('clr-white');
			div.innerHTML = dt.title;
			body.appendChild(div);
		});
	} catch (err) {}
}

const gridItems = document.querySelectorAll('.normalize');
const options = {
	root: null,
	rootMargin: '0px 0px -150px',
	threshold: 0.8,
};
const transFormObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate-opacity');
			observer.unobserve(entry.target);
		}
	});
}, options);

gridItems.forEach(item => {
	transFormObserver.observe(item);
});
const observerOptions = {
	threshold: 1,
};
const observingPosition = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) {
			entry.target.classList.add('b');
		} else {
			entry.target.classList.remove('b');
		}
	});
}, observerOptions);

const listSelect = document.querySelectorAll(`[data-list-select]`);
const listWrapper = document.querySelectorAll(`list-wrapper`);
const customList = document.querySelectorAll(`[data-list]`);
const listItems = document.querySelectorAll(`[data-list-items]`);
const body = document.querySelector('body');
const target = (target, current) => {
	current.classList.remove(`active`);
	current.classList.remove(`hover`);
	target.classList.add(`active`);
	target.classList.add(`hover`);
};
customList.forEach(customlist => {
	customlist.addEventListener(`keydown`, e => {
		console.log(e.key);

		if (e.key == `ArrowDown`) {
			console.log(customList);
			const current = customlist.querySelector(`.active`);
			const next = current.nextElementSibling;
			if (!next) return;
			target(next, current);

			console.log(next);
		}
		if (e.key == `ArrowUp`) {
			const current = customlist.querySelector(`.active`);
			const previous = current.previousElementSibling;
			if (!previous) return;
			target(previous, current);
		}
	});
});
function wrapperSize() {
	listWrapper.forEach(wrapper => {
		const selection = wrapper.children.item(0);

		const { width, height } = selection.getBoundingClientRect();
		wrapper.style.setProperty(`--height`, `${height.toFixed(2)}px`);
		wrapper.style.setProperty(`--width`, `${width.toFixed(2)}px`);
		console.log(wrapper.classList.contains(`pointer-events`));

		wrapper.classList.contains(`pointer-events`) &&
			wrapper.previousElementSibling.scrollIntoView({ block: 'nearest' });
		wrapper.classList.contains(`pointer-events`) &&
			wrapper.scrollIntoView({ block: 'nearest' });
	});
}

wrapperSize();

window.addEventListener(`resize`, e => {
	wrapperSize();
});

document.addEventListener('keydown', e => {
	if (e.key !== `Escape`) return;
	listWrapper.forEach(wrapper => {
		const openedList = wrapper.querySelector(`[data-list]`);
		wrapper.classList.remove(`pointer-events`);
		openedList.classList.remove('show');
		unfocusEl(wrapper);
	});
	body.classList.remove(`freeze`);
});

clickListener(document, dropDownMenuHandler);
function dropDownMenuHandler(e) {
	wrapperSize();
	const selectedListSelect = e.target.matches('[data-list-select]');
	const selectedListWrapper = document.querySelector(
		`#${e.target.getAttribute('forList')}`
	);
	const selectedCustomList = document.querySelector(
		`#${e.target.getAttribute('forList')} [data-list]`
	);
	const selectedListItem = e.target.closest(`[data-list-items]`);

	const clickedList = e.target.closest(`[data-list]`);

	if (selectedListSelect) {
		const closeWrappers = [...listWrapper].filter(wrapper => {
			return wrapper !== selectedListWrapper;
		});

		const closeLists = [...customList].filter(list => {
			return list !== selectedCustomList;
		});

		closeLists.forEach(list => {
			list.classList.remove('show');
		});
		closeWrappers.forEach(wrapper => {
			wrapper.classList.remove('pointer-events');
		});
		selectedListWrapper.classList.toggle(`pointer-events`);
		selectedCustomList.classList.toggle('show');
		selectedListWrapper.classList.contains(`pointer-events`)
			? body.classList.add('freeze')
			: body.classList.remove('freeze');
		selectedListWrapper.classList.contains(`pointer-events`)
			? focusEl(selectedListWrapper)
			: unfocusEl(selectedListWrapper);

		return;
	}

	if (selectedListItem) {
		const selectedCustomList = selectedListItem.parentElement;
		const selectedListItems =
			selectedListItem.parentElement.querySelectorAll('[data-list-items]');
		const selectedListWrapper = selectedCustomList.parentElement;
		const selectedListSelect = selectedListWrapper.previousElementSibling;
		const listSelectSpan = selectedListSelect.querySelector('.year');
		selectedListWrapper.classList.remove(`pointer-events`);
		selectedCustomList.classList.remove('show');
		body.classList.remove('freeze');
		unfocusEl(selectedListWrapper);
		listSelectSpan.textContent = selectedListItem.textContent.trim();
		selectedListItems.forEach(selectedItem => {
			if (
				selectedItem.textContent.trim() === listSelectSpan.textContent.trim()
			) {
				selectedItem.classList.add('hover');
			} else {
				selectedItem.classList.remove('hover');
			}
		});

		return;
	}

	if (clickedList) {
		clickedList.parentElement.classList.add(`pointer-events`);
		clickedList.classList.add('show');
		body.classList.add('freeze');
		return;
	}

	customList.forEach(list => {
		list.classList.remove('show');
	});
	body.classList.remove('freeze');
	listWrapper.forEach(wrapper => {
		wrapper.classList.remove('pointer-events');

		wrapper.classList.remove('visible');
	});
}

function clickListener(el, func) {
	el.addEventListener('pointerdown', event => {
		if (event.buttons !== 1) return;
		el.addEventListener('pointerup', handleClick.bind(event), { once: true });
	});
	el.addEventListener('keydown', event => {
		if (event.repeat) return;
		if (event.key !== ` ` && event.key !== `Enter`) return;
		el.addEventListener('keyup', handleClick.bind(event), { once: true });
	});
	function handleClick(e) {
		if (this.target !== e.target) return;
		func.bind(this, this)();
	}
}

function sizeForAllList() {
	listSelect.forEach(select => {
		clickListener(select, setPosition);
		window.addEventListener(`resize`, setPosition);
		function setPosition() {
			const wrapper = select.nextElementSibling;
			trackElement(select, wrapper);
		}
	});
}
sizeForAllList();
window.addEventListener(`scroll`, e => {
	sizeForAllList();
});

function trackElement(el, posEl) {
	const posElStyles = window.getComputedStyle(posEl);
	const windowInnerHeight = window.innerHeight.toFixed(2);
	const windowInnerWidth = window.innerWidth.toFixed(2);
	const widthAddition = window
		.getComputedStyle(posEl)
		.getPropertyValue(`--aspect-ratio-increase-wunits`);

	const { x, y, right, bottom, width, height } = el.getBoundingClientRect();
	const {
		x: elX,
		y: elY,
		right: elRight,
		bottom: elBottom,
		width: elWidth,
		height: elHeight,
	} = posEl.getBoundingClientRect();
	const excessive = posElStyles.getPropertyValue(
		`--aspect-ratio-increase-wunits`
	);
	const spaceForDropdown = 8;
	const elementYPosition = bottom + elHeight - excessive + spaceForDropdown;
	const elementXPosition = x + elWidth;
	const halFWidth = widthAddition / 2.5;
	const rightPosition = windowInnerWidth - right - halFWidth;
	const leftPosition = x - halFWidth;
	const topPosition = y + height + spaceForDropdown;
	const bottomPosition = y - elHeight - spaceForDropdown;

	if (
		elementYPosition > windowInnerHeight &&
		elementXPosition > windowInnerWidth
	) {
		posEl.style.setProperty(`--top`, `${bottomPosition}px`);
		posEl.style.setProperty(`--right`, `${rightPosition}px`);
		posEl.style.setProperty(`--left`, `none`);

		posEl.classList.add(`bottom-transform`);
	} else if (elementYPosition > windowInnerHeight) {
		posEl.style.setProperty(`--top`, `${bottomPosition}px`);
		posEl.style.setProperty(`--left`, `${leftPosition}px`);
		posEl.style.setProperty(`--right`, `none`);

		posEl.classList.add(`bottom-transform`);
	} else if (elementXPosition > windowInnerWidth) {
		posEl.style.setProperty(`--top`, `${topPosition}px`);
		posEl.style.setProperty(`--right`, `${rightPosition}px`);
		posEl.style.setProperty(`--left`, `none`);
		posEl.classList.remove(`bottom-transform`);
	} else {
		posEl.style.setProperty(`--top`, `${topPosition}px`);
		posEl.style.setProperty(`--left`, `${leftPosition}px`);
		posEl.style.setProperty(`--right`, `none`);

		posEl.classList.remove(`bottom-transform`);
	}
}
