import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Poisoned from "../state/poisoned";

export default class Setup extends BaseCard {

	name = '安装'

	static type = CARD_BASE_TYPE.SKILL

	desc = '选择一张手牌放到抽牌堆顶部，在下次打出之前0消费'

	constructor() {
		super();
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		let result = await fn.handCardsSelector()
		if (!result) return
		let id = result[0]
		let card = await fn.putCardToDrawStack(1, id)
		card.setCostFixBeforeLaunch(-card.baseCost)
	}

}