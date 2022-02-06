import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import EnvenomState from "../state/envenom";

export default class Envenom extends BaseCard {

	baseCost = 2

	name = '涂毒'

	type = CARD_BASE_TYPE.ABILITY

	desc = '每当你对敌人造成未格挡的伤害，对其造成1级中毒'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(EnvenomState, 1)
	}

}