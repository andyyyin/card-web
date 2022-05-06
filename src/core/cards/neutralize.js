import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";

export default class Neutralize extends BaseCard {

	static baseCost = 0

	static name = '中和'

	static baseValue = 3

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '造成1点虚弱'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Weak, 1)
	}

}