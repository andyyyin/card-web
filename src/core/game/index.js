import Cards from '../cards'
import AIMap from '../ai'

const cards = [
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.TripleStrike(),
	new Cards.StrengthUp(),
	new Cards.PutWeak(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
]

const aiQueue = [
	AIMap.Ninja,
	AIMap.Wolf,
	AIMap.Monster1,
]

const getCards = () => cards

const getNextEnemy = () => {
	return aiQueue.pop()
}

export default {
	getCards,
	getNextEnemy,
}