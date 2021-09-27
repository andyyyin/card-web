import BaseCard from "./base";
import {TYPE} from './enum'

export default class Strike extends BaseCard {

	name = '打击'

	type = TYPE.ATTACK

	constructor() {
		super();
		this.id = Math.floor(Math.random() * 10000)
	}

	onLaunch(execute) {
		execute.strike(10)
	}

}