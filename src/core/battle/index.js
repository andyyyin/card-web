import {stateDamageFix, stateDefenseFix, stateGetDamageFix} from "../algorithm";
import AT from "../function/arrayTools";
import {CARD_BASE_TYPE, INTENTION} from "../enum";
import logFn from "./log"
import animFn from "./anim"
import {waitFor} from "../function/common";

export default (state, refs) => {

	const fn = {}

	fn.heroChangeHp = state.hero.changeHp.bind(state.hero)
	fn.heroPushState = (...params) => {
		state.hero.pushState(...params)
		// updateRelationValueShow()
	}
	fn.heroChangeDefense = (value) => {
		const fixedValue = stateDefenseFix(value, state.hero.stateList)
		state.hero.changeDefense(fixedValue)
	}
	fn.strikeHero = (value) => {
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.enemy.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.hero.stateList)
		state.hero.stateList.map(state => state.onGetDamage())
		return state.hero.getStrike(fixedValue)
	}
	fn.pureStrikeHero = (value) => {
		return state.hero.getStrike(value)
	}

	fn.enemyChangeHp = state.enemy.changeHp.bind(state.enemy)
	fn.enemyPushState = (...params) => {
		state.enemy.pushState(...params)
		// updateRelationValueShow()
	}
	fn.enemyChangeDefense = (value) => {
		const fixedValue = stateDefenseFix(value, state.enemy.stateList)
		state.enemy.changeDefense(fixedValue)
	}
	fn.strikeEnemy = (value) => {
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.hero.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.enemy.stateList)
		state.enemy.stateList.map(state => state.onGetDamage())
		return state.enemy.getStrike(fixedValue)
	}
	fn.pureStrikeEnemy = (value) => {
		return state.enemy.getStrike(value)
	}

	fn.getHeroState = () => [...state.hero.stateList.filter(s => state.active)]
	fn.getEnemyState = () => [...state.enemy.stateList.filter(s => state.active)]

	fn.heroFindState = (State) => state.hero.findState(State)
	fn.enemyFindState = (State) => state.enemy.findState(State)

	fn.hostChangeHp = (exState, value) => {
		if (state.hero.stateList.indexOf(exState) > -1) fn.heroChangeHp(value)
		if (state.enemy.stateList.indexOf(exState) > -1) fn.enemyChangeHp(value)
	}

	fn.cost = (num) => {
		state.powerCur -= num
		console.log('power change -' + num)
	}
	fn.dropCard = async (id) => {
		let index, card
		if (((index = state.handCards.findIndex(c => c.id === id)) > -1)) {
			[card] = state.handCards.splice(index, 1);
			console.log('drop card', card.id, card.name)
			state.dropStack.push(card)
			await card.onLeaveFromHand(fn)
		} else if (((index = state.drawStack.findIndex(c => c.id === id)) > -1)) {
			[card] = state.drawStack.splice(index, 1);
			if (card) state.dropStack.push(card)
		}

	}
	fn.drawCard = async (count) => {
		if (state.drawStack.length > 0) {
			let card = state.drawStack.shift()
			state.handCards.push(card)
			console.log('draw card', card.id, card.name)
			await waitFor(250)
			if (state.handCards.length > 10) {
				await fn.dropCard(card.id)
			} else {
				// todo 抽到直接丢弃不触发抽牌效果？？待定
				await card.onDraw(fn)
			}
			if (count > 1) {
				await fn.drawCard(count - 1)
			} else {
				// 等所有卡抽完了一起更新
				updateRelationValueShow()
			}
		} else if (state.dropStack.length > 0) {
			let cardSGroup = state.dropStack.splice(0, state.dropStack.length)
			state.drawStack.push(...AT.shuffleArray(cardSGroup))
			console.log('shuffle')
			await fn.drawCard(count)
		}
	}
	fn.launchCard = async (id) => {
		if (state.prepareCardId === id) state.prepareCardId = null
		let index, card
		if (((index = state.handCards.findIndex(c => c.id === id)) > -1)) {
			card = state.handCards[index]
		}
		if (!card) return
		console.log('launch card', id, card.name)
		await card.onLaunch(fn)
		fn.cost(card.cost)
		if (card.type === CARD_BASE_TYPE.ABILITY) {
			state.handCards.splice(index, 1)
			await card.onLeaveFromHand(fn)
			state.usedStack.push(card)
		} else if (card.consume) {
			await fn.consumeCard(card.id)
		} else {
			await fn.dropCard(card.id)
		}
		await card.afterLaunch(fn)
		updateRelationValueShow()
	}

	fn.consumeCard = async (id) => {
		let index, card
		if (((index = state.handCards.findIndex(c => c.id === id)) === -1)) return
		card = state.handCards[index]
		state.handCards.splice(index, 1)
		await card.onLeaveFromHand(fn)
		state.consumedStack.push(card)
	}

	fn.addCardIntoDrop = (card, positionType) => addCardIntoStack(card, state.dropStack, positionType)
	fn.addCardIntoDraw = (card, positionType) => addCardIntoStack(card, state.drawStack, positionType)
	fn.addCardIntoHand = (card, positionType) => addCardIntoStack(card, state.handCards, positionType)

	fn.getTurnNum = () => state.turnNum

	fn.dropRandomHandCard = async (filter) => {
		let handCards = [...state.handCards]
		if (filter && typeof filter === 'function') handCards = handCards.filter(filter)
		if (!handCards.length) return
		let toBeDropped = AT.getRandomOne(handCards)
		fn.pushLog('丢弃：' + toBeDropped.name)
		await fn.dropCard(toBeDropped.id)
	}

	fn.raiseRandomCard = (filter) => {
		let handCards = [...state.handCards]
		if (filter && typeof filter === 'function') handCards = handCards.filter(filter)
		if (!handCards.length) return
		let toBeRaised = AT.getRandomOne(handCards)
		toBeRaised.tempFixCost(1)
	}

	fn.handCardsSelector = ({title, onConfirm, count, onSkip}) => {
		state.selector.show = true
		state.selector.title = title
		state.selector.limit = [count || 1]
		state.selector.cards = [...state.handCards]
		state.selector.onSkip = onSkip
		state.selector.onConfirm = onConfirm
	}

	fn.dropSelectCard = async (count) => {
		if (!state.handCards.length) return
		await new Promise(resolve => {
			fn.handCardsSelector({
				title: `选择${count || 1}张卡丢弃`,
				count,
				onConfirm: async (idList) => {
					for (let id of idList) {
						await fn.dropCard(id)
					}
					resolve()
				}
			})
		})
	}

	fn.enemyPrepareAction = () => {
		const actionParam = state.enemy.ai.prepare(fn)
		state.enemy.action.intention = actionParam.intention
		state.enemy.action.name = actionParam.name
		state.enemy.action.value = actionParam.value
		state.enemy.action.fixedValue = actionParam.value
		state.enemy.action.time = actionParam.time
		state.enemy.ai.onStartNewTurn(fn)
		updateRelationValueShow()
	}

	const updateRelationValueShow = () => {
		state.handCards.map(card => {
			if (card.type === CARD_BASE_TYPE.ATTACK && card.baseValue) {
				let fixedValue = card.baseValue
				fixedValue = stateDamageFix(fixedValue, state.hero.stateList)
				fixedValue = stateGetDamageFix(fixedValue, state.enemy.stateList)
				card.fixedValue = fixedValue
			}
			if (card.type === CARD_BASE_TYPE.SKILL && card.baseValue) {
				card.fixedValue = stateDefenseFix(card.baseValue, state.hero.stateList)
			}
			card.checkCombo(fn)
		})
		if (state.enemy.action.intention === INTENTION.ATTACK && state.enemy.action.value) {
			let fixedValue = state.enemy.action.value
			fixedValue = stateDamageFix(fixedValue, state.enemy.stateList)
			fixedValue = stateGetDamageFix(fixedValue, state.hero.stateList)
			state.enemy.action.fixedValue = fixedValue
		}
	}

	const addCardIntoStack = (card, stack, positionType) => {
		switch (positionType) {
			case 1: stack.push(card); break
			case -1: stack.unshift(card); break
			default:
				let index = Math.floor(Math.random() * stack.length)
				stack.splice(index, 0, card)
		}
	}

	logFn(fn, state, refs)
	animFn(fn, state, refs)

	return fn
}



