import BaseCard from "./base";
import {inject} from "vue";

export default class Defense extends BaseCard {

	name = '防御'

	constructor() {
		super();
		this.id = Math.floor(Math.random() * 10000)
	}

	onLaunch(execute) {
		execute.defense(7)
	}

}