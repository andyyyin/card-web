import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class AllOutAttack extends BaseCard {

	name = '全力一击'

	baseValue = 12

	static type = CARD_BASE_TYPE.ATTACK

	desc = '随机丢弃1张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.strikeEnemy(this.baseValue)
		fn.dropRandomHandCard()
	}

}