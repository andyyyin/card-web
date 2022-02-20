import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Hysteria extends BaseCard {

	name = '歇斯底里'

	baseValue = 13

	type = CARD_BASE_TYPE.ATTACK

	areaAttack = true

	exhaust = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.strikeEnemy(this.baseValue, this.areaAttack)
	}

}