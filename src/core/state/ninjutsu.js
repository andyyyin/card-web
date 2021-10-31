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
		if (this.level > 0) this.level--
		if (this.level <= 0) {
			this.removeSelf()
		}
	}

	constructor(level) {
		super(level);
		this.level = level || 1
	}

	onOpponentEndTurn () {
		this.removeSelf()
	}

}