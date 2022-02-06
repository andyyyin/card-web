import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";
import Fracture from "../state/fracture";

export default class Bash extends BaseCard {

	baseCost = 2

	name = '重击'

	baseValue = 8

	type = CARD_BASE_TYPE.ATTACK

	desc = '造成2点破绽'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Fracture, 2)
	}

}