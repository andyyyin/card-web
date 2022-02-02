import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Weak from "../state/weak";

export default class SuckerPunch extends BaseCard {

	baseCost = 1

	name = '突袭'

	baseValue = 7

	static type = CARD_BASE_TYPE.ATTACK

	desc = '造成1点虚弱'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Weak)
	}

}