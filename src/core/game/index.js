import Cards from '../cards'
import AIMap from '../ai'

const cards = [
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.TripleStrike(),
	new Cards.StrengthUp(),
	new Cards.HeavyStrike(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
]

const aiQueue = [
	AIMap.Mage,
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