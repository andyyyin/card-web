import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class Bane extends BaseCard {

	name = '灾祸'

	baseValue = 7

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	checkCombo(fn) {
		this.comboFlag = !!fn.enemyFindState(Poisoned)
	}

	async onLaunch(fn) {
		fn.strikeEnemy(this.baseValue)
		if (fn.enemyFindState(Poisoned)) {
			fn.strikeEnemy(this.baseValue)
		}
	}

}