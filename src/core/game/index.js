import Cards from '../cards'
import AIMap from '../ai'
import Predator from "../cards/predator";
import Reflex from "../cards/reflex";
import RiddleWithHoles from "../cards/riddleWithHoles";
import Setup from "../cards/setup";
import Skewer from "../cards/skewer";
import Tactician from "../cards/tactician";
import Terror from "../cards/terror";
import WellLaidPlans from "../cards/wellLaidPlans";
import AThousandCuts from "../cards/aThousandCuts";

const cards = [
	// new Cards.Neutralize(),
	// new Cards.HeavyStrike(),
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
	new Cards.Prepared(),
	new Cards.Prepared(),
	new Cards.Prepared(),
	new Cards.Prepared(),
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
	new Cards.HeelHook(),
	new Cards.InfiniteBlades(),
	new Cards.LegSweep(),
	new Cards.MasterfulStab(),
	new Cards.NoxiousFumes(),
	new Cards.Predator(),
	new Cards.Reflex(),
	new Cards.RiddleWithHoles(),
	new Cards.Setup(),
	new Cards.Skewer(),
	new Cards.Tactician(),
	new Cards.Terror(),
	new Cards.WellLaidPlans(),
	new Cards.AThousandCuts(),
	new Cards.AThousandCuts(),
	new Cards.AThousandCuts(),
	new Cards.AThousandCuts(),
	new Cards.AThousandCuts(),
]

const aiQueue = [
	AIMap.Mage,
	AIMap.Wolf,
	AIMap.Monster1,
	AIMap.Ninja,
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