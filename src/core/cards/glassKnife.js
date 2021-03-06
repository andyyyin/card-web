import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnPower from "../state/nextTurnPower";

export default class GlassKnife extends BaseCard {

	static name = '玻璃匕首'

	static baseValue = 8
	static attackTime = 2

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '每次打出这张卡，其在本场战斗基础伤害-2'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await this.commonStrike(fn)
		this.baseValue -= 2
		if (this.baseValue < 0) this.baseValue = 0
	}

	async onBattleEnd() {
		await super.onBattleEnd();
		this.baseValue = 8
	}

}