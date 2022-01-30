import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Weak from "../state/weak";

export default class SuckerPunch extends BaseCard {

	baseCost = 1

	name = '突袭'

	baseValue = 7

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Weak)
	}

}