import BaseState from "./base";

export default class Choke extends BaseState{

	name = '锁喉'

	icon = 'hang'

	async onLaunchCard (fn) {
		fn.strikeEnemy(this.level * 3)
	}

}