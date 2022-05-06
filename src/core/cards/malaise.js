import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Strength from "../state/strength";
import Weak from "../state/weak";

export default class Malaise extends BaseCard {

	static xCost = true

	static name = '萎靡'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '敌人失去x点力量，造成x点虚弱'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		let point = fn.getCurPower()
		fn.enemyPushState(Strength, -point)
		fn.enemyPushState(Weak, point)
	}

}