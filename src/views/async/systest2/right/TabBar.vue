<template>
	<div class="ww100 flex-cc mt20" v-if="!isNull(configStore.user) && publicStore.active">
		<div class="ww100 flex-cc" v-if="!isNull(publicStore.active)&&publicStore.active.id">
			<div class="relative cursor plr10" @click.stop="handleSubmit()" v-if="configStore.user.role_id == '1' || (!isNull(publicStore.active)&&publicStore.active.station_num)">
				<img class="w50x5" src="@/assets/imgs/zz-s2.png" />
				<div class="ww100 hh100 flex-cc absolute z1 t0 l0 ppb2">保存用例</div>
			</div>
			<div class="relative cursor plr10"  @click.stop="handleNext()" v-if="!isNull(publicStore.active)&&publicStore.active.execute">
				<img class="w50x5" src="@/assets/imgs/zz-s2.png" />
				<div class="ww100 hh100 flex-cc absolute z1 t0 l0 ppb2">新建任务</div>
			</div>
		</div>
		<div v-else class="ww100 flex-cc">
			<div class="relative cursor plr10" @click.stop="publicStore.handleClick = 1" v-if="configStore.user.role_id == '1' || (!isNull(publicStore.active)&&publicStore.active.station_num)">
				<img class="w50x5" src="@/assets/imgs/zz-s2.png" />
				<div class="ww100 hh100 flex-cc absolute z1 t0 l0 ppb2">创建用例</div>
			</div>
		</div>
		<NextTask ref="nextTaskRef" />
	</div>
</template>

<script lang="ts" setup>
	import NextTask from './NextTask'
	import { checkStatus } from '@/utils/system'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	let nextTaskRef = $ref()
	const state = reactive({
		...publicStore.$state,
	})
	// 保存用例
	const handleSubmit = async() => {
		publicStore.active.attr.fields = []
		const check = await checkStatus()
		if(!check.status) return ElNotification({ title: '提示', message: `${check.msg}`, type: 'error' })
		if(proxy.isNull(publicStore.active.attr)) delete publicStore.active.attr
		let from = {...publicStore.active}
		from.attr = JSON.stringify(from.attr)
		let res = await proxy.handleApi('upd', from, 't_test_task')
		if(res.code == 200){
			ElNotification({ title: '提示', message: '操作成功', type: 'success' })
			publicStore.handleClick = -1
		}else{
			ElNotification({ title: '提示', message: '操作失败1', type: 'error' })
		}
	}

	// 下一步
	const handleNext = async() => {
		publicStore.active.attr.fields = []
		const check = await checkStatus()
		if(!check.status) return ElNotification({ title: '提示', message: `${check.msg}`, type: 'error' })
    nextTaskRef.onVisable()
	}

</script>

<style lang="scss">
 
</style>
