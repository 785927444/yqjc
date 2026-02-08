<template>
  <div class="layout-col">
		<div class="flex-col hh100 ww100">
			<l1 class="flex1 mb15" />
			<l2 class="flex1 mb15" />
			<l3 class="flex1" />
		</div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from './l1'
	import l2 from './l2'
	import l3 from './l3'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
</script>

<style scoped lang="scss">

</style>
