import Cards from '../cards'
import AIMap from '../ai'

const cards = [
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.StrengthUp(),
	new Cards.PutWeak(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
]

const aiQueue = [
	AIMap.Wolf,
	AIMap.Monster1,
	AIMap.Ninja,
]

const getCards = () => cards

const getNextEnemy = () => {
	return aiQueue.pop()
}

export default {
	getCards,
	getNextEnemy,
}