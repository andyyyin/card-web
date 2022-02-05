import BaseState from "./base";

export default class BlockDraw extends BaseState{

	name = '禁止抽牌'

	icon = 'blockDraw'

	constructor() {
		super();
		this.level = 0
	}

	async onHostEndTurn() {
		await super.onHostEndTurn();
		this.removeSelf()
	}

	/* 相关逻辑在战斗核心逻辑部分判断 */

}