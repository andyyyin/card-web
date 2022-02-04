import BaseState from "./base";

export default class WellLaidPlans extends BaseState{

	name = '完美计划'

	icon = 'cardOut'

	async onHostEndTurn(fn) {
		let count = this.level
		let idList = await fn.handCardsSelector(null, {
			title: `选择最多${count}张卡牌保留`,
			limit: [1, count],
			skip: true,
		})
		if (idList) fn.retainHandCards(idList)
	}

}