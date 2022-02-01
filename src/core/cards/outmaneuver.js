import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import NextTurnBlock from "../state/nextTurnPower";

export default class Outmaneuver extends BaseCard {

	name = '深谋远虑'

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(NextTurnBlock, 2)
	}

}