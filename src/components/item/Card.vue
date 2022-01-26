<template>
	<div class="card-container">
		<div class="card-display" @click.stop="onClickCard" :class="cardClassNames">
			<div class="name">{{card.name}}</div>
			<div class="value" v-if="card.baseValue && isStatic">{{card.baseValue}}</div>
			<div class="value" v-if="card.baseValue && !isStatic"
				 :class="{up: card.fixedValue > card.baseValue, down: card.fixedValue < card.baseValue}">
				{{card.fixedValue || card.baseValue}}
			</div>
			<div class="card-cost" v-if="!card.unplayable" :class="{fixed: card.fixedCost !== undefined}">
				{{card.cost}}
			</div>
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