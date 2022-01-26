import BaseState from "./base";

export default class Poisoned extends BaseState{

	name = '中毒'

	icon = 'poisoned'

	level = 1

	constructor(level) {
		super(level);
		this.level = level || 1
	}

	async onHostEndTurn (fn) {
		fn.hostChangeHp(this, -this.level)
		this.level -= 1
		if (this.level <= 0) this.removeSelf(fn)
	}

}