import BaseState from "./base";

export default class Weak extends BaseState{

	name = '虚弱'

	icon = 'weak'

	get damageFix () {
		return {multi: 0.75}
	}

	async onHostEndTurn (fn) {
		this.levelChange(-1)
	}

}