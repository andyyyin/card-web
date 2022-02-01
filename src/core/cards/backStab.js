import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class BackStab extends BaseCard {

	baseCost = 0

	name = '背刺'

	baseValue = 11

	exhaust = true

	innate = true

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}