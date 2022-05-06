import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import PhantasmalKillerState from "../state/phantasmalKiller";

export default class PhantasmalKiller extends BaseCard {

	static name = '幻影杀手'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '下一回合所有攻击伤害翻倍'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(PhantasmalKillerState)
	}

}