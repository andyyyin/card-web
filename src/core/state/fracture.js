import BaseState from "./base";

export default class Fracture extends BaseState{

	name = '破绽'

	icon = 'fracture'

	level = 1

	get getDamageFix () {
		return {multi: 1.5}
	}

	async onHostEndTurn (fn) {
		this.levelChange(-1)
	}

}