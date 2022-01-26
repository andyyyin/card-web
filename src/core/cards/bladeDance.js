import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Shiv from "./shiv";

export default class BladeDance extends BaseCard {

	name = '刀刃之舞'

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {}

	async afterLaunch(fn) {
		await fn.createCard(Shiv)
		await fn.createCard(Shiv)
		await fn.createCard(Shiv)
	}

}