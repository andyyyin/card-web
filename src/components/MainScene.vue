<template>
	<div>
		<section class="state-section row-align">
			<div class="intention-display-container">
				<div class="intention-icon" :class="intentionClassName"/>
				<div class="action-name" v-show="e_act.name">{{e_act.name}}</div>
				<div class="action-value">
					<span :class="{up: e_act.fixedValue > e_act.value, down: e_act.fixedValue < e_act.value}">
						{{e_act.fixedValue}}
					</span>
					<span>{{e_act.time && e_act.time > 1 ? ('×' + e_act.time) : null}}</span>
				</div>
			</div>
			<div class="progress-container grow">
				<van-progress :percentage="state.enemy.hp * 100 / state.enemy.mhp" stroke-width="8" :pivot-text="state.enemy.hp + '/' + state.enemy.mhp" color="#ee0a24"/>
				<div class="anim-cover-mask" :ref="el => { if (el) refs.animEl.enemyHpMask = el }"></div>
			</div>
			<div class="defense-display-container" :class="{active: state.enemy.defense}">
				{{state.enemy.defense || ''}}
				<div class="anim-cover-mask" :ref="el => { if (el) refs.animEl.enemyDfMask = el }"></div>
			</div>
		</section>

		<battler-view
			:stateShowUpList="filteredEnemyStateList"
			:stateShowDownList="filteredHeroStateList"
			:stateShowDown2List="filteredHeroFStateList"
			:stateShowRightList="filteredBattleStateList"
			:img="state.enemy.ai && state.enemy.ai.img"
			:logs="state.logs"
			:words="state.enemy.action.words"
			:setAnimEl="(el, name) => { if (el) refs.animEl[name] = el}"
		/>

		<section class="state-section row-align">
			<div class="power-display-container">
				<span>{{state.powerCur}}</span>
				<span>/</span>
				<span>{{state.powerBase}}</span>
			</div>
			<div class="progress-container grow">
				<van-progress :percentage="state.hero.hp * 100 / state.hero.mhp" stroke-width="8" :pivot-text="state.hero.hp + '/' + state.hero.mhp"/>
				<div class="anim-cover-mask" :ref="el => { if (el) refs.animEl.heroHpMask = el }"></div>
			</div>
			<div class="defense-display-container" :class="{active: state.hero.defense}">
				{{state.hero.defense || ''}}
				<div class="anim-cover-mask" :ref="el => { if (el) refs.animEl.heroDfMask = el }"></div>
			</div>
		</section>

		<section class="card-section">
			<div class="operate-cards-panel" :ref="el => { if (el) refs.cardsPanel = el }">
				<transition-group :css="false" @before-enter="cardBeforeEnter" @leave="cardOnLeave" @enter="cardOnEnter" name="card-flip-list">
					<card
						v-for="card in state.handCards"
						:key="card.id"
						:card="card"
						:is-prepared="state.prepareCardId === card.id"
						:is-performing="state.performingId === card.id"
						:is-disabled="card.cost > state.powerCur"
						:card-launch="fn.launchCard"
						:card-prepare="cardPrepare"
						:locked="state.locked"
					/>
				</transition-group>
			</div>
		</section>

		<section class="card-stack-section">
			<div class="card-stack" :ref="el => { if (el) refs.drawStack = el }" @click="showDrawStack">
				<span class="title">抽牌堆</span>
				<span class="value">{{ state.drawStack.length }}</span>
			</div>
			<div class="card-stack" :ref="el => { if (el) refs.dropStack = el }" @click="showDropStack">
				<span class="title">弃牌堆</span>
				<span class="value">{{ state.dropStack.length }}</span>
			</div>
		</section>

		<section class="main-button-section">
			<van-button type="primary" size="large" @click="onClickEndTurn">结束回合</van-button>
		</section>

		<!-- 动态组件区 ↓↓↓↓↓↓ -->

		<selector v-bind="state.selector" v-model:show="state.selector.show"/>
		<game-map v-bind="state.map" v-model:show="state.map.show"/>

	</div>
</template>

<script setup>
import {reactive, ref, computed, onMounted, watchEffect, toRefs} from 'vue'
import { Dialog } from 'vant';
import BattlerView from './BattlerView.vue'
import Card from './item/Card.vue'
import Selector from './item/Selector.vue'
import GameMap from './item/Map.vue'
import {INTENTION} from "../core/enum";
import BaseActor from "../core/actor/base";
import G from "../core/game/index"
import anime from "../anime";
import battleFunctionsInit from "../core/battle"
import AT from "../core/function/arrayTools";
import Dark from "../core/state/dark";
import IronSword from "../core/state/ironSword";
import HamAmulet from "../core/state/hamAmulet";

