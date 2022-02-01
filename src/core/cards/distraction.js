import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Distraction extends BaseCard {

	name = '声东击西'

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		let createdList = await fn.createRandomCard(1, Card => Card.type === CARD_BASE_TYPE.SKILL)
		for (let c of createdList) c.setCostFixInTurn(-c.baseCost)
	}

}