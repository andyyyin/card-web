import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class RiddleWithHoles extends BaseCard {

	baseCost = 2

	name = '多重攻击'

	baseValue = 3
	attackTime = 5

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		for (let i = 0; i < this.attackTime; i++) {
			await fn.strikeEnemy(this.baseValue)
		}
	}

}