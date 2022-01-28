import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Shiv from "./shiv";

export default class DaggerCloak extends BaseCard {

	name = '飞刀斗篷'

	baseValue = 5

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

	async afterLaunch(fn) {
		await fn.createCard(Shiv)
	}

}