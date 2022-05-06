import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Hysteria extends BaseCard {

	static name = '歇斯底里'

	static baseValue = 13

	static type = CARD_BASE_TYPE.ATTACK

	static areaAttack = true

	static exhaust = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.strikeEnemy(this.baseValue, this.areaAttack)
	}

}