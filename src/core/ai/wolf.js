import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Agility from "../state/agility";
import BaseAI from "./base";
import {waitFor} from "../function/common";

export default class Wolf extends BaseAI{

	prepareAction

	img = 'wolf'

	mhp = 30

	baseDamage = 4

	actionList

	prepare(fn) {
		const turnNum = fn.getTurnNum()
		this.baseDamage = turnNum < 3 ? (this.baseDamage + 4) : 16
		if (turnNum % 3 === 0) {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.multiAttack.bind(this), value: 7, time: 3}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this), value: this.baseDamage}]
		}
		return super.prepare();
	}

	async multiAttack (fn) {
		await fn.strikeHero(7)
		await fn.strikeHero(7)
		await fn.strikeHero(7)
	}

}