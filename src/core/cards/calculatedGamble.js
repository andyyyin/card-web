import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

let _handCardNumberCache

export default class CalculatedGamble extends BaseCard {

	baseCost = 0

	name = '孤注一掷'

	static type = CARD_BASE_TYPE.SKILL

	exhaust = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		_handCardNumberCache = fn.numberOfHandCards()
		await fn.dropHandCards(card => card.id !== this.id)
	}

	async afterLaunch(fn) {
		let drawCount = _handCardNumberCache - 1
		drawCount > 0 && await fn.drawCard(drawCount)
	}

}