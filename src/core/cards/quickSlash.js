import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class QuickSlash extends BaseCard {

	static name = '快斩'

	static baseValue = 8

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '抽一张牌'

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