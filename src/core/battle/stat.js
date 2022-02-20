import {CARD_BASE_TYPE} from "../enum";


export default (fn, state) => {

	fn.getTurnNum = () => state.turnNum
	fn.getCurPower = () => state.powerCur

	fn.getHeroHp = () => {
		let {hp, mhp} = state.hero
		return {hp, mhp}
	}

	fn.getEnemyHp = () => {
		let {hp, mhp} = state.enemy
		return {hp, mhp}
	}

	fn.getLengthOfHandCards = () => state.handCards.length
	fn.getLengthOfDrawStack = () => state.drawStack.length
	fn.getLengthOfDropStack = () => state.dropStack.length
	fn.getNumberOfHandSklCards = () => state.handCards.filter(c => c.type === CARD_BASE_TYPE.SKILL).length
	fn.getNumberOfHandAttCards = () => state.handCards.filter(c => c.type === CARD_BASE_TYPE.ATTACK).length
	fn.getNumberOfHandAbiCards = () => state.handCards.filter(c => c.type === CARD_BASE_TYPE.ABILITY).length

	fn.getDroppedCountOfTurn = () => state.turnStat.dropCard
	fn.getLaunchAttCardCountOfTurn = () => state.turnStat.launchAttack

	fn.getBattleLoseHpCount = () => state.battleStat.loseHpCount

	return fn
}