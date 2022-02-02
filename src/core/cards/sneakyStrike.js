import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class SneakyStrike extends BaseCard {

	baseCost = 2

	name = '偷袭'

	baseValue = 12

	static type = CARD_BASE_TYPE.ATTACK

	desc = '本回合如果丢弃过牌，则获得两点能量'

	constructor() {
		super();
	}

	updateRel(fn) {
		this.comboFlag = fn.getDroppedCountOfTurn() > 0
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		if (fn.getDroppedCountOfTurn() > 0) {
			fn.gainPower(2)
		}
	}

}