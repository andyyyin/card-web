import BaseState from "./base";
import DoubleDamageThisTurn from "./doubleDamageThisTurn";

export default class PhantasmalKiller extends BaseState{

	name = '幻影杀手'

	icon = 'phantasmal'

	async onHostStartTurn (fn) {
		fn.heroPushState(DoubleDamageThisTurn)
		this.levelChange(-1)
	}

}