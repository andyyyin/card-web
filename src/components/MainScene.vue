<template>
	<div>
		<section class="state-section row-align">
			<div class="intention-display-container">
				<div class="intention-icon" :class="intentionClassName"/>
				<div class="intention-value">{{enemy.intentionValue}}</div>
			</div>
			<div class="progress-container grow">
				<van-progress :percentage="enemy.hp * 100 / enemy.mhp" stroke-width="8" :pivot-text="enemy.hp + '/' + enemy.mhp" color="#ee0a24"/>
			</div>
			<div class="defense-display-container" :class="{active: enemy.defense}">
				{{enemy.defense || ''}}
			</div>
		</section>
		<section class="special-state-section up row-align">
			<state-icon v-for="state in filteredEnemyStateList" :icon="state.icon || ''" :level="state.level || 1"/>
		</section>

		<battler-view :img="enemy.ai.img"/>


		<section v-if="hero.stateList.length" class="special-state-section down row-align">
			<state-icon v-for="state in filteredHeroStateList" :icon="state.icon || ''" :level="state.level || 1"/>
		</section>
		<section class="state-section row-align">
			<div class="power-display-container">
				<span>{{battle.powerCur}}</span>
				<span>/</span>
				<span>{{battle.powerBase}}</span>
			</div>
			<div class="progress-container grow">
				<van-progress :percentage="hero.hp * 100 / hero.mhp" stroke-width="8" :pivot-text="hero.hp + '/' + hero.mhp"/>
			</div>
			<div class="defense-display-container" :class="{active: hero.defense}">
				{{hero.defense || ''}}
			</div>
		</section>

		<section class="card-section">
			<div class="card-group-container">
				<div v-for="card in handCards" class="card-container" :key="card.id">
					<div class="card-display" @click.stop="onClickCard(card.id)" :class="cardClassNames(card)">
						<div>{{card.name}}</div>
						<div v-show="card.baseValue">({{card.baseValue}})</div>
						<div class="card-cost">{{card.cost}}</div>
					</div>
				</div>
			</div>
		</section>

		<section class="card-stack-section">
			<div class="card-stack">
				<span class="title">抽牌堆</span>
				<span class="value">{{ drawStack.length }}</span>
			</div>
			<div class="card-stack">
				<span class="title">弃牌堆</span>
				<span class="value">{{ dropStack.length }}</span>
			</div>
		</section>

		<section class="main-button-section">
			<van-button type="primary" size="large" @click="endTheTurn">结束回合</van-button>
		</section>

	</div>
</template>

<script setup>
import {reactive, ref, computed, onMounted, watchEffect} from 'vue'
import { Dialog } from 'vant';
import BattlerView from './BattlerView.vue'
import Strike from "../core/cards/strike";
import Defense from "../core/cards/defense";
import AT from '../core/function/arrayTools'
import Monster1 from "../core/ai/monster1";
import {CARD_BASE_TYPE, INTENTION} from "../core/enum";
import BaseActor from "../core/actor/base";
import StrengthUp from "../core/cards/strengthUp";
import StateIcon from "./item/StateIcon.vue";
import G from "../core/game/index"
import Wolf from "../core/ai/wolf";

const cardClassNames = (card) => {
	let result = [card.typeClassName]
	if (card.id === activeCardId.value) result.push('active')
	if (e.isDisabled(card)) result.push('disabled')
	return result.join(' ')
}

const intentionClassName = computed(() => {
	switch (enemy.intention) {
		case INTENTION.ATTACK: return 'attack'
		case INTENTION.DEFENSE: return 'defense'
		case INTENTION.BUFF: return 'buff'
		case INTENTION.DEBUFF: return 'debuff'
	}
})
const filteredEnemyStateList = computed(() => enemy.stateList.filter(s => s.active))
const filteredHeroStateList = computed(() => hero.stateList.filter(s => s.active))

const enemy = reactive(new BaseActor({
	name: 'enemy',
	hp: 100,
	mhp: 100,
	defense: 0,
	intention: 0,
	intentionValue: null,
	stateList: [],
	ai: new Wolf(),
}))

const hero = reactive(new BaseActor({
	name: 'hero',
	hp: 100,
	mhp: 100,
	defense: 0,
	stateList: [],
}))

const battle = reactive({
	isGameOver: false,
	powerBase: 3,
	powerCur: 3,
	turnNum: 0,
})

