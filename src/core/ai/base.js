import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Weak from "../state/weak";
import {stateDefenseFix} from "../algorithm";
import {waitFor} from "../function/common";

export default class BaseAI {

	constructor() {
		for (let key in this.constructor) {
			this[key] = this.constructor[key]
		}
	}

	prepareAction

	img

	baseDamage
	baseDefense

	actionList

	async action (fn) {
		console.log('run ai')
		await this.prepareAction.run(fn)
	}

	async onDebut () {}

	async onStartNewTurn () {}

	async afterGetDamage () {}

	prepare () {
		this.prepareAction = AT.getRandomOneWeighted(this.actionList)
		if (this.prepareAction.value === undefined) {
			if (this.prepareAction.intention === INTENTION.ATTACK) this.prepareAction.value = this.baseDamage
			// 防御意图不显示数值
			// if (this.prepareAction.intention === INTENTION.DEFENSE) this.prepareAction.value = this.baseDefense
		}
		return this.prepareAction
	}

	stay () {}

	async commonAttack (fn) {
		let value = this.prepareAction.value || this.baseDamage
		let time = this.prepareAction.time || 1
		fn.pushLog({text: '攻击，威力=' + value + (time > 1 ? ('x' + time) : '')})
		let damageList = []
		for (let i = 0; i < time; i++) {
			await fn.anim.enemyPower()
			damageList.push(await fn.strikeHero(value))
		}
		return damageList.length > 1 ? damageList : damageList[0]
	}

	async commonDefense (fn) {
		// console.log('ai act defense', this.baseDefense)
		fn.pushLog({text: '防御=' + this.baseDefense})
		fn.enemyChangeDefense(this.baseDefense)
	}

}