import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";
import Fracture from "../state/fracture";

export default class Bash extends BaseCard {

	static baseCost = 2

	static name = '重击'

	static baseValue = 8

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '造成2点破绽'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Fracture, 2)
	}

}