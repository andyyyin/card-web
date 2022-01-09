import anime from 'animejs'

const cardsPosOfPanel = {
	0: {x: 2, y: 441, width: 74, height: 100},
	1: {x: 76, y: 441, width: 74, height: 100},
	2: {x: 150, y: 441, width: 74, height: 100},
	3: {x: 224, y: 441, width: 74, height: 100},
	4: {x: 298, y: 441, width: 74, height: 100},
	5: {x: 2, y: 541, width: 74, height: 100},
	6: {x: 76, y: 541, width: 74, height: 100},
	7: {x: 150, y: 541, width: 74, height: 100},
	8: {x: 224, y: 541, width: 74, height: 100},
	9: {x: 298, y: 541, width: 74, height: 100},
}

const getRelPosition = (src, target) => {
	let {x: ex, y: ey, height: eh, width: ew} = src
	let {x: tx, y: ty, height: th, width: tw} = target
	let moveX = tx - ex - (ew / 2) + (tw / 2)
	let	moveY = ty - ey - (eh / 2) + (th / 2)
	return [moveX, moveY]
}

const cardLeavePosition = (element) => {
	let elRect = cardsPosOfPanel[Number(element.getAttribute('index'))]
	console.log('before leave', element.getAttribute('index'))
	element.style.top = elRect.y + 'px'
	element.style.left = elRect.x + 'px'
	element.style.width = elRect.width + 'px'
	element.style.height = elRect.height + 'px'
	element.style.position = 'fixed'
	element.style.zIndex = 10
}

export const moveToTarget = (element, target) => {
	cardLeavePosition(element)
	let [moveX, moveY] = getRelPosition(element.getBoundingClientRect(), target.getBoundingClientRect())
	return anime({
		targets: element,
		translateX: moveX,
		translateY: moveY,
		scale: .1,
		opacity: 0,
		easing: 'easeInQuint',
		duration: 300,
	}).finished

}

export const cardsPositionToTarget = (element, target) => {
	const index = Number(element.getAttribute('index'))
	let [moveX, moveY] = getRelPosition(cardsPosOfPanel[index], target.getBoundingClientRect())
	console.log('before enter', moveX, moveY)
	element.style.transform = `translateY(${moveY}px) translateX(${moveX}px) scale(0.1)`
	// element.style.opacity = 0
}

export const recoverToHeight = (el, height) => {
	return anime({
		targets: el,
		opacity: 1,
		height,
		duration: 400,
		easing: 'easeInQuint',
	}).finished
}

export const flatten = (el) => {
	return anime({
		targets: el,
		opacity: 0,
		height: 0,
		duration: 400,
		easing: 'easeInQuint',
	}).finished
}

export const moveBack = (element) => {
	return anime({
		targets: element,
		translateX: 0,
		translateY: 0,
		scale: 1,
		opacity: 1,
		easing: 'easeInQuint',
		duration: 300,
	}).finished
}

export const glint = (element) => {
	return anime({
		targets: element,
		opacity: [0, .4, .2, .6, 0],
		easing: 'easeInOutQuad',
		duration: 600,
	}).finished;
}

export default {
	moveToTarget,
	cardsPositionToTarget,
	moveBack,
	recoverToHeight,
	flatten,
	glint,
}