import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Agility from "../state/agility";

export default class Footwork extends BaseCard {

	name = '腾挪'

	static type = CARD_BASE_TYPE.ABILITY

	desc = '获得1点敏捷'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(Agility, 1)
	}

}