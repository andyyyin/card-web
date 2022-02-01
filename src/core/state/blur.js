import BaseState from "./base";

export default class Blur extends BaseState{

	name = '残影'

	icon = 'blur'

	keepBlock = true

	async onHostStartTurn (fn) {
		this.levelChange(-1)
	}
}