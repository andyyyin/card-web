import Cards from '../cards'
import AIMap from '../ai'
import Neutralize from "../cards/neutralize";

const cards = [
	new Cards.Neutralize(),
	new Cards.Neutralize(),
	new Cards.Neutralize(),
	new Cards.Neutralize(),
	new Cards.TripleStrike(),
	new Cards.StrengthUp(),
	new Cards.HeavyStrike(),
	new Cards.BackFlip(),
	new Cards.BackFlip(),
	new Cards.BackFlip(),
	new Cards.BackFlip(),
	new Cards.BackFlip(),
	new Cards.BackFlip(),
	new Cards.BackFlip(),
	new Cards.Survivor(),
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