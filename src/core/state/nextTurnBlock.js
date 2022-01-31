import BaseState from "./base";

export default class NextTurnBlock extends BaseState{

	name = '下回合防御'

	icon = 'shield-brown'

	level = 1

	value = 4

	async onHostStartTurn (fn) {
		fn.heroChangeDefense(this.value * this.level)
		this.removeSelf()
	}

}