import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Unload extends BaseCard {

	name = '倾泻攻击'

	baseValue = 14

	type = CARD_BASE_TYPE.ATTACK

	desc = '丢弃所有非攻击牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn);
		await fn.dropFilteredHandCards(c => c.type !== CARD_BASE_TYPE.ATTACK)
	}

}