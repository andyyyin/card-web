import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnAddDraw from "../state/nextTurnAddDraw";

export default class Skewer extends BaseCard {

	xCost = true

	name = '穿刺'

	baseValue = 7

	type = CARD_BASE_TYPE.ATTACK

	desc = '发动攻击X次'

	constructor() {
		super();
	}

	updateRel(fn) {
		super.updateRel(fn);
		this.attackTime = fn.getCurPower()
	}

	async onLaunch(fn) {
		for (let i = 0; i < this.attackTime; i++) {
			await fn.strikeEnemy(this.baseValue)
		}
	}

}