import BaseState from "./base";

export default class Choke extends BaseState{

	name = '锁喉'

	icon = 'hang'

	priority = 6

	async onOpponentEndTurn() {
		this.removeSelf()
	}

	async onLaunchCard (fn) {
		fn.strikeEnemy(this.level * 3)
	}

}