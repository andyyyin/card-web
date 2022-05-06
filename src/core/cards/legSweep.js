import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Weak from "../state/weak";

export default class LegSweep extends BaseCard {

	static baseCost = 2

	static name = '扫堂腿'

	static baseValue = 11

	static type = CARD_BASE_TYPE.SKILL

	static desc = '造成2点虚弱'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
		fn.enemyPushState(Weak, 2)
	}

}