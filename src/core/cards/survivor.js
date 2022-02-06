import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Survivor extends BaseCard {

	name = '幸存'

	baseValue = 8

	type = CARD_BASE_TYPE.SKILL

	desc = '丢弃1张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.dropSelectCard()
	}

}