import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnAddDraw from "../state/nextTurnAddDraw";

export default class Predator extends BaseCard {

	baseCost = 2

	name = '猎杀者'

	baseValue = 15

	type = CARD_BASE_TYPE.ATTACK

	desc = '下回合多抽两张牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		await fn.heroPushState(NextTurnAddDraw, 2)
	}

}