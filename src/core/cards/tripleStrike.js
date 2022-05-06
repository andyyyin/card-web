import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class TripleStrike extends BaseCard {

	static name = '三连击'

	static baseValue = 3
	static attackTime = 3

	static type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		await fn.strikeEnemy(this.baseValue)
		await fn.strikeEnemy(this.baseValue)
	}

}