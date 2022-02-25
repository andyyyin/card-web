import BaseState from "./base";

export default class Caltrops extends BaseState{

	name = '蒺藜'

	icon = 'caltrops'

	priority = 3

	async onGetStrike (fn) {
		fn.StrikeOpponent(this, this.level)
	}

}