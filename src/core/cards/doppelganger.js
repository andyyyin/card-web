import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnPower from "../state/nextTurnPower";
import NextTurnAddDraw from "../state/nextTurnAddDraw";

export default class Doppelganger extends BaseCard {

	static xCost = true

	static name = '双重人格'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '下回合获得x点能量，多抽x张牌'

	static exhaust = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		let point = fn.getCurPower()
		fn.heroPushState(NextTurnPower, point)
		fn.heroPushState(NextTurnAddDraw, point)
	}

}