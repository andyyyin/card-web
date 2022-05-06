import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Fracture from "../state/fracture";

export default class Terror extends BaseCard {

	static name = '恐吓'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '造成99级破绽'

	static exhaust = true

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.enemyPushState(Fracture, 99)
	}

}