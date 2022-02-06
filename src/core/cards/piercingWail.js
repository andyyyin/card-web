import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnStrengthEnemy from "../state/nextTurnStrengthEnemy";
import Strength from "../state/strength";

export default class PiercingWail extends BaseCard {

	name = '尖啸'

	type = CARD_BASE_TYPE.SKILL

	desc = '本回合敌人失去6点力量'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.enemyPushState(Strength, -6)
		fn.enemyPushState(NextTurnStrengthEnemy, 6)
	}

}