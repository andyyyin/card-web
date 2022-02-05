import BaseState from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Burst extends BaseState{

	name = '爆发'

	icon = 'burst'

	async onOpponentEndTurn() {
		this.removeSelf()
	}

	async onLaunchCard (fn, card) {
		if (card.type === CARD_BASE_TYPE.SKILL) {
			card.extraLaunchCount += 1
			this.levelChange(-1)
		}
	}

	async onHostEndTurn() {
		await super.onHostEndTurn();
		this.removeSelf()
	}

}