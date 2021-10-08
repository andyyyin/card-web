import BaseState from "./base";

export default class Agility extends BaseState{

	name = '敏捷'

	icon = 'agility'

	level = 1

	get defenseFixAdd () { return this.level }

	constructor(level) {
		super(level);
		this.level = level
	}

	onSuperposition (level) {
		this.level += level
	}

}