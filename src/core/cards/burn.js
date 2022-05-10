import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Burn extends BaseCard {

	static name = '燃烧'

	static type = CARD_BASE_TYPE.STATE

	static desc = '在手牌中结束回合对自身造成攻击'

	static baseValue = 2

	static unplayable = true

	ethereal = true

	constructor() {
		super();
	}

	async onHostEndTurn (fn) {
		fn.pureStrikeHero(this.baseValue)
	}
}