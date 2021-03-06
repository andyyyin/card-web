import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnPower from "../state/nextTurnPower";

export default class FlyingKnee extends BaseCard {

	static name = '飞踢'

	static baseValue = 8

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '下回合开始时获得1点能量'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.heroPushState(NextTurnPower)
	}

}