<template>
	<div class="layout-row">
		<div class="hh100 flex1 flex-col hidden">
			<l1 class="ww100 flex2 flex-col" />
			<l3 class="ww100 flex1 flex-col" />
		</div>
		<r1 class="hh100 flex3 flex-col" />
	</div>
</template>

<script lang="ts" setup>
  import l1 from '../../L1'
	import l3 from '../../L3'
	import r1 from './r1'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const dictStore = proxy.dictStore()
	const state = reactive({
		...publicStore.$state,
	})

</script>

<style lang="scss">
 
</style>
