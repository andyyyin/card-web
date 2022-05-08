import {INTENTION} from "../enum";
import BaseAI from "./base";
import Strength from "../state/strength";
import Agility from "../state/agility";
import Anger from "../state/anger";

export default class Warrior extends BaseAI{

	static level = 2

	prepareAction

	img = 'warrior'

	mhp = 70

	baseDamage = 10

	actionList

	prepare(fn) {
		const turnNum = fn.getTurnNum()
		if (turnNum === 2) {
			this.actionList = [{intention: INTENTION.BUFF, run: this.pushAnger.bind(this)}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this), value: this.baseDamage}]
		}
		return super.prepare();
	}

	async pushAnger (fn) {
		fn.enemyPushState(Anger)
	}

}