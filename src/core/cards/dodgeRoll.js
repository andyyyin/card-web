import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import NextTurnBlock from "../state/nextTurnBlock";

export default class DodgeRoll extends BaseCard {

	static name = '翻滚回避'

	static baseValue = 4

	static type = CARD_BASE_TYPE.SKILL

	static desc = '下回合开始时获得4点护甲'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
		fn.heroPushState(NextTurnBlock, 4)
	}

}