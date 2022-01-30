import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Prepared extends BaseCard {

	baseCost = 0

	name = '准备'

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.drawCard()
	}

	async afterLaunch(fn) {
		await fn.dropSelectCard()
	}

}