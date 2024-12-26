// let promiseToCookFood = new Promise((resolve, reject) => {
// 	let a = 2 + 75
// 	if (a === 7) {
// 		resolve('Success In Cooking Food')
// 	} else {
// 		reject('Rejected To Cook Food')
// 	}
// })

// promiseToCookFood
// 	.then(messageForResolve => {
// 	})
// 	.catch(messageForReject => {
// 	})

const cheftLeft = false
const userWatchingCatMeme = false

// function cookFoodCallback(callback, errCallback) {
// 	if (cheftLeft) {
// 		callback({ name: 'UserLeft', message: ':(' })
// 	} else if (userWatchingCatMeme) {
// 		errCallback({ name: 'UserWatchingCatMeme', message: 'Cat > Cheft' })
// 	} else {
// 		callback({ name: 'Eat Food ', message: 'Staisfied Food,,' })
// 	}
// }

// cookFoodCallback(
// 	message => {
// 	},
// 	errMessage => {
// 	}
// )
function cookFoodPromise() {
	return new Promise((resolve, reject) => {
		if (cheftLeft) {
			resolve({ name: 'UserLeft', message: ':(' })
		} else if (userWatchingCatMeme) {
			reject({ name: 'UserWatchingCatMeme', message: 'Cat > Cheft' })
		} else {
			resolve({ name: 'Eat Food ', message: 'Staisfied Food,,' })
		}
	})
}
// cookFoodPromise()
// 	.then(messageForResolve => {
// 		return new Promise((resolve, reject) => {
// 			if ((a = 1)) {
// 				resolve({ name: 'chaining callback', chaining: messageForResolve })
// 			}
// 		})
// 	})
// 	.then(data => {
// 		return { ...data, time: 'also' }
// 	})
// 	.then(data => {
// 	})
// 	.catch(messageForReject => {
// 	})

// ====== Async Function Of Cook FOod

// async function CookFood() {
// 	try {
// 		const response = await cookFoodPromise()
// 	} catch (err) {
// 	}
// }

// CookFood()

// const fectRequest = fetch('https://swapi.py4e.com/api/films/')
// 	.then(data => {
// 		return data.json()
// 	})
// 	.then(data => {
// 		data.results.map(dt => {
// 			let div = document.createElement('div')
// 			div.classList.add('clr-white')
// 			div.innerHTML = dt.title
// 			body.appendChild(div)
// 		})
// 	})

// optionsThing.forEach(option => {
// window.addEventListener(`scroll`, e => {
// 	optionsThing.forEach(option => {
// 		const properties = option.getBoundingClientRect()

// 		const top = properties.bottom
// 		console.log(top + `top`)
// 		console.log(window.scrollY)
// 		if (window.scrollY < top) {
// 			option.classList.add(`top`)
// 		} else {
// 			option.classList.remove(`top`)
// 		}
// 	})
// })
// })
// optionsThing.forEach(op => {
// 	optionsThing.addEventListener('keydown', e => {
// 		switch (e.key) {
// 			case 'ArrowDown':
// 				const current = optionsThing.querySelector('.active')

// 				const next = current.nextElementSibling
// 				if (!next) return
// 				target(next, current)

// 				break
// 			case 'ArrowUp':
// 				const c = optionsThing.querySelector('.active')
// 				const previous = c.previousElementSibling
// 				if (!previous) return
// 				target(previous, c)

// 				break
// 		}
// 	})
// })

// // window.addEventListener('contextmenu', e => {
// 	const element = document.querySelector('.divd')
// 	element.classList.toggle('appear')
// 	setMousePositionToCustomProps(e, element)
// })
