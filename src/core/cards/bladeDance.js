import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Shiv from "./shiv";

export default class BladeDance extends BaseCard {

	name = '刀刃之舞'

	type = CARD_BASE_TYPE.SKILL

	desc = '制造3张小刀到手牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.createCard(Shiv)
		await fn.createCard(Shiv)
		await fn.createCard(Shiv)
	}

}