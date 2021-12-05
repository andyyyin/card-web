import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";
import Fracture from "../state/fracture";

export default class HeavyStrike extends BaseCard {

	cost = 2

	name = '重击'

	baseValue = 8

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	onLaunch(execute) {
		execute.strikeEnemy(this.baseValue)
		execute.enemyPushState(Weak, 1)
		execute.enemyPushState(Fracture, 1)
	}

}