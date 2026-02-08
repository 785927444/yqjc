<template>
	<div class="layout-col">
		<!-- 头部 -->
		<div class="ww100 flex-sc mb15">
			<div class="ww12 relative cursor mr20" v-for="(v, i) in !isNull(publicStore.active)&&publicStore.active.id? state.tabs.filter(a=>a.value == publicStore.active.type) : state.tabs" :key="i" 
			@click.stop="publicStore.active = !isNull(publicStore._public)?{...publicStore._public.list.find(a=>a.type==v.value&&!a.station_num)} : {}; delete publicStore.active.id">
				<img class="ww100" src="@/assets/imgs/zz-s1.png" />
				<div class="absolute ww100 hh100 flex-cc t0 l0 z1 pb5 i7">{{ v.name }}</div>
				<div class="absolute ww100 hh94 flex-cc t0 l0 z2 black-rgba30" v-if="isNull(publicStore.active) || (!isNull(publicStore.active) && publicStore.active.type != v.value)"></div>
			</div>
			<div class="flex1 flex-ec" v-if="!isNull(publicStore.active)&&publicStore.active.id">
				<div class="plr20 i7 flex-col-cc cursor" @click.stop="proxy.toPath('/systestlog2', {type: publicStore.active.type, model_id: publicStore.active.id, status: '1', tab: '1'})">
					<span>正在执行</span>
					<span class="white mt12 f20">{{ !isNull(publicStore.active)&&publicStore.active.executeCount?publicStore.active.executeCount:'0' }}</span>
				</div>
				<div class="h50 flex-cc hidden mlr25">
					<img class="hh100 w2" src="@/assets/imgs/line.png" />
				</div>
				<div class="plr20 i7 flex-col-cc cursor" @click.stop="proxy.toPath('/systestlog2', {type: publicStore.active.type, model_id: publicStore.active.id, status: '2', tab: '2'})">
					<span>执行结束</span>
					<span class="white mt12 f20">{{ !isNull(publicStore.active)&&publicStore.active.completeCount?publicStore.active.completeCount:'0' }}</span>
				</div>
			</div>
		</div>
		<!-- 中部 -->
		<div class="layout-col" v-if="!isNull(publicStore.active)">
			<!-- 算法功能/准确性测试 -->
			<calc_1 v-if="publicStore.active.type == 'calc_1'" />
			<!-- 算法抗干扰能力 -->
			<calc_2 v-if="publicStore.active.type == 'calc_2'" />
		</div>
		<!-- 底部 -->
    <TabBar />
	</div>
</template>

<script lang="ts" setup>
  import Calc_1 from './calc_1'
	import Calc_2 from './calc_2'
	import TabBar from './../TabBar'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
		tabs: [
			{value: 'calc_1', name: '算法功能/准确性'},
			{value: 'calc_2', name: '算法抗干扰能力'},
		],
		model: 't_test_task',
	})

	watch(() => publicStore.active, async(val, old) => {
		if(proxy.isNull(val)) return
		if(!proxy.isNull(old) && old.id == val.id) return
		console.log("监控测试-算法")
		init()
	}, { immediate: false, deep: true });

	onMounted(async() => {
		console.log("初始化测试-算法")
		init()
	})

	const init = async() => {
		getAlgorithms()
		getDevicesData()
	}

	const getAlgorithms = async() => {
		let query = {model: 't_dict', args: `type='algorithm'`}
    let res = await publicStore.http({Api: query})
		publicStore._public.algorithms = proxy.isNull(res)? [] : res
	}

	const getDevicesData = async() => {
		if (proxy.isNull(publicStore._public.terminals)) return
		let key = publicStore._public.terminals.map((a) => { return "mo:Hash:sensor:" + a.id })
		let query = {model: "redis", key: key}
    let res = await publicStore.http({getApi: query})
		publicStore._public.terminals.forEach(vv => {
			let redis_exist = res.find(a=>a.sensor_id == vv.id)
			Object.assign(vv, redis_exist? redis_exist : {})
			if(!proxy.isNull(publicStore.active) && !proxy.isNull(publicStore.active.attr) && !proxy.isNull(publicStore.active.attr.terminal) && publicStore.active.attr.terminal == vv.id){
        vv.up_adjustable = publicStore.active.attr.up_adjustable? publicStore.active.attr.up_adjustable : ''
				vv.down_adjustable = publicStore.active.attr.down_adjustable? publicStore.active.attr.down_adjustable : ''
			}
		})
	} 

</script>

<style lang="scss">
 
</style>
