<template>
	<div class="state-icon" :class="iconClass" :style="style">
		<div v-if="level" class="level">{{level}}</div>
	</div>
</template>

<script>
export default {
	props: {
		icon: String,
		iconUrl: String,
		iconPic: String,
		iconStyle: {},
		level: Number,
		size: Number,
		comboFlag: Boolean,
		iconClass: String,
	},
	computed: {
		style () {
			const backgroundImage = this.iconUrl ||
				this.icon && `url(/src/assets/state-icon/${this.icon}.svg)` ||
				this.iconPic && `url(/src/assets/state-pic/${this.iconPic}.png)`
			const result = {
				backgroundImage,
				backgroundSize: (this.size || 18) + 'px',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				...this.iconStyle
			}
			if (this.comboFlag) {
				result.backgroundColor = 'rgba(0, 200, 0, .4)'
			}
			return result
		}
	}
}
</script>