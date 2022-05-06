import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import BurstState from "../state/burst";

export default class Burst extends BaseCard {

	static name = '爆发'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '本回合下一次打出的技能牌将会打出两次'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await super.onLaunch(fn)
		fn.heroPushState(BurstState)
	}

}