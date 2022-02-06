import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class QuickSlash extends BaseCard {

	name = '快斩'

	baseValue = 8

	type = CARD_BASE_TYPE.ATTACK

	desc = '抽一张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		await fn.drawCard()
	}

}