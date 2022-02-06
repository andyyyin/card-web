import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Finisher extends BaseCard {

	name = '终结技'

	baseValue = 6

	type = CARD_BASE_TYPE.ATTACK

	desc = '本回合每打出一张攻击牌，发动一次攻击'

	constructor() {
		super();
	}

	updateRel(fn) {
		let count = fn.getLaunchAttCardCountOfTurn()
		this.comboFlag = count > 0
		this.attackTime = count
	}

	async onLaunch(fn) {
		let count = fn.getLaunchAttCardCountOfTurn()
		for (let i = 0; i < count; i++) {
			await fn.strikeEnemy(this.baseValue)
		}
	}

}