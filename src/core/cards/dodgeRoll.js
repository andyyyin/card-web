import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import NextTurnBlock from "../state/nextTurnBlock";

export default class DodgeRoll extends BaseCard {

	name = '翻滚回避'

	baseValue = 4

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
		fn.heroPushState(NextTurnBlock)
	}

}