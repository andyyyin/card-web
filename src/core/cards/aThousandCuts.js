import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import AThousandCutsState from '../state/aThousandCuts'

export default class AThousandCuts extends BaseCard {

	name = '凌迟'

	type = CARD_BASE_TYPE.ABILITY

	desc = '每当你打出一张牌，对敌人发动1点攻击'

	constructor() {
		super();
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn);
		fn.enemyPushState(AThousandCutsState)
	}

}