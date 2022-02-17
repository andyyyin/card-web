import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Weak from "../state/weak";
import {stateDefenseFix} from "../algorithm";
import {waitFor} from "../function/common";

export default class BaseAI {

	prepareAction

	img

	baseDamage
	baseDefense

	actionList

	async action (fn) {
		console.log('run ai')
		await this.prepareAction.run(fn)
	}

	onDebut () {}

	onStartNewTurn () {}

	prepare () {
		this.prepareAction = AT.getRandomOneWeighted(this.actionList)
		return this.prepareAction
	}

	stay () {}

	async commonAttack (fn) {
		let value = this.baseDamage
		fn.pushLog({text: '攻击，威力=' + value})
		// console.log('ai act attack', value)
		await fn.strikeHero(value)
	}

	async commonDefense (fn) {
		// console.log('ai act defense', this.baseDefense)
		fn.pushLog({text: '防御=' + this.baseDefense})
		fn.enemyChangeDefense(this.baseDefense)
	}

}