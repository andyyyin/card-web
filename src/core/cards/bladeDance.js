import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Shiv from "./shiv";

export default class BladeDance extends BaseCard {

	static name = '刀刃之舞'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '制造3张小刀到手牌'

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