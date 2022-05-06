import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Weak from "../state/weak";

export default class SuckerPunch extends BaseCard {

	static baseCost = 1

	static name = '突袭'

	static baseValue = 7

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '造成1点虚弱'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Weak)
	}

}