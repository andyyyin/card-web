import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Weak from "../state/weak";

export default class LegSweep extends BaseCard {

	baseCost = 2

	name = '扫堂腿'

	baseValue = 11

	static type = CARD_BASE_TYPE.SKILL

	desc = '造成2点虚弱'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
		fn.enemyPushState(Weak, 2)
	}

}