import {CARD_BASE_TYPE} from "../enum";


export default (fn, state) => {

	fn.getTurnNum = () => state.turnNum

	fn.getNumberOfHandCards = () => state.handCards.length
	fn.getNumberOfHandSklCards = () => state.handCards.filter(c => c.type === CARD_BASE_TYPE.SKILL).length
	fn.getNumberOfHandAttCards = () => state.handCards.filter(c => c.type === CARD_BASE_TYPE.ATTACK).length
	fn.getNumberOfHandAbiCards = () => state.handCards.filter(c => c.type === CARD_BASE_TYPE.ABILITY).length

	fn.getDroppedCountOfTurn = () => state.turnStat.dropCard
	fn.getLaunchAttCardCountOfTurn = () => state.turnStat.launchAttack

	fn.getBattleLoseHpCount = () => state.battleStat.loseHpCount

	return fn
}