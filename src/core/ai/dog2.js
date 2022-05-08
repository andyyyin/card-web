import {INTENTION} from "../enum";
import Ninjutsu from "../state/ninjutsu";
import MT from '../function/mathTools'
import BaseAI from "./base";

export default class Dog2 extends BaseAI{

	static level = 1

	prepareAction

	img = 'dog2'

	mhp = 30

	baseDamage = 5

	actionList = []

	prepare(fn) {
		const time = MT.randomBool() ? 2 : 1
		this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this), time}]
		return super.prepare();
	}

	async onStartNewTurn (fn) {
		fn.enemyPushState(Ninjutsu, 1)
	}

}