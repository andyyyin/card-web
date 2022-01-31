import BaseState from "./base";

export default class NextTurnBlock extends BaseState{

	name = '下回合能量'

	icon = 'rhombus-brown'

	level = 1

	async onHostStartTurn (fn) {
		fn.gainPower(this.level)
		this.removeSelf()
	}

}