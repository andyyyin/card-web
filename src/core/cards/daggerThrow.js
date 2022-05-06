import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class DaggerThrow extends BaseCard {

	static name = '投掷匕首'

	static baseValue = 9

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '抽一张牌，丢弃一张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.drawCard()
		await fn.dropSelectCard()
	}

}