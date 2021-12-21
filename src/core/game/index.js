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

const getNextEnemy = async () => {
	return aiQueue.pop()
}

const install = (extendCallback) => {
	extendCallback({cards, aiQueue})
}

export default {
	getCards,
	getNextEnemy,
	install
}