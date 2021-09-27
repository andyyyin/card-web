import BaseCard from "./base";
import {TYPE} from "./enum";

export default class Defense extends BaseCard {

	name = '防御'

	type = TYPE.SKILL

	constructor() {
		super();
		this.id = Math.floor(Math.random() * 10000)
	}

	onLaunch(execute) {
		execute.defense(7)
	}

}