import BaseState from "./base";

export default class Agility extends BaseState{

	name = '敏捷'

	icon = 'agility'

	get defenseFix () {
		return {add: this.level}
	}

}