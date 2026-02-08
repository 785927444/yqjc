<template>
	<div class="layout-row">
		<div class="hh100 flex1 flex-col hidden">
			<l1 class="ww100 flex2 flex-col" @init="init" @getChild="getChild" />
			<l3 class="ww100 flex1 flex-col" />
		</div>
		<r1 class="hh100 flex3 flex-col" />
	</div>
</template>

<script lang="ts" setup>
  import l1 from '../../L1'
	import l3 from '../../L3'
	import r1 from '../../R1'
	import { getChild } from '@/utils/system'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const dictStore = proxy.dictStore()
	const state = reactive({
		...publicStore.$state,
		model: 't_test_task',
	})

	watch(() => publicStore.active, async(val, old) => {
		if(proxy.isNull(val)) return
		if(!proxy.isNull(old) && old.id == val.id) return
		console.log("监控enti_2")
    init(true)
	}, { immediate: false, deep: true });

  onMounted(async() => {
		console.log("初始化enti_2")
    init(true)
  })

	const init = async(status?: any) => { getChild(status) }

</script>

<style lang="scss">
 
</style>
