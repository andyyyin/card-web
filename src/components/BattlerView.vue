<template>
	<section class="battle-view" :style="battleViewStyle">
		<img class="actor-show" :src="`/src/assets/actor/${img}.png`" alt="">
	</section>
</template>
<script>
export default {
	props: {
		img: String,
	}
}
</script>
<script setup>
const battleViewScale = window.innerWidth + 'px';
const battleViewStyle = {width: battleViewScale, height: battleViewScale}
</script>
<style src="../common/style/main.less"/>
<style lang="less">
.battle-view{
	.actor-show{
		display: block;
		object-fit: contain;
	}
}
</style>
