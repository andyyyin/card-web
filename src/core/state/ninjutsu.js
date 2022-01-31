import BaseState from "./base";

export default class Ninjutsu extends BaseState{

	name = '忍术'

	icon = 'ninjutsu'

	level = 3

	get getDamageFix () {
		if (this.level > 0) {
			return {multi: 0.5}
		} else {
			return null
		}
	}

	onGetDamage () {
		this.levelChange(-1)
	}

	async onOpponentEndTurn () {
		this.removeSelf()
	}

}