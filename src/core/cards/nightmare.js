import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Nightmare extends BaseCard {

	baseCost = 3

	name = '梦魇'

	static type = CARD_BASE_TYPE.SKILL

	desc = '选择一张手牌，将三张此牌的复制放入手牌'

	constructor() {
		super();
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn);
		let idList = await fn.handCardsSelector(null, {title: '选择一张牌进行复制'})
		for (let i = 0; i < 3; i++) {
			await fn.copyCard(idList)
		}
	}

}