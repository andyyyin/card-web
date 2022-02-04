import {stateDamageFix, stateDefenseFix, stateGetDamageFix} from "../algorithm";
import AT from "../function/arrayTools";
import {CARD_BASE_TYPE, INTENTION} from "../enum";
import logFn from "./log"
import statFn from "./stat"
import animFn from "./anim"
import CardsLib from '../cards'
import {waitFor} from "../function/common";

export default (state, refs) => {

	const fn = {}

	fn.heroChangeHp = (value) => {
		if (value < 0) state.battleStat.loseHpCount++
		state.hero.changeHp(value)
	}
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
		let damage = state.hero.getStrike(fixedValue)
		if (damage > 0) state.battleStat.loseHpCount++
		return damage
	}
	fn.pureStrikeHero = (value) => {
		let damage = state.hero.getStrike(value)
		if (damage > 0) state.battleStat.loseHpCount++
		return damage
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
	fn.getCurPower = () => state.powerCur

	fn.dropCard = async (param) => {
		const idList = Array.isArray(param) ? [...param] : [param]
		let id
		while ((id = idList.pop()) !== undefined) {
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
					card = state.drawStack.pop()
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
		let cost = card.xCost ? fn.getCurPower() : card.cost
		fn.cost(cost)
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

	fn.dropFilteredHandCards = async (filter) => {
		let tobeDropped = getFilteredHandCards(filter)
		for (let card of tobeDropped) {
			await fn.dropCard(card.id)
		}
		for (let card of tobeDropped) { // 等所有卡牌丢弃完成再触发效果
			await card.onDrop(fn)
		}
		state.turnStat.dropCard += tobeDropped.length
	}
	fn.dropRandomHandCard = async (count = 1, filter) => {
		let toBeDropped = getRandomHandCards(count, filter)
		for (let card of toBeDropped) {
			fn.pushLog('丢弃：' + card.name)
			await fn.dropCard(card.id)
		}
		for (let card of toBeDropped) { // 等所有卡牌丢弃完成再触发效果
			await card.onDrop(fn)
		}
		state.turnStat.dropCard += count
	}

	fn.dropSelectCard = async (count = 1, filter) => {
		if (!state.handCards.length) return
		let title = `选择${count}张卡丢弃`
		let idList = await fn.handCardsSelector(filter, {title, count})
		let cardList = []
		for (let id of idList) {
			cardList.push(state.handCards.find(c => c.id === id))
			await fn.dropCard(id)
		}
		for (let card of cardList) { // 等所有卡牌丢弃完成再触发效果
			await card.onDrop(fn)
		}
		state.turnStat.dropCard += count
	}

	fn.raiseCostRandomCard = (count, filter) => {
		let toBeRaised = getRandomHandCards(count, filter)
		for (let card of toBeRaised) {
			card.addCostFixInTurn(1)
		}
	}

	fn.handCardsSelector = (filter, options) => {
		let cards = getFilteredHandCards(filter)
		return fn.cardsSelector(cards, options)
	}

	fn.cardsSelector = (cards, {title, count, skip} = {}) => {
		if (!cards || !cards.length) return Promise.resolve()
		return new Promise(resolve => {
			state.selector.show = true
			state.selector.title = title || '选择一张卡牌'
			state.selector.limit = [count || 1]
			state.selector.cards = cards
			state.selector.onSkip = skip && (() => {
				resolve()
			})
			state.selector.onConfirm = (...params) => {
				resolve(...params)
			}
		})
	}

	/**
	 * 将一张手牌、弃牌堆或者抽牌堆中的卡牌取出插入抽牌堆
	 * @param {number} positionType -1：底部（最后抽到），1：顶部（马上抽到），其他：随机位置
	 * @param {number} id 卡牌id
	* */
	fn.putCardToDrawStack = async (positionType, id) => {
		let card = drawOutACard(id)
		switch (positionType) {
			case -1: state.drawStack.unshift(card); break;
			case 1: state.drawStack.push(card); break;
			default: AT.randomInsert(state.drawStack, card)
		}
		return card
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

	const getFilteredHandCards = (filter) => {
		if (!state.handCards.length) return []
		let cardList = [...state.handCards]
		if (filter && typeof filter === 'function') cardList = cardList.filter(filter)
		return cardList
	}

	const getRandomHandCards = (count = 1, filter) => {
		let cardList = getFilteredHandCards(filter)
		if (!cardList.length) return
		return AT.getRandomByCount(cardList, count)
	}

	const updateRelationValueShow = () => {
		state.handCards.map(card => {
			card.updateRel(fn)
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

	const drawOutACard = (id) => {
		let tIndex, card
		if ((tIndex = state.handCards.findIndex(c => c.id === id)) > -1) {
			card = state.handCards.splice(tIndex, 1)[0]
		} else if ((tIndex = state.dropStack.findIndex(c => c.id === id)) > -1) {
			card = state.dropStack.splice(tIndex, 1)[0]
		} else if ((tIndex = state.drawStack.findIndex(c => c.id === id)) > -1) {
			card = state.drawStack.splice(tIndex, 1)[0]
		}
		return card
	}

	logFn(fn, state, refs)
	statFn(fn, state, refs)
	animFn(fn, state, refs)

	return fn
}



