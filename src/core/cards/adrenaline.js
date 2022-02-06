import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Adrenaline extends BaseCard {

	baseCost = 0

	name = '肾上腺素'

	type = CARD_BASE_TYPE.SKILL

	desc = '获得1点能量，抽两张牌'

	exhaust = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.gainPower(1)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn);
		await fn.drawCard(2)
	}

}