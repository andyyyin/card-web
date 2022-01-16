import BaseState from "./base";

export default class Weak extends BaseState{

	name = '虚弱'

	icon = 'weak'

	level = 1

	get damageFix () {
		return {multi: 0.75}
	}

	constructor(level) {
		super(level);
		this.level = level || 1
	}

	async onHostEndTurn (fn) {
		this.level -= 1
		if (this.level <= 0) this.removeSelf(fn)
	}

}