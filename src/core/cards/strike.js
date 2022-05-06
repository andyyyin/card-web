import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Strike extends BaseCard {

	static isBase = true

	static name = '打击'

	static baseValue = 6

	static type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}