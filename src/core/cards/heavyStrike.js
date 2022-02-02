import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";
import Fracture from "../state/fracture";

export default class HeavyStrike extends BaseCard {

	baseCost = 2

	name = '重击'

	baseValue = 8

	static type = CARD_BASE_TYPE.ATTACK

	desc = '造成1点虚弱和1点破绽'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Weak, 1)
		fn.enemyPushState(Fracture, 1)
	}

}