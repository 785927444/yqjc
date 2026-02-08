<template>
  <div class="layout-row plr15 pb15">
    <div class="layout-col flex3">
      <l1 class="flex3 mb15" />
      <l2 class="flex2 mb15" />
      <l3 class="flex4" />
    </div>
    <div class="layout-col flex5 mlr15">
      <c1 class="flex1 mb15" />
      <c2 class="flex1 mb15" />
      <c3 class="flex1" />
    </div>
    <div class="layout-col flex3">
      <r1 class="flex1 mb15" />
      <r2 class="flex1 mb15" />
      <r3 class="flex1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from '@/views/async/photovoltaic/l1'
	import l2 from '@/views/async/photovoltaic/l2'
	import l3 from '@/views/async/photovoltaic/l3'
	import c1 from '@/views/async/photovoltaic/c1'
	import c2 from '@/views/async/photovoltaic/c2'
	import c3 from '@/views/async/photovoltaic/c3'
	import r1 from '@/views/async/photovoltaic/r1'
	import r2 from '@/views/async/photovoltaic/r2'
	import r3 from '@/views/async/photovoltaic/r3'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})

	onMounted(async() => {
    setTimeout(() => {
	    init()
    }, 100);
	  createScheduled('home', 10*60*1000, () => { init() })
	})

	const init = async() => {
    publicStore._public.pvData1 = [
      {name: '预测发电', data: [['00:00', 10], ['02:00', 20], ['04:00', 20], ['06:00', 40],['08:00', 40], ['10:00', 10], ['12:00', 15], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['24:00', 45]]}, 
      {name: '实际发电', data: [['00:00', 40], ['02:00', 30], ['04:00', 30], ['06:00', 50],['08:00', 20], ['10:00', 0], ['12:00', 5], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['24:00', 35]]},
    ]
    publicStore._public.pvData2 = [
      {name: '预测发电', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['09:00', 40], ['20:00', 35], ['22:00', 50],['24:00', 45]]}, 
      {name: '实际发电', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['09:00', 45], ['20:00', 25], ['22:00', 15],['24:00', 35]]},
    ]

    publicStore._public.orterData1 = [
      {name: '', data: [['00:00', 35], ['02:00', 36], ['04:00', 37], ['06:00', 37],['08:00', 37], ['10:00', 38], ['12:00', 36], ['14:00', 36],['16:00', 36], ['18:00', 35], ['20:00', 36], ['22:00', 35],['24:00', 37]]}, 
    ]
    publicStore._public.orterData2 = [
      {name: '', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['24:00', 35]]},
    ]

    publicStore._public.actionData1 = [
      {name: '', data: [['00:00', 0], ['02:00', 0], ['04:00', 0], ['06:00', 10],['08:00', 30], ['10:00', 50], ['12:00', 30], ['14:00', 20],['16:00', 10], ['18:00', 10], ['20:00', 10], ['22:00', 10],['24:00', 0]]}, 
    ]
    publicStore._public.actionData2 = [
      {name: '', data: [['00:00', 0], ['02:00', 0], ['04:00', 0], ['06:00', 10],['08:00', 30], ['10:00', 50], ['12:00', 40], ['14:00', 60],['16:00', 50], ['18:00', 40], ['20:00', 30], ['22:00', 20],['24:00', 10]]}, 
    ]

     publicStore._public.pwData = [
      {name: '集中式光伏', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['24:00', 45]]}, 
      {name: '分布式光伏', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['24:00', 35]]},
    ]
	}

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
