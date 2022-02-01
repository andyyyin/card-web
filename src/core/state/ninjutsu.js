import BaseState from "./base";

export default class Ninjutsu extends BaseState{

	name = '忍术'

	icon = 'ninjutsu'

	get getDamageFix () {
		if (this.level > 0) {
			return {multi: 0.5}
		} else {
			return null
		}
	}

	async onGetStrike () {
		this.levelChange(-1)
	}

	async onOpponentEndTurn () {
		this.removeSelf()
	}

}