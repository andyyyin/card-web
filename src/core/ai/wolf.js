import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Agility from "../state/agility";
import BaseAI from "./base";
import {waitFor} from "../function/common";

export default class Wolf extends BaseAI{

	static level = 2

	prepareAction

	img = 'wolf'

	mhp = 30

	baseDamage = 4

	actionList

	prepare(fn) {
		const turnNum = fn.getTurnNum()
		this.baseDamage = turnNum < 3 ? (this.baseDamage + 4) : 16
		if (turnNum % 3 === 0) {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this), value: 7, time: 3}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this)}]
		}
		return super.prepare();
	}

}