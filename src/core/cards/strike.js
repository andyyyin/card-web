import BaseCard from "./base";
import {inject} from "vue";

export default class Strike extends BaseCard {

	name = '打击'

	constructor() {
		super();
		this.id = Math.floor(Math.random() * 10000)
	}

	onLaunch(execute) {
		execute.strike(10)
	}

}