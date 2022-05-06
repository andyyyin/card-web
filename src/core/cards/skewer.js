import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnAddDraw from "../state/nextTurnAddDraw";

export default class Skewer extends BaseCard {

	static xCost = true

	static name = '穿刺'

	static baseValue = 7

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '发动攻击X次'

	constructor() {
		super();
	}

	updateRel(fn) {
		super.updateRel(fn);
		this.attackTime = fn.getCurPower()
	}

	async onLaunch(fn) {
		await this.commonStrike(fn)
	}

}