import {INTENTION} from "../enum";
import BaseAI from "./base";
import Burn from '../cards/burn'

export default class Mage extends BaseAI{

	static level = 2

	prepareAction

	img = 'mage'

	mhp = 50

	baseDamage = 12

	actionList = []

	prepare(fn) {
		const turnNum = fn.getTurnNum()
		if ((turnNum - 1) % 3 === 0) {
			this.actionList = [{intention: INTENTION.STAY, run: this.stay.bind(this)}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.fireAttack.bind(this), name: '火球术', value: this.baseDamage}]
		}
		return super.prepare();
	}

	async fireAttack (fn) {
		await fn.anim.enemyPower()
		await fn.strikeHero(this.baseDamage)
		fn.addCardIntoDraw(new Burn())
	}

}