import BaseState from "./base";

export default class Poisoned extends BaseState{

	name = '中毒'

	icon = 'poisoned'

	priority = 2

	async onOpponentEndTurn (fn) {
		await fn.hostChangeHp(this, -this.level)
		this.levelChange(-1)
	}

}