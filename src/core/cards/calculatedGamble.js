import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

let _handCardNumberCache

export default class CalculatedGamble extends BaseCard {

	static baseCost = 0

	static name = '孤注一掷'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '丢弃所有手牌，然后抽相同数量的牌'

	static exhaust = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		_handCardNumberCache = fn.getLengthOfHandCards()
		await fn.dropFilteredHandCards(card => card.id !== this.id)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		let drawCount = _handCardNumberCache - 1
		drawCount > 0 && await fn.drawCard(drawCount)
	}

}