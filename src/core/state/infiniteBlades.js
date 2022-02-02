import BaseState from "./base";
import Shiv from "../cards/shiv";

export default class InfiniteBlades extends BaseState{

	name = '无尽刀刃'

	icon = 'blades'

	async onHostStartTurn (fn) {
		for (let i = 0; i < this.level; i++) {
			await fn.createCard(Shiv)
		}
	}

}