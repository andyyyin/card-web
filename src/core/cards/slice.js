import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Slice extends BaseCard {

	bassCost = 0

	name = '切'

	baseValue = 6

	static type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}