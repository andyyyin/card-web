import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class BackFlip extends BaseCard {

	name = '后空翻'

	baseValue = 5

	type = CARD_BASE_TYPE.SKILL

	desc = '抽两张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.drawCard(2)
	}

}