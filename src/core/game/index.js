import Cards from '../cards'
import AIMap from '../ai'
import Neutralize from "../cards/neutralize";

const cards = [
	new Cards.Neutralize(),
	new Cards.HeavyStrike(),
	new Cards.TripleStrike(),
	new Cards.StrengthUp(),
	new Cards.BackFlip(),
	new Cards.Acrobatics(),
	new Cards.Survivor(),
	new Cards.Survivor(),
	new Cards.Poison(),
	new Cards.Poison(),
	new Cards.BladeDance(),
	new Cards.BladeDance(),
	new Cards.BladeDance(),
	new Cards.Bane(),
	new Cards.Bane(),
	new Cards.BladeDance(),
	new Cards.BladeDance(),
	new Cards.BladeDance(),
]

const aiQueue = [
	AIMap.Wolf,
	AIMap.Ninja,
	AIMap.Mage,
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