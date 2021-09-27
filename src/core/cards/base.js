import {TYPE} from './enum'

export default class BaseCard {
	cost = 1;

	type;

	get typeClassName () {
		switch (this.type) {
			case TYPE.SKILL: return 'type-skill'
			case TYPE.ATTACK: return 'type-attack'
			case TYPE.ABILITY: return 'type-ability'
		}
		return '#999999'
	}

	onDraw () {

	}

	onLaunch () {

	}
}