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

		<battler-view :img="AI.img"/>


		<section v-if="hero.stateList.length" class="special-state-section down row-align">
			<state-icon v-for="state in filteredHeroStateList" :icon="state.icon || ''" :level="state.level || 1"/>
		</section>
		<section class="state-section row-align">
			<div class="power-display-container">
				<span>{{power.cur}}</span>
				<span>/</span>
				<span>{{power.base}}</span>
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
			<van-button type="primary" size="large" @click="endTheRound">结束回合</van-button>
		</section>

	</div>
</template>

<script setup>
import {reactive, ref, computed, onMounted} from 'vue'
import BattlerView from './BattlerView.vue'
import Strike from "../core/cards/strike";
import Defense from "../core/cards/defense";
import AT from '../core/function/arrayTools'
import Monster1 from "../core/ai/monster1";
import {INTENTION} from "../core/enum";
import BaseActor from "../core/actor/base";
import StrengthUp from "../core/cards/strengthUp";
import StateIcon from "./item/StateIcon.vue";

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

const AI = new Monster1()
const enemy = reactive(new BaseActor({
	name: 'enemy',
	hp: 100,
	mhp: 100,
	defense: 0,
	intention: 0,
	intentionValue: null,
	stateList: [],
}))

const hero = reactive(new BaseActor({
	name: 'hero',
	hp: 100,
	mhp: 100,
	defense: 0,
	stateList: [],
}))

const power = reactive({
	cur: 3,
	base: 3
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
	power.cur -= num
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
e.isDisabled = (card) => {
	return card.cost > power.cur
}

const handCards = reactive([
])

const drawStack = reactive(([
]))

const dropStack = reactive(([
	new Strike(),
	new Strike(),
	new Strike(),
	new Strike(),
	new StrengthUp(),
	new Defense(),
	new Defense(),
	new Defense(),
	new Defense()
]))

const activeCardId = ref(null)

const onClickCard = (id) => {
	let card = handCards.find(c => c.id === id)
	if (!card || e.isDisabled(card)) return
	if (id !== null && activeCardId.value === id) {
		console.log('use card', activeCardId.value)
		card.onLaunch(e)
		e.cost(card.cost)
		e.dropCard(card.id)
		activeCardId.value = null
	} else {
		activeCardId.value = id
	}
}

const startNewRound = () => {
	console.log('round start')
	hero.defense = 0
	power.cur = power.base
	e.drawCard(5)
	const actionParam = AI.prepare()
	enemy.intention = actionParam.intention
	enemy.intentionValue = actionParam.value
}

const endTheRound = () => {
	console.log('round end')
	let dropGroup = handCards.splice(0, handCards.length)
	dropStack.push(...dropGroup)
	hero.stateList.forEach(s => (s.active && s.onHostEndTurn && s.onHostEndTurn(e)))
	hero.filterState()
	enemy.defense = 0
	AI.action(e)
	startNewRound()
}

startNewRound()

onMounted(() => {
	document.addEventListener('click', () => {
		activeCardId.value = null
	})
})
</script>
<style src="../common/style/main.less"/>

