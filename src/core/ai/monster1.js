import {INTENTION} from "../enum";
import Agility from "../state/agility";
import BaseAI from "./base";

export default class Monster1 extends BaseAI{

	static level = 2

	prepareAction

	img = 'monster1'

	mhp = 60

	baseDamage = 10
	baseDefense = 8

	actionList = [
		{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this), value: this.baseDamage},
		{intention: INTENTION.DEFENSE, run: this.stableDefense.bind(this)},
	]

	async stableDefense (fn) {
		await this.commonDefense(fn)
		fn.enemyPushState(Agility, 2)
	}

}