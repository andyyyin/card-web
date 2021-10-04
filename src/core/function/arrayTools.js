
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

export default {
	shuffleArray,
	getRandomOne,
}