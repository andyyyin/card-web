<template>
	<div>
		<section class="state-section row-align">
			<div class="intention-display-container">
				<div class="intention-icon" :class="intentionClassName"/>
				<div class="action-name" v-show="state.enemy.actionName">{{state.enemy.actionName}}</div>
				<div class="action-value">{{state.enemy.actionValue}}</div>
			</div>
			<div class="progress-container grow">
				<van-progress :percentage="state.enemy.hp * 100 / state.enemy.mhp" stroke-width="8" :pivot-text="state.enemy.hp + '/' + state.enemy.mhp" color="#ee0a24"/>
			</div>
			<div class="defense-display-container" :class="{active: state.enemy.defense}">
				{{state.enemy.defense || ''}}
			</div>
		</section>

		<battler-view
			:stateShowUpList="filteredEnemyStateList"
			:stateShowDownList="filteredHeroStateList"
			:img="state.enemy.ai && state.enemy.ai.img"
			:logs="state.logs"
		/>

		<section class="state-section row-align">
			<div class="power-display-container">
				<span>{{state.powerCur}}</span>
				<span>/</span>
				<span>{{state.powerBase}}</span>
			</div>
			<div class="progress-container grow">
				<van-progress :percentage="state.hero.hp * 100 / state.hero.mhp" stroke-width="8" :pivot-text="state.hero.hp + '/' + state.hero.mhp"/>
			</div>
			<div class="defense-display-container" :class="{active: state.hero.defense}">
				{{state.hero.defense || ''}}
			</div>
		</section>

		<section class="card-section">
			<div class="hand-cards-panel" :ref="el => { if (el) refs.cardsPanel = el }">
				<transition-group :css="false" @before-enter="cardBeforeEnter" @leave="cardOnLeave" @enter="cardOnEnter" name="card-flip-list">
					<card
						v-for="(card, index) in state.handCards"
						:key="card.id"
						:card="card"
						:prepare-card-id="state.prepareCardId"
						:power-cur="state.powerCur"
						:card-launch="fn.launchCard"
						:card-prepare="cardPrepare"
						:index="index"
						:locked="state.locked"
					/>
				</transition-group>
			</div>
		</section>

		<section class="card-stack-section">
			<div class="card-stack" :ref="el => { if (el) refs.drawStack = el }">
				<span class="title">抽牌堆</span>
				<span class="value">{{ state.drawStack.length }}</span>
			</div>
			<div class="card-stack" :ref="el => { if (el) refs.dropStack = el }">
				<span class="title">弃牌堆</span>
				<span class="value">{{ state.dropStack.length }}</span>
			</div>
		</section>

		<section class="main-button-section">
			<van-button type="primary" size="large" @click="onClickEndTurn">结束回合</van-button>
		</section>

	</div>
</template>

<script setup>
import {reactive, ref, computed, onMounted, watchEffect, toRefs} from 'vue'
import {useRouter} from 'vue-router';
import { Dialog } from 'vant';
import BattlerView from './BattlerView.vue'
import Card from './item/Card.vue'
import AT from '../core/function/arrayTools'
import {CARD_BASE_TYPE, INTENTION} from "../core/enum";
import BaseActor from "../core/actor/base";
import G from "../core/game/index"
import {stateDamageFix, stateDefenseFix, stateGetDamageFix} from "../core/algorithm";
import anime from "../anime";
import battleFunctionsInit from "../core/battle"

const refs = {
	dropStack: null,
	drawStack: null,
	cardsPanel: null
}

const cardOnLeave = (el, done) => {
	anime.moveToTarget(el, refs.dropStack).then(done)
}
const cardBeforeEnter = (element) => {
	anime.cardsPositionToTarget(element, refs.drawStack)
}
const cardOnEnter = (el, done) => {
	anime.moveBack(el).then(done)
}

const intentionClassName = computed(() => {
	switch (state.enemy.intention) {
		case INTENTION.ATTACK: return 'attack'
		case INTENTION.DEFENSE: return 'defense'
		case INTENTION.BUFF: return 'buff'
		case INTENTION.DEBUFF: return 'debuff'
		case INTENTION.STAY: return 'stay'
		default: return state.enemy.intention
	}
})

