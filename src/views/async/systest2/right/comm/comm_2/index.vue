<template>
	<div class="layout-row">
		<div class="hh100 flex1 flex-col hidden">
			<l1 class="ww100 flex2 flex-col" @init="init" @getChild="getChild" />
			<l3 class="ww100 flex1 flex-col" />
		</div>
		<r1 class="hh100 flex3 flex-col" @init="init" v-model:childs="state.childs" />
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
		model: 't_test_task',
	})

	watch(() => publicStore.active, async(val, old) => {
		if(proxy.isNull(val)) return
		if(!proxy.isNull(old) && old.id == val.id) return
		console.log("监控comm_2")
    init()
	}, { immediate: false, deep: true });

  onMounted(async() => {
		console.log("初始化comm_2")
    init()
  })

	const init = async() => { getChild() }

	const getChild = async() => {
		if(proxy.isNull(publicStore._public)) return
		if(proxy.isNull(publicStore._public.terminals)) return
		if(proxy.isNull(publicStore.active)) return
		if(proxy.isNull(publicStore.active.attr)) return
		if(proxy.isNull(publicStore.active.attr.terminal)) return
		let terminal = publicStore._public.terminals.find(a=>a.id == publicStore.active.attr.terminal)
		if(!terminal) return
		// if(!terminal.parent_type) {
		// 	state.childs = []
		// 	publicStore.active.attr.childs = []
		// 	return
		// }
		// 获取关联节点
		let query = {model: 't_sensor', args: `parent_id='${terminal.parent_type}'`}
		let nodes = await publicStore.http({Api: query})
		if(!proxy.isNull(nodes)){
      let ids = [...new Set(nodes.map(a => a.id))].map(a => `'${a}'`).join(',')
			let query = {model: 't_sensor', args: `parent_id IN (${ids})`}
			let devices = await publicStore.http({Api: query})
			if(!proxy.isNull(devices)){
				let childs = Array.from(
					devices.reduce((map, device) => {
						const group = map.get(device.type) || { type: device.type, meas: [], sensors: [] }
						group.sensors.push(device)
						map.set(device.type, group)
						return map
					}, new Map())
					.values()
				)
				let types = [...new Set(childs.map(a => a.type))].map(a => `'${a}'`).join(',')
				let query = {model: 't_sensor_template_measure_point', args: `sensor_type IN (${types})`}
        let res = await publicStore.http({Api: query})
				let meas = res.sort((a, b) => a.order - b.order)
				if(!proxy.isNull(meas)) childs.forEach(v => {v.meas = meas.filter(a=>a.sensor_type == v.type)})
				state.childs = childs
			}
		}
	} 

</script>

<style lang="scss">
 
</style>
