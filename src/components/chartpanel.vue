<template>
	<div class="chart">
		<div class="chart_title" v-if="title">{{title}}</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		defineEmits,
		defineProps
	} from 'vue'

	//外部参数
	const props = defineProps({
		title: String
	})
</script>

<style>
</style>
