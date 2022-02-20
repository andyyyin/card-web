import Cards from '../cards'
import AIMap from '../ai'
import AT from "../function/arrayTools";

const CardsLib = Object.values(Cards).map(Card => new Card()).filter(c => !c.isBase)

const cardsGroup = [
	new Cards.Neutralize(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Strike(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Defense(),
	new Cards.Survivor(),
	// new Cards.Neutralize(),
	// new Cards.Bash(),
	// new Cards.Hysteria(),
	// new Cards.TripleStrike(),
	// new Cards.StrengthUp(),
	// new Cards.BackFlip(),
	// new Cards.Acrobatics(),
	// new Cards.Survivor(),
	// new Cards.Poison(),
	// new Cards.BladeDance(),
	// new Cards.Bane(),
	// new Cards.DaggerCloak(),
	// new Cards.DaggerThrow(),
	// new Cards.DodgeRoll(),
	// new Cards.FlyingKnee(),
	// new Cards.Outmaneuver(),
	// new Cards.PiercingWail(),
	// new Cards.PoisonedStab(),
	// new Cards.Prepared(),
	// new Cards.QuickSlash(),
	// new Cards.SneakyStrike(),
	// new Cards.SuckerPunch(),
	// new Cards.Accuracy(),
	// new Cards.AllOutAttack(),
	// new Cards.BackStab(),
	// new Cards.Blur(),
	// new Cards.CalculatedGamble(),
	// new Cards.Caltrops(),
	// new Cards.Catalyst(),
	// new Cards.Choke(),
	// new Cards.Concentrate(),
	// new Cards.CripplingCloud(),
	// new Cards.Dash(),
	// new Cards.Distraction(),
	// new Cards.EndlessAgony(),
	// new Cards.EscapePlan(),
	// new Cards.Eviscerate(),
	// new Cards.Expertise(),
	// new Cards.Finisher(),
	// new Cards.Flechettes(),
	// new Cards.Footwork(),
	// new Cards.HeelHook(),
	// new Cards.InfiniteBlades(),
	// new Cards.LegSweep(),
	// new Cards.MasterfulStab(),
	// new Cards.NoxiousFumes(),
	// new Cards.Predator(),
	// new Cards.Reflex(),
	// new Cards.RiddleWithHoles(),
	// new Cards.Setup(),
	// new Cards.Skewer(),
	// new Cards.Tactician(),
	// new Cards.Terror(),
	// new Cards.WellLaidPlans(),
	// new Cards.AThousandCuts(),
	// new Cards.Adrenaline(),
	// new Cards.AfterImage(),
	// new Cards.BulletTime(),
	// new Cards.Burst(),
	// new Cards.Doppelganger(),
	// new Cards.Envenom(),
	// new Cards.GlassKnife(),
	// new Cards.GrandFinale(),
	// new Cards.Malaise(),
	// new Cards.Nightmare(),
	// new Cards.PhantasmalKiller(),
	// new Cards.StormOfSteel(),
	// new Cards.ToolsOfTheTrade(),
	// new Cards.Unload(),
]

const aiQueue = [
	AIMap.Warrior,
	AIMap.Witch,
	AIMap.Bat,
	AIMap.Mage,
	AIMap.Ninja,
	AIMap.Wolf,
	AIMap.Monster1,
]

const getCards = () => cardsGroup

const addCardToGroup = (Card) => {
	const constructor = typeof Card === 'function' ? Card : Card.constructor
	cardsGroup.push(new constructor())
}

const getNextEnemy = async () => {
	return aiQueue.pop()
}

const install = (extendCallback) => {
	extendCallback({cardsGroup, aiQueue})
}

const getRandomCardsFromLib = (count, filter) => {
	let list = filter ? CardsLib.filter(filter) : CardsLib
	return AT.getRandomByCount(list, count)
}

export default {
	getCards,
	getNextEnemy,
	install,
	addCardToGroup,
	getRandomCardsFromLib,
}