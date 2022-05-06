import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import CaltropsState from "../state/caltrops";

export default class Caltrops extends BaseCard {

	static name = '铁蒺藜'

	static baseValue = 1

	static type = CARD_BASE_TYPE.ABILITY

	static desc = '添加3级蒺藜：受到攻击时对攻击者造成反伤'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(CaltropsState, 3)
	}

}