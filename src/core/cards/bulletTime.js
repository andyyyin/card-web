import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import BlockDraw from "../state/blockDraw";

export default class BulletTime extends BaseCard {

	baseCost = 3

	name = '子弹时间'

	static type = CARD_BASE_TYPE.SKILL

	desc = '本回合不能再抽牌，本回合所有手牌费用降为0'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(BlockDraw)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn);
		fn.freeAllHandCardsThisTurn()
	}

}