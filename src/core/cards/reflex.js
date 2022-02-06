import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Reflex extends BaseCard {

	name = '本能反应'

	type = CARD_BASE_TYPE.SKILL

	desc = '如果此牌被丢弃，抽2张牌'

	unplayable = true

	constructor() {
		super();
	}

	async onDrop(fn) {
		await fn.drawCard(2)
	}

}