import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Expertise extends BaseCard {

	baseCost = 1

	name = '专业技术'

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
	}

	async afterLaunch(fn) {
		let drawCount = 6 - fn.numberOfHandCards()
		await fn.drawCard(drawCount)
	}

}