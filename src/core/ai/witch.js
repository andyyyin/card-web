import {INTENTION} from "../enum";
import BaseAI from "./base";
import Strength from "../state/strength";
import Agility from "../state/agility";

export default class Witch extends BaseAI{

	static level = 2

	prepareAction

	img = 'witch'

	mhp = 60

	baseDamage = 7

	actionList

	prepare(fn) {
		const turnNum = fn.getTurnNum()
		if (turnNum === 1) {
			this.actionList = [{intention: INTENTION.STAY, run: this.stay.bind(this)}]
		} else if (turnNum % 3 === 0) {
			this.actionList = [{intention: INTENTION.DEBUFF, run: this.weaken.bind(this)}]
			this.baseDamage += 1
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this)}]
		}
		return super.prepare();
	}

	async weaken (fn) {
		fn.heroPushState(Strength, -1)
		fn.heroPushState(Agility, -1)
	}

}