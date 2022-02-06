import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Poisoned from "../state/poisoned";

export default class Catalyst extends BaseCard {

	name = '催化剂'

	type = CARD_BASE_TYPE.SKILL

	desc = '使敌人的中毒状态等级翻倍'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		let poisoned = fn.enemyFindState(Poisoned)
		poisoned && poisoned.levelChange(poisoned.level)
	}

}