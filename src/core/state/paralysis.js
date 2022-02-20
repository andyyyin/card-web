import BaseState from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Paralysis extends BaseState{

	name = '麻痹'

	icon = 'lightning-helix'

	async onHostStartTurn (fn) {
		await fn.dropRandomHandCard(this.level, c => c.type === CARD_BASE_TYPE.ATTACK)
	}

	async onHostEndTurn (fn) {
		this.levelChange(-1)
	}

}