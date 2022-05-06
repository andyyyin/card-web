import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class AllOutAttack extends BaseCard {

	static name = '全力一击'

	static baseValue = 12

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '随机丢弃1张牌'

	static areaAttack = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await this.commonStrike(fn)
		await fn.dropRandomHandCard()
	}

}