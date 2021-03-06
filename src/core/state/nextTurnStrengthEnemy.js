import BaseState from "./base";
import Strength from "./strength";

export default class NextTurnStrengthEnemy extends BaseState{

	name = '下回合力量'

	icon = 'next'

	async onHostEndTurn (fn) {
		fn.enemyPushState(Strength, this.level)
		this.removeSelf()
	}

}