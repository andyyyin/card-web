import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import AfterImageState from "../state/afterImage";

export default class AfterImage extends BaseCard {

	static name = '余像'

	static type = CARD_BASE_TYPE.ABILITY

	static desc = '每当你打出一张牌，获得1点防御'

	constructor() {
		super();
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn);
		fn.heroPushState(AfterImageState, 1)
	}

}