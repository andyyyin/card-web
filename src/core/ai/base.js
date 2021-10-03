import {INTENTION} from "../enum";

export default class BaseAI {

	intention

	act (execute) {
		console.log('run ai')
		switch (this.intention) {
			case INTENTION.ATTACK: this.attack(execute); break
			case INTENTION.DEFENSE: this.defense(execute); break
		}
	}

	getIntention () {
		let random = Math.random() > 0.5
		if (random) {
			this.intention = INTENTION.ATTACK
		} else {
			this.intention = INTENTION.DEFENSE
		}
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

}