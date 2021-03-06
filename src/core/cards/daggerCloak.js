import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Shiv from "./shiv";

export default class DaggerCloak extends BaseCard {

	static name = '飞刀斗篷'

	static baseValue = 5

	static type = CARD_BASE_TYPE.SKILL

	static desc = '制造1张小刀到手牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.createCard(Shiv)
	}

}