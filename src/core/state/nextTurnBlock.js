import BaseState from "./base";

export default class NextTurnBlock extends BaseState{

	name = '下回合防御'

	icon = 'shield-brown'

	async onHostStartTurn (fn) {
		fn.heroChangeDefense(this.level)
		this.removeSelf()
	}

}