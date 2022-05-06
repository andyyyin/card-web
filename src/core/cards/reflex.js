import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Reflex extends BaseCard {

	static name = '本能反应'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '如果此牌被丢弃，抽2张牌'

	static unplayable = true

	constructor() {
		super();
	}

	async onDrop(fn) {
		await fn.drawCard(2)
	}

}