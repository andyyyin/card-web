import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class EndlessAgony extends BaseCard {

	baseCost = 0

	name = '无尽折磨'

	baseValue = 4

	static type = CARD_BASE_TYPE.ATTACK

	exhaust = true

	constructor() {
		super();
	}

	async onDraw(fn) {
		await fn.createCard(EndlessAgony)
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}