const state = reactive({
	isGameOver: false,
	locked: false,
	powerBase: 3,
	powerCur: 3,
	turnNum: 0,
	messageList: [],
	hero: Object.assign(new BaseActor(), {
		name: 'hero',
		hp: 100,
		mhp: 100,
		defense: 0,
		stateList: [],
	}),
	enemy: Object.assign(new BaseActor(), {
		name: 'enemy',
		hp: 100,
		mhp: 100,
		defense: 0,
		intention: 0,
		actionName: null,
		actionValue: null,
		stateList: [],
		ai: null,
	}),
	handCards: [],
	drawStack: [],
	dropStack: [],
	consumedStack: [],
	usedStack: [],
	prepareCardId: null,
	logs: [],
})
const filteredEnemyStateList = computed(() => state.enemy.stateList.filter(s => s.active))
const filteredHeroStateList = computed(() => state.hero.stateList.filter(s => s.active))

watchEffect(() => {
	if (state.hero.hp <= 0) {
		state.isGameOver = true
		Dialog.alert({message: 'GAME OVER'}).then(() => {})
	} else if (state.enemy.hp <= 0) {
		onWin()
	}
})

const fn = battleFunctionsInit(state)

const cardPrepare = id => state.prepareCardId = id

const onClickEndTurn = () => {
	if (state.locked) return
	;(async () => {
		await endTheTurn()
		await startNewTurn()
	})()
}

const startNewTurn = async () => {
	state.locked = true

	state.turnNum++
	console.log('turn start')
	state.hero.defense = 0
	state.powerCur = state.powerBase
	await fn.drawCard(5)
	const actionParam = state.enemy.ai.prepare(fn)
	state.enemy.intention = actionParam.intention
	state.enemy.actionName = actionParam.name
	state.enemy.actionValue = actionParam.valueStr || actionParam.value
	state.enemy.ai.onStartNewTurn(fn)

	state.locked = false
}

const endTheTurn = async () => {
	console.log('turn end')
	state.locked = true

	/* 玩家回合结束 */
	for (let c of state.handCards) await c.onHandEndTurn(fn)
	let dropGroup = state.handCards.splice(0, state.handCards.length)
	state.dropStack.push(...dropGroup)
	for (let s of state.hero.stateList) s.active && await s.onHostEndTurn(fn)
	for (let s of state.enemy.stateList) s.active && await s.onOpponentEndTurn(fn)
	state.hero.filterState()

	/* ai行动 */
	state.enemy.defense = 0
	await state.enemy.ai.action(fn)

	/* ai回合结束 */
	for (let s of state.enemy.stateList) s.active && await s.onHostEndTurn(fn)
	for (let s of state.hero.stateList) s.active && await s.onOpponentEndTurn(fn)
	state.enemy.filterState()

	state.locked = false
}

const onWin = () => {
	console.log('hero win')
	state.handCards.splice(0, state.handCards.length)
	state.drawStack.splice(0, state.drawStack.length)
	state.dropStack.splice(0, state.dropStack.length)
	Dialog.alert({message: 'WIN'}).then(() => {
		// todo
		startBattle().then()
	})
}

const createEnemy = async () => {
	state.locked = true

	const NextEnemy = await G.getNextEnemy()
	if (!NextEnemy) return false
	state.enemy.ai = new NextEnemy()
	state.enemy.hp = state.enemy.mhp = state.enemy.ai.mhp
	state.enemy.reset()
	fn.pushLog('遭遇战 - ' + (state.enemy.ai.name || state.enemy.ai.img))

	state.locked = false
	return true
}

const startBattle = async () => {
	if (await createEnemy()) {
		state.dropStack.push(...G.getCards())
		// 主角初始化
		state.hero.defense = 0
		state.hero.stateList.splice(0, state.hero.stateList.length)
		console.log('new battle begin')
		state.turnNum = 0
		state.enemy.ai.onDebut(fn)
		await startNewTurn()
	} else {
		Dialog.alert({message: 'CLEARANCE'}).then(() => {
			window.location.reload()
		})
	}
}

startBattle().then()

onMounted(() => {
	document.addEventListener('click', () => {
		state.prepareCardId = null
	})
})

</script>
<style src="../common/style/main.less"/>

