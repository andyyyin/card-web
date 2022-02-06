import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnPower from "../state/nextTurnPower";

export default class Outmaneuver extends BaseCard {

	name = '深谋远虑'

	type = CARD_BASE_TYPE.SKILL

	desc = '下回合获得2点能量'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(NextTurnPower, 2)
	}

}