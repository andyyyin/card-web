import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Flechettes extends BaseCard {

	static baseCost = 1

	static name = '暗器'

	static baseValue = 4

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '手牌中每有一张技能牌，发动一次攻击'

	constructor() {
		super();
	}

	updateRel(fn) {
		let count = fn.getNumberOfHandSklCards()
		this.comboFlag = count > 0
		this.attackTime = count
	}

	async onLaunch(fn) {
		await this.commonStrike(fn)
	}

}