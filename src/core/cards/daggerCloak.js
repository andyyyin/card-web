import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Shiv from "./shiv";

export default class DaggerCloak extends BaseCard {

	name = '飞刀斗篷'

	baseValue = 5

	type = CARD_BASE_TYPE.SKILL

	desc = '制造1张小刀到手牌'

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