
const shuffleArray = (array) => {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

const getRandomOne = (array) => {
	let i = Math.floor(Math.random() * array.length)
	return array[i]
}

const getRandomOneWeighted = (array) => {
	const weightTotal = array.reduce((value, item) => {
		return value + (item.weight || 1)
	}, 0)
	const random = Math.random() * weightTotal
	let result
	array.reduce((value, item) => {
		if (result) return 0
		let curValue = value + (item.weight || 1)
		if (curValue > random && !result) {
			result = item
			return 0
		}
		return value + (item.weight || 1)
	}, 0)
	return result
}


export default {
	shuffleArray,
	getRandomOne,
	getRandomOneWeighted,
}