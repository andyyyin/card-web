import {stateDamageFix, stateDefenseFix, stateGetDamageFix} from "../algorithm";
import AT from "../function/arrayTools";
import {CARD_BASE_TYPE, INTENTION} from "../enum";
import logFn from "./log"
import statFn from "./stat"
import animFn from "./anim"
import G from '../game'
import {waitFor} from "../function/common";
import BlockDraw from "../state/blockDraw";

export default (state, refs) => {

	const fn = {}

	fn.heroChangeHp = async (value) => {
		state.hero.changeHp(value)
		if (value < 0) {
			state.battleStat.loseHpCount++
			await fn.anim.getAttack(true)
		}
		if (state.hero.hp <= 0) state.hero.lose()
	}
	fn.heroPushState = (...params) => {
		statePush(state.hero.stateList, ...params)
	}
	fn.heroChangeDefense = (value) => {
		const fixedValue = stateDefenseFix(value, state.hero.stateList)
		state.hero.changeDefense(fixedValue)
	}
	fn.strikeHero = async (value) => {
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.enemy.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.hero.stateList)
		const damage = await fn.pureStrikeHero(fixedValue)
		for (let s of state.hero.stateList) s.active && await s.onGetStrike(fn)
		for (let s of state.enemy.stateList) s.active && await s.onHostLaunchAttack(fn, damage)
		for (let s of allStateList()) s.active && await s.onEnemyLaunchAttack(fn, damage)
		return damage
	}
	fn.pureStrikeHero = async (value) => {
		let damage = state.hero.handleDefense(value)
		for (let s of state.hero.stateList) s.active && (damage = await s.finalDamageFilter(fn, damage))
		await fn.heroChangeHp(-damage)
		return damage
	}

	fn.enemyChangeHp = async (value) => {
		state.enemy.changeHp(value)
		if (value < 0) {
			await fn.anim.enemyGetAttack(true)
		}
		if (state.enemy.hp <= 0) for (let s of state.enemy.stateList) s.active && await s.onHpEmpty(fn)
		if (state.enemy.hp <= 0) {
			state.enemy.lose()
		} else {
			await state.enemy.ai.afterGetDamage(fn)
		}
	}
	fn.enemyPushState = (...params) => {
		statePush(state.enemy.stateList, ...params)
	}
	fn.enemyChangeDefense = (value) => {
		const fixedValue = stateDefenseFix(value, state.enemy.stateList)
		state.enemy.changeDefense(fixedValue)
	}
	fn.strikeEnemy = async (value, isThrough) => {
		await fn.anim.attack()
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.hero.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.enemy.stateList)
		let damage = await fn.pureStrikeEnemy(fixedValue, isThrough)
		for (let s of state.enemy.stateList) s.active && await s.onGetStrike(fn)
		for (let s of state.hero.stateList) s.active && await s.onHostLaunchAttack(fn, damage)
		for (let s of allStateList()) s.active && await s.onHeroLaunchAttack(fn, damage)
		return damage
	}
	fn.pureStrikeEnemy = async (value, isThrough) => {
		let damage = state.enemy.handleDefense(value)
		for (let s of state.enemy.stateList) s.active && (damage = await s.finalDamageFilter(fn, damage, isThrough))
		await fn.enemyChangeHp(-damage)
		return damage
	}

	fn.StrikeOpponent = async (exState, value) => {
		if (state.hero.stateList.indexOf(exState) > -1) await fn.strikeEnemy(value)
		if (state.enemy.stateList.indexOf(exState) > -1) await fn.strikeHero(value)
	}

	fn.opponentPushState = async (exState, State, value) => {
		if (state.hero.stateList.indexOf(exState) > -1) await fn.enemyPushState(State, value)
		if (state.enemy.stateList.indexOf(exState) > -1) await fn.heroPushState(State, value)
	}
	fn.hostPushState = async (exState, State, value) => {
		if (state.hero.stateList.indexOf(exState) > -1) await fn.heroPushState(State, value)
		if (state.enemy.stateList.indexOf(exState) > -1) await fn.enemyPushState(State, value)
	}

	fn.heroFindState = (State) => state.hero.findState(State)
	fn.enemyFindState = (State) => state.enemy.findState(State)

	fn.battlePushState = (State, param) => {
		statePush(state.battleStateList, State, param)
	}
	fn.filterState = () => {
		filterState(state.battleStateList)
		filterState(state.hero.stateList)
		filterState(state.enemy.stateList)
	}

	fn.hostChangeHp = async (exState, value) => {
		if (state.hero.stateList.indexOf(exState) > -1) await fn.heroChangeHp(value)
		if (state.enemy.stateList.indexOf(exState) > -1) await fn.enemyChangeHp(value)
	}

	fn.cost = (num) => {
		if (num > state.powerCur) return
		state.powerCur -= num
		console.log('power change -' + num)
	}
	fn.gainPower = (num = 1) => {
		state.powerCur += num
	}

	fn.dropCard = async (param) => {
		let idList = handleCardParamToId(param)
		let cardList = idList.map(id => drawOutACard(id)).filter(c => !!c)
		if (!cardList.length) return
		state.dropStack.push(...cardList)
		for (let card of cardList) await card.onLeaveFromHand(fn)
		return cardList
	}

	fn.dropCardWithEvent = async (param) => {
		let cardList = await fn.dropCard(param)
		for (let card of cardList) await card.onDrop(fn) // 等所有卡牌丢弃完成再触发效果
		state.turnStat.dropCard += cardList.length
	}

	fn.drawCard = async (count = 1, filter) => {
		if (fn.heroFindState(BlockDraw)) {
			console.log('已阻止抽牌')
			return []
		}
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

				if (await pushCardToHand(card)) {
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
	fn.launchCard = async (id) => {
		state.locked = true
		if (state.prepareCardId === id) state.prepareCardId = null
		let index, card
		if (((index = state.handCards.findIndex(c => c.id === id)) > -1)) {
			card = state.handCards[index]
		}
		if (!card) return
		console.log('launch card', id, card.name)
		state.performingId = id
		await card.onLaunch(fn)
		let cost = card.xCost ? fn.getCurPower() : card.cost
		fn.cost(cost)
		state.performingId = null
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
		for (let s of state.hero.stateList) s.active && await s.onLaunchCard(fn, card)
		for (let s of state.enemy.stateList) s.active && await s.onLaunchCard(fn, card)
		updateRelationValueShow()

		await card.afterLaunch(fn)
		updateRelationValueShow()

		while (card.extraLaunchCount > 0) {
			await card.onLaunch(fn)
			await card.afterLaunch(fn)
			card.extraLaunchCount--
		}
		state.locked = false
	}

	fn.exhaustCard = async (param) => {
		let idList = handleCardParamToId(param)
		let cardList = idList.map(id => drawOutACard(id))
		state.exhaustedStack.push(...cardList)
		for (let card of cardList) await card.onLeaveFromHand(fn)
	}

	fn.addCardIntoDrop = (card, positionType) => addCardIntoStack(card, state.dropStack, positionType)
	fn.addCardIntoDraw = (card, positionType) => addCardIntoStack(card, state.drawStack, positionType)

	fn.dropFilteredHandCards = async (filter) => {
		let tobeDropped = getFilteredHandCards(filter)
		await fn.dropCardWithEvent(tobeDropped)
	}
	fn.dropRandomHandCard = async (count = 1, filter) => {
		let tobeDropped = getRandomHandCards(count, filter)
		await fn.dropCardWithEvent(tobeDropped)
	}

	fn.dropSelectCard = async (count = 1, filter) => {
		if (!state.handCards.length) return
		let title = `选择${count}张卡丢弃`
		let idList = await fn.handCardsSelector(filter, {title, count})
		await fn.dropCardWithEvent(idList)
	}

	fn.raiseCostRandomCard = (count, filter) => {
		let toBeRaised = getRandomHandCards(count, filter)
		for (let card of toBeRaised) {
			card.addCostFixOfTurn(1)
		}
	}

	fn.freeAllHandCardsThisTurn = () => {
		for (let card of state.handCards) {
			card.addCostFixOfTurn(-card.cost)
		}
	}

	fn.handCardsSelector = async (filter, options) => {
		let cards = getFilteredHandCards(filter)
		return await fn.cardsSelector(cards, options)
	}

	fn.cardsSelector = (cards, {title, count, skip, limit} = {}) => {
		if (!cards || !cards.length) return Promise.resolve()
		return new Promise(resolve => {
			state.selector.show = true
			state.selector.title = title || '选择一张卡牌'
			state.selector.limit = limit || [count || 1]
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

	fn.enemyPrepareAction = async () => {
		const actionParam = state.enemy.ai.prepare(fn)
		state.enemy.action.intention = actionParam.intention
		state.enemy.action.name = actionParam.name
		state.enemy.action.value = actionParam.value
		state.enemy.action.fixedValue = actionParam.value
		state.enemy.action.time = actionParam.time
		await state.enemy.ai.onStartNewTurn(fn)
		updateRelationValueShow()
	}

	fn.createCard = async (Card) => {
		const card = new Card()
		console.log('创建临时卡牌：' + card.name)
		await pushCardToHand(card)
		return card
	}
	fn.createRandomCard = async (count = 1, filter) => {
		let tobeCreated = G.getRandomCardsFromLib(count, filter)
		let createdList = []
		for (let Card of tobeCreated) {
			createdList.push(await fn.createCard(Card))
		}
		return createdList
	}

	fn.retainHandCards = (idList) => {
		for (let id of idList) {
			let card = state.handCards.find(c => c.id === id)
			card.retainOnce()
		}
	}

	fn.copyCard = async (param) => {
		let cardList = handleCardParamToCard(param)
		for (let card of cardList) {
			let copy = new card.constructor()
			Object.assign(copy, card)
			await pushCardToHand(copy)
		}
	}

	const pushCardToHand = async (card) => {
		state.handCards.push(card)
		await waitFor(250)
		if (state.handCards.length > 10) {
			await fn.dropCard(card.id)
			return false
		}
		return true
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
		if ([INTENTION.ATTACK, INTENTION.ATTACK_DEBUFF].includes(state.enemy.action.intention) && state.enemy.action.value) {
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

	const findCardById = (id) => {
		let result = state.handCards.find(c => c.id === id)
		if (!result) result = state.dropStack.find(c => c.id === id)
		if (!result) result = state.drawStack.find(c => c.id === id)
		return result
	}

	const handleCardParamToId = (param) => {
		let list = Array.isArray(param) ? param : [param]
		return list.map(item => typeof item === 'number' ? item : item.id)
	}

	const handleCardParamToCard = (param) => {
		let list = Array.isArray(param) ? param : [param]
		return list.map(item => typeof item === 'number' ? findCardById(item) : item)
	}

	const allStateList = () => {
		return [...state.hero.stateList, ...state.enemy.stateList, ...state.battleStateList]
	}

	const filterState = function (list) {
		let filteredList = list.filter(s => s.active)
		filteredList.sort((a, b) => b.priority - a.priority)
		list.splice(0, list.length, ...filteredList)
	}

	const statePush = (list, State, param) => {
		if (typeof State !== 'function') return

		let exist = list.find(s => s.active && s instanceof State)
		if (exist) {
			exist.onSuperposition(param)
		} else {
			list.push(new State(param))
		}
		filterState(list)
	}

	logFn(fn, state, refs)
	statFn(fn, state, refs)
	animFn(fn, state, refs)

	console.log(fn.anim);

	return fn
}



