import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class EndlessAgony extends BaseCard {

	baseCost = 0

	name = '无尽折磨'

	baseValue = 4

	static type = CARD_BASE_TYPE.ATTACK

	desc = '每次抽到这张牌，制造1张此牌的复制'

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