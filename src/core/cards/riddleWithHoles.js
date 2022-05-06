import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class RiddleWithHoles extends BaseCard {

	static baseCost = 2

	static name = '多重攻击'

	static baseValue = 3
	static attackTime =  5

	static type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await this.commonStrike(fn)
	}

}