const refs = {
	dropStack: null,
	drawStack: null,
	cardsPanel: null,
	battleMask: null,
	animEl: {
		attackMissile: null,
		battleView: null,
		enemyHpMask: null,
		enemyDfMask: null,
		heroHpMask: null,
		heroStateMask: null,
		enemyPower: null,
	},
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
	let result
	switch (state.enemy.action.intention) {
		case INTENTION.ATTACK: result = 'attack'; break
		case INTENTION.DEFENSE: result = 'defense'; break
		case INTENTION.BUFF: result = 'buff'; break
		case INTENTION.DEBUFF: result = 'debuff'; break
		case INTENTION.STAY: result = 'stay'; break
		case INTENTION.ATTACK_DEBUFF: result = 'attack-debuff'; break
		default:
	}
	if (state.enemy.action.subIntention) result += ' ' + state.enemy.action.subIntention
	return result
})
const e_act = computed(() => state.enemy.action)

const state = reactive({
	isGameOver: false,
	locked: false,
	powerBase: 3,
	powerCur: 3,
	turnNum: 0,
	battleActive: false,
	messageList: [],
	map: {
		show: false,
		active: false,
		onDone: () => {},
	},
	selector: {
		show: false,
		title: '',
		onSkip: null,
		cards: [],
		limit: [],
		onConfirm: () => {},
	},
	hero: Object.assign(new BaseActor(), {
		name: 'hero',
		hp: 100,
		mhp: 100,
		defense: 0,
		defeated: false,
		stateList: [],
	}),
	enemy: Object.assign(new BaseActor(), {
		name: 'enemy',
		hp: 100,
		mhp: 100,
		defense: 0,
		defeated: false,
		action: {
			intention: 0,
			subIntention: null,
			name: null,
			value: null,
			fixedValue: null,
			time: null,
			words: null,
			reset: function () {
				this.name = this.value = this.fixedValue = this.time = null
				this.intention = 0
			}
		},
		stateList: [],
		ai: null,
	}),
	battleStateList: [],
	handCards: [],
	drawStack: [],
	dropStack: [],
	exhaustedStack: [],
	usedStack: [],
	prepareCardId: null,
	performingId: null,
	logs: [],
	turnStat: {
		dropCard: 0,
		launchAttack: 0,
		reset: function () {
			this.dropCard = this.launchAttack = 0
		}
	},
	battleStat: {
		loseHpCount: 0,
		reset: function () {
			this.loseHpCount = 0
		}
	}
})
const filteredEnemyStateList = computed(() => state.enemy.stateList.filter(s => s.active))
const filteredHeroStateList = computed(() => state.hero.stateList.filter(s => s.active && !s.follow))
const filteredHeroFStateList = computed(() => state.hero.stateList.filter(s => s.active && s.follow))
const filteredBattleStateList = computed(() => state.battleStateList.filter(s => s.active))

watchEffect(() => {
	if (state.hero.defeated) {
		onFail().then()
	} else if (state.enemy.defeated) {
		onWin().then()
	}
})

const fn = battleFunctionsInit(state, refs)

const cardPrepare = id => state.prepareCardId = id

const onClickEndTurn = () => {
	if (state.locked) return
	;(async () => {
		await endTheTurn()
		if (!state.battleActive) return
		await enemyTurn()
		if (!state.battleActive) return
		await startNewTurn()
	})()
}

const showDrawStack = () => {
	const str = state.drawStack.map(c => `${c.baseCost} ${c.name} ${c.baseValue || ''}`).join('\r\n')
	alert(str)
}

const showDropStack = () => {
	const str = state.dropStack.map(c => `${c.baseCost} ${c.name} ${c.baseValue || ''}`).join('\r\n')
	alert(str)
}

const startNewTurn = async () => {
	state.locked = true

	state.turnNum++
	state.turnStat.reset()
	state.powerCur = state.powerBase
	await fn.drawCard(5)

	console.log('turn start')
	if (!state.hero.stateList.some(s => s.keepBlock)) {
		state.hero.defense = 0
	}
	await fn.enemyPrepareAction()
	await state.enemy.ai.onStartNewTurn(fn)

	for (let s of state.hero.stateList) s.active && await s.onHostStartTurn(fn)
	for (let s of allStateList()) s.active && await s.onHeroStartTurn(fn)

	fn.updateRelationValueShow()

	state.locked = false
}

