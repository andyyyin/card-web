import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnBlock from "../state/nextTurnPower";

export default class FlyingKnee extends BaseCard {

	name = '飞踢'

	baseValue = 8

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.strikeEnemy(this.baseValue)
		fn.heroPushState(NextTurnBlock)
	}

}