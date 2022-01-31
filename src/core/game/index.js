import Cards from '../cards'
import AIMap from '../ai'
import AllOutAttack from "../cards/allOutAttack";
import BackStab from "../cards/backStab";
import Blur from "../cards/blur";

const cards = [
	new Cards.Neutralize(),
	new Cards.HeavyStrike(),
	new Cards.TripleStrike(),
	new Cards.StrengthUp(),
	new Cards.BackFlip(),
	new Cards.Acrobatics(),
	new Cards.Survivor(),
	new Cards.Poison(),
	new Cards.BladeDance(),
	new Cards.Bane(),
	new Cards.DaggerCloak(),
	new Cards.DaggerThrow(),
	new Cards.DodgeRoll(),
	new Cards.FlyingKnee(),
	new Cards.Outmaneuver(),
	new Cards.PiercingWail(),
	new Cards.PoisonedStab(),
	new Cards.Prepared(),
	new Cards.QuickSlash(),
	new Cards.SneakyStrike(),
	new Cards.SuckerPunch(),
	new Cards.Accuracy(),
	new Cards.AllOutAttack(),
	new Cards.BackStab(),
	new Cards.Blur(),
	new Cards.Blur(),
	new Cards.Blur(),
	new Cards.Blur(),
	new Cards.Blur(),
]

const aiQueue = [
	AIMap.Mage,
	AIMap.Monster1,
	AIMap.Ninja,
	AIMap.Wolf,
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