import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnBlock from "../state/nextTurnPower";
import NextTurnStrengthEnemy from "../state/nextTurnStrengthEnemy";
import Strength from "../state/strength";

export default class PiercingWail extends BaseCard {

	name = '尖啸'

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(NextTurnBlock, 2)
		fn.enemyPushState(Strength, -6)
		fn.enemyPushState(NextTurnStrengthEnemy, 6)
	}

}