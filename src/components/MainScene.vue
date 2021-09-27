<template>
	<div>
		<section class="state-section row-align">
			<div class="grow">
				<van-progress :percentage="enemy.hp * 100 / enemy.mhp" stroke-width="8" :pivot-text="enemy.hp + '/' + enemy.mhp" color="#ee0a24"/>
			</div>
			<div class="defense-display-container" :class="{active: enemy.defense}">
				{{enemy.defense || ''}}
			</div>
		</section>

		<battler-view/>

		<section class="state-section row-align">
			<div class="power-display-container">
				<span>{{power.cur}}</span>
				<span>/</span>
				<span>{{power.base}}</span>
			</div>
			<div class="grow">
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
						<div>({{card.cost}})</div>
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
import {reactive, ref, useAttrs} from 'vue'
import BattlerView from './BattlerView.vue'
import Strike from "../core/cards/strike";
import Defense from "../core/cards/defense";
import AT from '../core/function/arrayTools'

const cardClassNames = (card) => {
	let result = [card.typeClassName]
	if (card.id === activeCardId) result.push('active')
	if (f.isDisabled(card)) result.push('disabled')
	return result.join(' ')
}

const enemy = reactive({
	hp: 99,
	mhp: 100,
	defense: 0,
})

const hero = reactive({
	hp: 100,
	mhp: 100,
	defense: 0,
})

const power = reactive({
	cur: 3,
	base: 3
})

const f = {}
f.strike = (value) => {
	enemy.hp -= value
}
f.defense = () => {
	hero.defense += 7
}
f.cost = (num) => {
	power.cur -= num
}
f.dropCard = (id) => {
	let index, card
	if (((index = handCards.findIndex(c => c.id === id)) > -1)) {
		[card] = handCards.splice(index, 1);
	} else if (((index = drawStack.findIndex(c => c.id === id)) > -1)) {
		[card] = drawStack.splice(index, 1);
	}
	if (card) dropStack.push(card)
}
f.drawCard = (count) => {
	if (drawStack.length > 0) {
		let card = drawStack.shift()
		handCards.push(card)
		if (count > 1) {
			f.drawCard(count - 1)
		}
	} else {
		let cardSGroup = dropStack.splice(0, dropStack.length)
		drawStack.push(...AT.shuffleArray(cardSGroup))
		f.drawCard(count)
	}
}
f.isDisabled = (card) => {
	return card.cost > power.cur
}

const handCards = reactive([
	new Strike(),
	new Strike(),
	new Strike(),
	new Strike(),
	new Defense(),
])

const drawStack = reactive(([
	new Strike(),
	new Defense(),
	new Defense(),
	new Defense()
]))

const dropStack = reactive(([]))

const activeCardId = ref(null)

const onClickCard = (id) => {
	let card = handCards.find(c => c.id === id)
	if (!card || f.isDisabled(card)) return
	if (id !== null && activeCardId.value === id) {
		console.log('use card', activeCardId.value)
		card.onLaunch(f)
		f.cost(card.cost)
		f.dropCard(card.id)
		activeCardId.value = null
	} else {
		activeCardId.value = id
	}
}

const startNewRound = () => {
	console.log('round start')
	hero.defense = 0
	power.cur = power.base
	f.drawCard(5)
}

const endTheRound = () => {
	console.log('round end')
	let dropGroup = handCards.splice(0, handCards.length)
	dropStack.push(...dropGroup)
	// todo run ai
	console.log('run ai')
	startNewRound()
}

</script>
<style src="../common/style/main.less"/>

