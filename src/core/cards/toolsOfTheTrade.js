import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Strength from "../state/strength";
import ToolsOfTheTradeState from "../state/toolsOfTheTrade";

export default class ToolsOfTheTrade extends BaseCard {

	name = '等价交换'

	static type = CARD_BASE_TYPE.ABILITY

	desc = '在你的回合开始时，丢弃一张牌，抽一张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(ToolsOfTheTradeState)
	}

}