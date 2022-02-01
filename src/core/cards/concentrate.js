import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Concentrate extends BaseCard {

	baseCost = 0

	name = '聚精会神'

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.gainPower(2)
	}

	async afterLaunch(fn) {
		await fn.dropSelectCard(3)
	}

}