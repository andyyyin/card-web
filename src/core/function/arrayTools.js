
const shuffleArray = (array, count) => {
	if (!array || !array.length) return undefined
	if (array.length === 1) return array[0]
	let currentIndex = array.length, temporaryValue, randomIndex;
	count = count || array.length

	// While there remain elements to shuffle...
	while (currentIndex > array.length - count) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return count ? array.slice(array.length - count, array.length) : array;
}

const getRandomOne = (array) => {
	if (!array || !array.length) return undefined
	if (array.length === 1) return array[0]
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