const getActiveCards = () => [...state.handCards, ...state.dropStack, ...state.drawStack]
const allStateList = () => [...state.hero.stateList, ...state.enemy.stateList, ...state.battleStateList]

const endTheTurn = async () => {
	console.log('turn end')
	state.locked = true

	/* 玩家回合结束 */
	for (let c of state.handCards) await c.onHostEndTurn(fn)
	for (let c of getActiveCards()) await c.onTurnEnd(fn)

	for (let s of state.hero.stateList) s.active && await s.onHostEndTurn(fn)
	for (let s of state.enemy.stateList) s.active && await s.onOpponentEndTurn(fn)
	fn.filterState()

	/* 处理卡牌 */
	let retained = state.handCards.filter(c => c.isRetain)
	let toBeExhaust = state.handCards.filter(c => c.ethereal)
	let toBeDropped = state.handCards.filter(c => (!c.isRetain && !c.ethereal))

	for (let c of retained) await c.onRetain(fn)
	await fn.exhaustCard(toBeExhaust)
	await fn.dropCard(toBeDropped)

	state.locked = false
}

const enemyTurn = async () => {
	state.locked = true

	/* ai行动 */
	state.enemy.defense = 0
	await state.enemy.ai.action(fn)
	state.enemy.action.reset()

	/* ai回合结束 */
	for (let s of state.enemy.stateList) s.active && await s.onHostEndTurn(fn)
	for (let s of state.hero.stateList) s.active && await s.onOpponentEndTurn(fn)
	fn.filterState()

	state.locked = false
}

const onWin = async () => {
	if (!state.battleActive) return
	console.log('hero win')
	state.battleActive = false
	await Dialog.alert({message: 'WIN'})

	for (let c of state.handCards) await c.onLeaveFromHand(fn)
	for (let c of G.getCards()) {
		await c.onTurnEnd(fn)
		await c.onBattleEnd(fn)
	}
	state.handCards.splice(0, state.handCards.length)
	state.drawStack.splice(0, state.drawStack.length)
	state.dropStack.splice(0, state.dropStack.length)

	for (let s of state.hero.stateList) await s.onBattleEnd(fn)
	state.hero.stateList = state.hero.stateList.filter(s => s.follow)

	await rewardCardsSelector()
	await rewardCardsSelector()

	await mapEvent()
}

const onFail = async () => {
	if (!state.battleActive) return
	state.battleActive = false
	state.isGameOver = true
	await Dialog.alert({message: 'GAME OVER'})
}

const rewardCardsSelector = async () => {
	let options = G.getRandomCardsFromLib(3)
	// 这里卡牌的 constructor 所有没有 id，传过来的是 name
	let result = await fn.cardsSelector(options, {
		title: '选择一张卡牌加入牌组',
		skip: true,
	})
	if (!result) return
	let [name] = result
	let cardSample = options.find(c => c.name === name)
	G.addCardToGroup(cardSample)
}

const mapEvent = async () => {
	await showMap()
	const event = await G.getEvent()
	if (event.type === 0) {
		await startBattle(event.enemy)
	}
}

const showMap = async () => {
	await new Promise(resolve => {
		state.map.show = true
		state.map.active = true
		state.map.onDone = () => {
			resolve()
		}
	})
}

const createEnemy = async (Enemy) => {
	if (!Enemy) return false
	state.locked = true

	state.enemy.ai = new Enemy()
	state.enemy.hp = state.enemy.mhp = state.enemy.ai.mhp
	state.enemy.defeated = false
	state.enemy.reset()
	fn.pushLog('遭遇战 - ' + (state.enemy.ai.name || state.enemy.ai.img))

	state.locked = false
	return true
}

const startBattle = async (Enemy) => {
	if (await createEnemy(Enemy)) {
		state.locked = true
		state.drawStack.push(...AT.shuffleArray(G.getCards()))
		await fn.drawCard(10, card => card.innate)

		// 主角初始化
		state.hero.defense = 0
		state.battleStat.reset()

		console.log('new battle begin')
		state.turnNum = 0
		await state.enemy.ai.onDebut(fn)

		state.battleActive = true

		// todo 全局状态测试
		// fn.battlePushState(Dark)
		// fn.heroPushState(IronSword)
		fn.heroPushState(HamAmulet)

		state.locked = false
		await startNewTurn()
	} else {
		Dialog.alert({message: 'CLEARANCE'}).then(() => {
			window.location.reload()
		})
	}
}

G.gameInit().then(() => {
	mapEvent().then()
})

onMounted(() => {
	document.addEventListener('click', () => {
		state.prepareCardId = null
	})
})

</script>
<style src="../common/style/main.less"/>

