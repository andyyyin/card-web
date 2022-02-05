import BaseState from "./base";

export default class ToolsOfTheTrade extends BaseState{

	name = '等价交换'

	icon = 'trade'

	async onHostStartTurn (fn) {
		await fn.drawCard(this.level)
		await fn.dropSelectCard(this.level)
	}

}