import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class BackFlip extends BaseCard {

	static name = '后空翻'

	static baseValue = 5

	static type = CARD_BASE_TYPE.SKILL

	static desc = '抽两张牌'

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