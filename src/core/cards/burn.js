import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Burn extends BaseCard {

	name = '燃烧'

	static type = CARD_BASE_TYPE.STATE

	desc = '在手牌中结束回合对自身造成攻击'

	baseValue = 2

	unplayable = true

	ethereal = true

	constructor() {
		super();
	}

	async onHandTurnEnd (fn) {
		fn.pureStrikeHero(this.baseValue)
	}
}