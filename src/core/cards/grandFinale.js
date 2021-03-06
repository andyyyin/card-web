import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class GrandFinale extends BaseCard {

	static baseCost = 0

	static name = '华丽收场'

	static baseValue = 50

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '只有在抽牌堆没有牌的时候才能打出'

	static unplayable = true

	constructor() {
		super();
	}

	updateRel(fn) {
		super.updateRel(fn);
		this.unplayable = (fn.getLengthOfDrawStack() !== 0)
		this.comboFlag = !this.unplayable
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}