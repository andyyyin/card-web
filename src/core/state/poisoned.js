import BaseState from "./base";

export default class Poisoned extends BaseState{

	name = '中毒'

	icon = 'poisoned'

	async onOpponentEndTurn (fn) {
		fn.hostChangeHp(this, -this.level)
		this.levelChange(-1)
	}

}