import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import BurstState from "../state/burst";

export default class Burst extends BaseCard {

	name = '爆发'

	type = CARD_BASE_TYPE.SKILL

	desc = '本回合下一次打出的技能牌将会打出两次'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await super.onLaunch(fn)
		fn.heroPushState(BurstState)
	}

}