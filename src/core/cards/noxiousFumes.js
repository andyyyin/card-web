import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import NoxiousFumesState from '../state/noxiousFumes'

export default class NoxiousFumes extends BaseCard {

	static name = '剧毒空气'

	static type = CARD_BASE_TYPE.ABILITY

	static desc = '在每回合开始时，对敌人造成2点中毒'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.enemyPushState(NoxiousFumesState, 1)
	}

}