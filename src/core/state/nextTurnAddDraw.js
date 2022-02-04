import BaseState from "./base";

export default class NextTurnAddDraw extends BaseState{

	name = '下回合额外抽牌'

	icon = 'drawCard'

	async onHostStartTurn (fn) {
		await fn.drawCard(this.level)
		this.removeSelf()
	}

}