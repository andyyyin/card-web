import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class BackStab extends BaseCard {

	static baseCost = 0

	static name = '背刺'

	static baseValue = 11

	static exhaust = true

	static innate = true

	static type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}