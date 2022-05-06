import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import WellLaidPlansState from '../state/wellLaidPlans'

export default class WellLaidPlans extends BaseCard {

	static name = '完美计划'

	static type = CARD_BASE_TYPE.ABILITY

	static desc = '每回合结束时可以保留一张卡牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await super.onLaunch(fn);
		fn.heroPushState(WellLaidPlansState)
	}

}