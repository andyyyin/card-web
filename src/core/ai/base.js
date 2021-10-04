import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Weak from "../state/weak";

export default class BaseAI {

	intention

	act (execute) {
		console.log('run ai')
		switch (this.intention) {
			case INTENTION.ATTACK: this.attack(execute); break
			case INTENTION.DEFENSE: this.defense(execute); break
			case INTENTION.DEBUFF: this.debuff(execute); break
		}
	}

	getIntention () {
		const options = [INTENTION.ATTACK, INTENTION.DEFENSE, INTENTION.DEBUFF]
		this.intention = AT.getRandomOne(options)
		return this.intention
	}

	attack (execute) {
		let value = 8
		console.log('ai act attack', value)
		execute.strikeHero(value)
	}

	defense (execute) {
		let value = 5
		console.log('ai act defense', value)
		execute.enemyChangeDefense(value)
	}

	debuff (execute) {
		console.log('ai act debuff')
		execute.heroPushState(Weak)
	}

}