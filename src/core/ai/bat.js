import {INTENTION} from "../enum";
import BaseAI from "./base";
import Paralysis from "../state/paralysis";
import Team from "../state/team";

export default class Bat extends BaseAI{

	prepareAction

	img = 'bat'

	mhp = 1

	baseDamage = 10

	actionList

	prepare(fn) {
		let teamState = fn.enemyFindState(Team)
		this.baseDamage = 5 + ((teamState && Math.floor(teamState.level / 2)) || 0)
		this.actionList = [{intention: INTENTION.ATTACK_DEBUFF, run: this.paralysisAttack.bind(this), value: this.baseDamage}]
		return super.prepare();
	}

	async afterGetDamage (fn) {
		fn.enemyPrepareAction()
	}

	async onDebut (fn) {
		fn.enemyPushState(Team, 20)
	}

	async paralysisAttack (fn) {
		let damage = await this.commonAttack(fn)
		if (damage > 0) {
			await fn.heroPushState(Paralysis)
		}
	}

}