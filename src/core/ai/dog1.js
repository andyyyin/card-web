import {INTENTION} from "../enum";
import BaseAI from "./base";

export default class Dog1 extends BaseAI{

	static level = 1

	prepareAction

	img = 'dog1'

	mhp = 40

	baseDamage = 7
	baseDefense = 6

	actionList = []

	prepare(fn) {
		const turnNum = fn.getTurnNum()
		if (turnNum % 2 === 0) {
			this.actionList = [{intention: INTENTION.DEFENSE, run: this.commonDefense.bind(this)}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this)}]
		}
		return super.prepare();
	}

}