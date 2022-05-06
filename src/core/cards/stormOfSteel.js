import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Shiv from "./shiv";

export default class StormOfSteel extends BaseCard {

	static name = '钢铁风暴'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '丢弃所有手牌，每丢弃一张牌，添加1张小刀到手牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await super.onLaunch(fn);
		this.dropNumberCache = fn.getLengthOfHandCards() - 1
		await fn.dropFilteredHandCards(c => c.id !== this.id)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		for (let i = 0; i < this.dropNumberCache; i++) {
			await fn.createCard(Shiv)
		}
	}

}