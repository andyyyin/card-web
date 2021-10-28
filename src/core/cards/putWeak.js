import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";

export default class PutWeak extends BaseCard {

	name = '虚弱'

	baseValue = 3

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	onLaunch(execute) {
		execute.enemyPushState(Weak, this.baseValue)
	}

}