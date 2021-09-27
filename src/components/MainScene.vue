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
				<span>{{power.max}}</span>
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
					<div class="card-display" @click.stop="onClickCard(card.id)" :class="{active: card.id === activeCardId, disabled: f.isDisabled(card)}">
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
				<span class="value">{{ usedStack.length }}</span>
			</div>
		</section>

	</div>
</template>

<script setup>
import {reactive, ref, useAttrs} from 'vue'
import BattlerView from './BattlerView.vue'
import Strike from "../core/cards/strike";
import Defense from "../core/cards/defense";

defineProps({
})

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
	max: 3
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
	if (card) usedStack.push(card)
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

const usedStack = reactive(([]))

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

const attrs = useAttrs()
</script>
<style src="../common/style/main.less"/>

