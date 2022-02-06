import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";

export default class Acrobatics extends BaseCard {

	name = '杂技'

	type = CARD_BASE_TYPE.SKILL

	desc = '抽3张牌，丢弃1张牌'

	constructor() {
		super();
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.drawCard(3)
		await fn.dropSelectCard()
	}

}