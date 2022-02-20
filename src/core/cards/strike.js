import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Strike extends BaseCard {

	isBase = true

	name = '打击'

	baseValue = 6

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}