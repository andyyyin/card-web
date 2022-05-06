import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Slice extends BaseCard {

	static baseCost = 0

	static name = '切'

	static baseValue = 6

	static type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}