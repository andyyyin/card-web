import BaseState from "./base";

export default class Caltrops extends BaseState{

	name = '蒺藜'

	icon = 'caltrops'

	async onGetStrike (fn) {
		fn.StrikeOpponent(this, this.level)
	}

}