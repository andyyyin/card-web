<template>
	<div class="card-container">
		<div class="card-display" @click.stop="onClickCard" :class="cardClassNames">
			<div class="top-row">
				<div class="card-cost" v-if="!card.unplayable && !card.xCost"
					 :class="{fixedUp: card.cost > card.baseCost, fixedDown: card.cost < card.baseCost}">
					{{card.cost}}
				</div>
				<div class="card-cost" v-if="card.xCost">x</div>
				<div class="name">{{card.name}}</div>
			</div>
			<div class="desc">{{card.desc}}</div>
			<div class="value" v-if="!isStatic"
				 :class="{up: card.fixedValue > card.baseValue, down: card.fixedValue < card.baseValue}">
				{{card.fixedValue || card.baseValue}}{{card.attackTime !== undefined ? '×' + card.attackTime : ''}}
			</div>
			<div class="value" v-if="isStatic">{{card.baseValue}}{{card.attackTime !== undefined ? '×' + card.attackTime : ''}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		card: Object,
		isStatic: false,
		isPrepared: false,
		cardLaunch: Function,
		cardPrepare: Function,
		locked: Boolean,
		isDisabled: false,
		onClick: Function,
	},
	computed: {
		cardClassNames () {
			let result = [this.card.typeClassName]
			if (this.isPrepared) result.push('active')
			if (this.isDisabled) result.push('disabled')
			if (this.card.comboFlag) result.push('combo')
			return result.join(' ')
		},
	},
	methods: {
		onClickCard () {
			this.onClick && this.onClick(this.card.id)
			if (this.locked) return
			if (this.isDisabled) return
			if (this.card.unplayable) return
			if (this.isPrepared || !this.cardPrepare) {
				this.cardLaunch && this.cardLaunch(this.card.id)
			} else {
				this.cardLaunch && this.cardPrepare(this.card.id)
			}
		},
	}
}
</script>
<style src="../../common/style/main.less"/>