import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class EscapePlan extends BaseCard {

	baseCost = 0

	name = '逃跑计划'

	baseValue = 3

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async afterLaunch(fn) {
		let drawn = (await fn.drawCard())[0]
		if (drawn.type === CARD_BASE_TYPE.SKILL) {
			fn.heroChangeDefense(this.baseValue)
		}
	}

}