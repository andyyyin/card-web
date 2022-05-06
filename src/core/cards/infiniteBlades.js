import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import InfiniteBladesState from "../state/infiniteBlades";

export default class InfiniteBlades extends BaseCard {

	static name = '无尽刀刃'

	static type = CARD_BASE_TYPE.ABILITY

	static desc = '每回合开始时，制造一张小刀到手牌'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(InfiniteBladesState, 1)
	}

}