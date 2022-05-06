import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Prepared extends BaseCard {

	static baseCost = 0

	static name = '准备'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '抽一张牌，丢弃一张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.drawCard()
		await fn.dropSelectCard()
	}

}