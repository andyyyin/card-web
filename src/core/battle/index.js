import {stateDamageFix, stateDefenseFix, stateGetDamageFix} from "../algorithm";
import AT from "../function/arrayTools";
import {CARD_BASE_TYPE} from "../enum";
import logFn from "./log"

export default (state) => {

	const fn = {}

	fn.heroChangeHp = state.hero.changeHp.bind(state.hero)
	fn.heroPushState = state.hero.pushState.bind(state.hero)
	fn.heroChangeDefense = (value) => {
		const fixedValue = stateDefenseFix(value, state.hero.stateList)
		state.hero.changeDefense(fixedValue)
	}
	fn.strikeHero = (value) => {
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.enemy.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.hero.stateList)
		state.hero.stateList.map(state => state.onGetDamage())
		state.hero.getStrike(fixedValue)
	}
	fn.specialStrikeHero = (value) => {
		state.hero.getStrike(value)
	}

	fn.enemyChangeHp = state.enemy.changeHp.bind(state.enemy)
	fn.enemyPushState = state.enemy.pushState.bind(state.enemy)
	fn.enemyChangeDefense = (value) => {
		const fixedValue = stateDefenseFix(value, state.enemy.stateList)
		state.enemy.changeDefense(fixedValue)
	}
	fn.strikeEnemy = (value) => {
		let fixedValue = value
		fixedValue = stateDamageFix(fixedValue, state.hero.stateList)
		fixedValue = stateGetDamageFix(fixedValue, state.enemy.stateList)
		state.enemy.stateList.map(state => state.onGetDamage())
		state.enemy.getStrike(fixedValue)
	}
	fn.specialStrikeEnemy = (value) => {
		state.enemy.getStrike(value)
	}

	fn.getHeroState = () => [...state.hero.stateList.filter(s => state.active)]
	fn.getEnemyState = () => [...state.enemy.stateList.filter(s => state.active)]

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
			if (count > 1) {
				setTimeout(() => {
					fn.drawCard(count - 1)
				}, 100)
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
		card.onLaunch(fn)
		fn.cost(card.cost)
		if (card.type === CARD_BASE_TYPE.ABILITY) {
			state.handCards.splice(index, 1)
			state.usedStack.push(card)
		} else if (card.consume) {
			state.handCards.splice(index, 1)
			state.consumedStack.push(card)
		} else {
			await fn.dropCard(card.id)
		}
	}

	fn.addCardIntoDrop = (card, positionType) => addCardIntoStack(card, state.dropStack, positionType)
	fn.addCardIntoDraw = (card, positionType) => addCardIntoStack(card, state.drawStack, positionType)
	fn.addCardIntoHand = (card, positionType) => addCardIntoStack(card, state.handCards, positionType)

	fn.getTurnNum = () => state.turnNum


	const addCardIntoStack = (card, stack, positionType) => {
		switch (positionType) {
			case 1: stack.push(card); break
			case -1: stack.unshift(card); break
			default:
				let index = Math.floor(Math.random() * stack.length)
				stack.splice(index, 0, card)
		}
	}

	return {
		...fn,
		...logFn(state),
	}
}



