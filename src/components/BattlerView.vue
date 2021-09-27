<template>
	<section class="battle-view" :style="battleViewStyle">

	</section>
</template>

<script setup>
const battleViewScale = window.innerWidth + 'px';
const battleViewStyle = {width: battleViewScale, height: battleViewScale}
</script>
<style src="../common/style/main.less"/>

