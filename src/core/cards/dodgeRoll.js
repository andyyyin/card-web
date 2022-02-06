import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import NextTurnBlock from "../state/nextTurnBlock";

export default class DodgeRoll extends BaseCard {

	name = '翻滚回避'

	baseValue = 4

	type = CARD_BASE_TYPE.SKILL

	desc = '下回合开始时获得4点护甲'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
		fn.heroPushState(NextTurnBlock)
	}

}