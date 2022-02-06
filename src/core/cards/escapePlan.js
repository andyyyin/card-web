import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class EscapePlan extends BaseCard {

	baseCost = 0

	name = '逃跑计划'

	type = CARD_BASE_TYPE.SKILL

	desc = '抽一张牌，如果抽到的牌时技能牌，获得3点护甲'

	constructor() {
		super();
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		let drawn = (await fn.drawCard())[0]
		if (drawn.type === CARD_BASE_TYPE.SKILL) {
			fn.heroChangeDefense(3)
		}
	}

}