import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Finisher extends BaseCard {

	name = '终结技'

	baseValue = 6

	static type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	checkCombo(fn) {
		this.comboFlag = fn.getLaunchAttCardCountOfTurn() > 0
	}

	async onLaunch(fn) {
		let count = fn.getLaunchAttCardCountOfTurn()
		for (let i = 0; i < count; i++) {
			await fn.strikeEnemy(this.baseValue)
		}
	}

}