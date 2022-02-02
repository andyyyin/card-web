import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Expertise extends BaseCard {

	baseCost = 1

	name = '专业技术'

	static type = CARD_BASE_TYPE.SKILL

	desc = '抽牌直到手牌有6张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
	}

	async afterLaunch(fn) {
		let drawCount = 6 - fn.getNumberOfHandCards()
		await fn.drawCard(drawCount)
	}

}