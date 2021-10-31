import BaseState from "./base";

export default class Fracture extends BaseState{

	name = '破绽'

	icon = 'fracture'

	level = 1

	get getDamageFix () {
		return {multi: 1.5}
	}

	constructor(level) {
		super(level);
		this.level = level || 1
	}

	onHostEndTurn (execute) {
		this.level -= 1
		if (this.level <= 0) this.removeSelf(execute)
	}

}