import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Prepared extends BaseCard {

	baseCost = 0

	name = '准备'

	type = CARD_BASE_TYPE.SKILL

	desc = '抽一张牌，丢弃一张牌'

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