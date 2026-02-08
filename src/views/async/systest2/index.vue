<template>
  <div class="layout-row p15">
    <left class="hh100 flex1 mr15" />
    <right class="hh100 flex4" />
  </div>
</template>

<script lang="ts" setup>
	import Left from './left'
	import Right from './right'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
</script>

<style lang="scss">
 
</style>
