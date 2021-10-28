import BaseState from "./base";

export default class Agility extends BaseState{

	name = '敏捷'

	icon = 'agility'

	level = 1

	get defenseFix () {
		return {add: this.level}
	}

	constructor(level) {
		super(level);
		this.level = level || 1
	}

}