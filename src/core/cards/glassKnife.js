import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnPower from "../state/nextTurnPower";

export default class GlassKnife extends BaseCard {

	name = '玻璃匕首'

	baseValue = 8
	attackTime = 2

	static type = CARD_BASE_TYPE.ATTACK

	desc = '每次打出这张卡，其在本场战斗基础伤害-2'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		for (let i = 0; i < this.attackTime; i++) {
			await fn.strikeEnemy(this.baseValue)
		}
		this.baseValue -= 2
		if (this.baseValue < 0) this.baseValue = 0
	}

	async onBattleEnd() {
		await super.onBattleEnd();
		this.baseValue = 8
	}

}