const handCards = reactive([])
const drawStack = reactive(([]))
const dropStack = reactive(([...G.getCards()]))
const consumedStack = reactive(([]))
const usedStack = reactive(([]))

const activeCardId = ref(null)

watchEffect(() => {
	if (hero.hp <= 0) {
		battle.isGameOver = true
		Dialog.alert({message: 'GAME OVER'}).then(() => {})
	} else if (enemy.hp <= 0) {
		onWin()
	}
})

const e = {}

e.heroChangeHp = hero.changeHp.bind(hero)
e.heroChangeDefense = hero.changeDefense.bind(hero)
e.heroPushState = hero.pushState.bind(hero)
e.strikeHero = hero.getStrike.bind(hero)

e.enemyChangeHp = enemy.changeHp.bind(enemy)
e.enemyChangeDefense = enemy.changeDefense.bind(enemy)
e.enemyPushState = enemy.pushState.bind(enemy)
e.strikeEnemy = enemy.getStrike.bind(enemy)

e.getHeroState = () => [...hero.stateList.filter(s => s.active)]
e.getEnemyState = () => [...enemy.stateList.filter(s => s.active)]

e.cost = (num) => {
	battle.powerCur -= num
	console.log('power change -' + num)
}
e.dropCard = (id) => {
	let index, card
	if (((index = handCards.findIndex(c => c.id === id)) > -1)) {
		[card] = handCards.splice(index, 1);
	} else if (((index = drawStack.findIndex(c => c.id === id)) > -1)) {
		[card] = drawStack.splice(index, 1);
	}
	console.log('drop card', card.id, card.name)
	if (card) dropStack.push(card)
}
e.drawCard = (count) => {
	if (drawStack.length > 0) {
		let card = drawStack.shift()
		handCards.push(card)
		console.log('draw card', card.id, card.name)
		if (count > 1) {
			e.drawCard(count - 1)
		}
	} else if (dropStack.length > 0) {
		let cardSGroup = dropStack.splice(0, dropStack.length)
		drawStack.push(...AT.shuffleArray(cardSGroup))
		console.log('shuffle')
		e.drawCard(count)
	}
}
e.launchCard = (id) => {
	let index, card
	if (((index = handCards.findIndex(c => c.id === id)) > -1)) {
		card = handCards[index]
	}
	if (!card) return
	console.log('launch card', activeCardId.value, card.name)
	card.onLaunch(e)
	e.cost(card.cost)
	if (card.type === CARD_BASE_TYPE.ABILITY) {
		handCards.splice(index, 1)
		usedStack.push(card)
	} else if (card.consume) {
		handCards.splice(index, 1)
		consumedStack.push(card)
	} else {
		e.dropCard(card.id)
	}
}

e.isDisabled = (card) => {
	return card.cost > battle.powerCur
}
e.getTurnNum = () => battle.turnNum

const onClickCard = (id) => {
	let card = handCards.find(c => c.id === id)
	if (!card || e.isDisabled(card)) return
	if (id !== null && activeCardId.value === id) {
		e.launchCard(id)
		activeCardId.value = null
	} else {
		activeCardId.value = id
	}
}

const startNewTurn = () => {
	battle.turnNum++
	console.log('turn start')
	hero.defense = 0
	battle.powerCur = battle.powerBase
	e.drawCard(5)
	const actionParam = enemy.ai.prepare(e)
	enemy.intention = actionParam.intention
	enemy.intentionValue = actionParam.value
}

const endTheTurn = () => {
	console.log('turn end')
	let dropGroup = handCards.splice(0, handCards.length)
	dropStack.push(...dropGroup)
	hero.stateList.forEach(s => (s.active && s.onHostEndTurn && s.onHostEndTurn(e)))
	hero.filterState()
	enemy.defense = 0
	enemy.ai.action(e)
	startNewTurn()
}

startNewTurn()

const onWin = () => {
	console.log('hero win')
	handCards.splice(0, handCards.length)
	drawStack.splice(0, drawStack.length)
	dropStack.splice(0, dropStack.length)
	Dialog.alert({message: 'WIN'}).then(() => {
		// todo
		startBattle()
	})
}

const startBattle = () => {
	hero.reset()
	enemy.reset()
	dropStack.push(...G.getCards())
	console.log('new battle begin')
	enemy.ai = new Monster1() // todo
	battle.turnNum = 0
	startNewTurn()
}

onMounted(() => {
	document.addEventListener('click', () => {
		activeCardId.value = null
	})
})
</script>
<style src="../common/style/main.less"/>

