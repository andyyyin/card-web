<template>
	<div class="card-container">
		<div class="card-display" @click.stop="onClickCard" :class="cardClassNames">
			<div class="top-row">
				<div class="card-cost" v-if="!card.unplayable && !card.xCost"
					 :class="{fixedUp: card.cost > card.baseCost, fixedDown: card.cost < card.baseCost}">
					{{card.cost === undefined ? card.baseCost : card.cost}}
				</div>
				<div class="card-cost" v-if="card.xCost">x</div>
				<div class="name">{{card.name}}</div>
			</div>
			<div class="desc">{{card.desc}}</div>
			<div class="bottom-row">
				<div class="feature">
					<div v-if="card.innate" class="icon innate">固</div>
					<div v-if="card.exhaust" class="icon exhaust">消</div>
					<div v-if="card.isRetain" class="icon retain">留</div>
					<div v-if="card.ethereal" class="icon ethereal">虚</div>
					<div v-if="card.areaAttack" class="icon area-attack">扫</div>
				</div>
				<div class="value" v-if="!isStatic"
					 :class="{up: card.fixedValue > card.baseValue, down: card.fixedValue < card.baseValue}">
					{{card.fixedValue}}{{card.attackTime !== undefined ? '×' + card.attackTime : ''}}
				</div>
				<div class="value" v-if="isStatic">{{card.baseValue}}{{card.attackTime !== undefined ? '×' + card.attackTime : ''}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import {CARD_BASE_TYPE} from "../../core/enum";

export default {
	props: {
		card: null,
		isStatic: false,
		isPrepared: false,
		isPerforming: false,
		cardLaunch: Function,
		cardPrepare: Function,
		locked: Boolean,
		isDisabled: false,
		onClick: Function,
	},
	computed: {
		cardClassNames () {
			let classList = []
			switch (this.card.type) {
				case CARD_BASE_TYPE.SKILL: classList.push('type-skill'); break
				case CARD_BASE_TYPE.ATTACK: classList.push('type-attack'); break
				case CARD_BASE_TYPE.ABILITY: classList.push('type-ability'); break
				case CARD_BASE_TYPE.STATE: classList.push('type-state'); break
			}
			if (this.isPerforming) classList.push('performing')
			if (this.isPrepared) classList.push('active')
			if (this.isDisabled) classList.push('disabled')
			if (this.card.comboFlag) classList.push('combo')
			return classList.join(' ')
		},
	},
	methods: {
		onClickCard () {
			this.onClick && this.onClick(this.card.id || this.card.name)
			if (this.locked) return
			if (this.isDisabled) return
			if (this.card.unplayable) return
			if (this.isPrepared || !this.cardPrepare) {
				this.cardLaunch && this.cardLaunch(this.card.id || this.card.name)
			} else {
				this.cardLaunch && this.cardPrepare(this.card.id || this.card.name)
			}
		},
	}
}
</script>
<style src="../../common/style/main.less"/>