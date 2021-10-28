import BaseState from "./base";

export default class Strength extends BaseState{

	name = '力量'

	icon = 'strength'

	level = 1

	get damageFix () {
		return {add: this.level}
	}

	constructor(level) {
		super(level);
		this.level = level || 1
	}

}