import {stateDamageFix, stateDefenseFix, stateGetDamageFix} from "../algorithm";
import AT from "../function/arrayTools";
import {CARD_BASE_TYPE, INTENTION} from "../enum";
import logFn from "./log"
import animFn from "./anim"
import CardsLib from '../cards'
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
	fn.strikeHero = async (value) => {
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.enemy.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.hero.stateList)
		for (let s of state.hero.stateList) await s.onGetStrike(fn)
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
	fn.strikeEnemy = async (value) => {
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.hero.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.enemy.stateList)
		for (let s of state.enemy.stateList) await s.onGetStrike(fn)
		return state.enemy.getStrike(fixedValue)
	}
	fn.pureStrikeEnemy = (value) => {
		return state.enemy.getStrike(value)
	}

	fn.StrikeOpponent = async (exState, value) => {
		if (state.hero.stateList.indexOf(exState) > -1) await fn.strikeEnemy(value)
		if (state.enemy.stateList.indexOf(exState) > -1) await fn.strikeHero(value)
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
		if (num > state.powerCur) return
		state.powerCur -= num
		console.log('power change -' + num)
	}
	fn.gainPower = (num = 1) => {
		state.powerCur += num
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
	fn.drawCard = async (count = 1, filter) => {
		const drawList = []
		while (count > 0) {
			if (state.drawStack.length > 0) {

				let card
				if (filter) {
					let tIndex = state.drawStack.findIndex(filter)
					if (tIndex === -1) break
					card = state.drawStack.splice(tIndex, 1)[0]
				} else {
					card = state.drawStack.shift()
				}

				if (await fn.pushCardToHand(card)) {
					console.log('draw card', card.id, card.name)
					// todo 抽到直接丢弃不触发抽牌效果？？待定
					await card.onDraw(fn)
				}
				drawList.push(card)
				count--
			} else if (state.dropStack.length > 0) {
				let cardSGroup = state.dropStack.splice(0, state.dropStack.length)
				state.drawStack.push(...AT.shuffleArray(cardSGroup))
				console.log('shuffle')
			}
		}
		updateRelationValueShow()
		return drawList
	}
	fn.pushCardToHand = async (card) => {
		state.handCards.push(card)
		await waitFor(250)
		if (state.handCards.length > 10) {
			await fn.dropCard(card.id)
			return false
		}
		return true
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
		} else if (card.exhaust) {
			await fn.exhaustCard(card.id)
		} else {
			await fn.dropCard(card.id)
		}
		if (card.type === CARD_BASE_TYPE.ATTACK) {
			state.turnStat.launchAttack++
		}
		for (let s of state.hero.stateList) await s.onLaunchCard(fn, card)
		for (let s of state.enemy.stateList) await s.onLaunchCard(fn, card)
		updateRelationValueShow()

		await card.afterLaunch(fn)
		updateRelationValueShow()
	}
	fn.numberOfHandCards = () => state.handCards.length

	fn.exhaustCard = async (id) => {
		let index, card
		if (((index = state.handCards.findIndex(c => c.id === id)) === -1)) return
		card = state.handCards[index]
		state.handCards.splice(index, 1)
		await card.onLeaveFromHand(fn)
		state.exhaustedStack.push(card)
	}

	fn.addCardIntoDrop = (card, positionType) => addCardIntoStack(card, state.dropStack, positionType)
	fn.addCardIntoDraw = (card, positionType) => addCardIntoStack(card, state.drawStack, positionType)
	fn.addCardIntoHand = (card, positionType) => addCardIntoStack(card, state.handCards, positionType)

	fn.getTurnNum = () => state.turnNum

	fn.dropHandCards = async (filter) => {
		if (!state.handCards.length) return
		let tobeDropped = filter ? state.handCards.filter(filter) : [...state.handCards]
		for (let card of tobeDropped) await fn.dropCard(card.id)
	}
	fn.dropRandomHandCard = async (count = 1, filter) => {
		if (!state.handCards.length) return
		let handCards = [...state.handCards]
		if (filter && typeof filter === 'function') handCards = handCards.filter(filter)
		if (!handCards.length) return
		let toBeDropped = AT.getRandomByCount(handCards, count)
		for (let card of toBeDropped) {
			fn.pushLog('丢弃：' + card.name)
			await fn.dropCard(card.id)
		}
		state.turnStat.dropCard += count
	}

	fn.raiseRandomCard = (filter) => {
		if (!state.handCards.length) return
		let handCards = [...state.handCards]
		if (filter && typeof filter === 'function') handCards = handCards.filter(filter)
		if (!handCards.length) return
		let toBeRaised = AT.getRandomOne(handCards)
		toBeRaised.addCostFixInTurn(1)
	}

	fn.handCardsSelector = ({title, onConfirm, count, onSkip}) => {
		state.selector.show = true
		state.selector.title = title
		state.selector.limit = [count || 1]
		state.selector.cards = [...state.handCards]
		state.selector.onSkip = onSkip
		state.selector.onConfirm = onConfirm
	}

	fn.dropSelectCard = async (count = 1, filter) => {
		if (!state.handCards.length) return
		await new Promise(resolve => {
			fn.handCardsSelector({
				title: `选择${count}张卡丢弃`,
				count,
				onConfirm: async (idList) => {
					for (let id of idList) {
						await fn.dropCard(id)
					}
					state.turnStat.dropCard += count
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

	fn.createCard = async (Card) => {
		const card = new Card()
		console.log('创建临时卡牌：' + card.name)
		await fn.pushCardToHand(card)
		return card
	}
	fn.createRandomCard = async (count = 1, filter) => {
		let list = filter ? Object.values(CardsLib).filter(filter) : Object.values(CardsLib)
		let tobeCreated = AT.getRandomByCount(list, count)
		let createdList = []
		for (let Card of tobeCreated) {
			createdList.push(await fn.createCard(Card))
		}
		return createdList
	}

	fn.getDroppedCountOfTurn = () => state.turnStat.dropCard
	fn.getLaunchAttCardCountOfTurn = () => state.turnStat.launchAttack

	const updateRelationValueShow = () => {
		state.handCards.map(card => {
			card.checkCombo(fn)
			if (card.type === CARD_BASE_TYPE.ATTACK && card.baseValue) {
				let fixedValue = card.baseValue
				fixedValue = stateDamageFix(fixedValue, state.hero.stateList)
				fixedValue = stateGetDamageFix(fixedValue, state.enemy.stateList)
				card.fixedValue = fixedValue
			}
			if (card.type === CARD_BASE_TYPE.SKILL && card.baseValue) {
				card.fixedValue = stateDefenseFix(card.baseValue, state.hero.stateList)
			}
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



