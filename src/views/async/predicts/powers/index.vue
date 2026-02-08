<template>
  <div class="layout-row plr15 pb15">
    <div class="layout-col flex3">
      <l1 class="flex1 mb15" />
      <l2 class="flex1" />
    </div>
    <div class="layout-col flex8 ml15">
      <r1 class="flex1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
	import { getTime } from 'element-plus/es/components/countdown/src/utils.mjs'
  import l1 from './l1'
	import l2 from './l2'
	import r1 from './r1'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
    dw: '{m}-{d}',
	})

	onMounted(async() => {
    state.date = new Date().getTime()
    setTimeout(() => {
	    init()
    }, 100);
	  createScheduled('home', 10*60*1000, () => { init() })
	})

	const init = async() => {
    publicStore._public.powersRate = [
      {name: '光伏发电', value: 95, color: '#54CFF3', rate: '15%', key: 'count_A'},
      {name: '风力发电', value: 65, color: '#3E6AE3', rate: '25%', key: 'count_B'},
    ]

    publicStore._public.powersReal = [
      {name: '总发电', id:'', type: 'solid', data: [['00:00', 66], ['02:00', 86], ['04:00', 90], ['06:00', 95],['08:00', 105], ['10:00', 117], ['12:00', 126], ['14:00', 134],['16:00', 128], ['18:00', 112], ['20:00', 103], ['22:00', 94],['24:00', 75]]}, 
      {name: '总发电历史预测', id:'', type: 'dotted', data: [['00:00', 61], ['02:00', 71], ['04:00', 85], ['06:00', 90],['08:00', 90], ['10:00', 92], ['12:00', 121], ['14:00', 119],['16:00', 103], ['18:00', 98], ['20:00', 98], ['22:00', 89],['24:00', 70]]}, 
      {name: '用户1', id:'1', type: 'solid', data: [['00:00', 55], ['02:00', 76], ['04:00', 78], ['06:00', 58],['08:00', 68], ['10:00', 70], ['12:00', 68], ['14:00', 57],['16:00', 56], ['18:00', 56], ['20:00', 57], ['22:00', 58],['24:00', 57]]},
      {name: '用户1历史预测', id:'1', type: 'dotted', data: [['00:00', 50], ['02:00', 51], ['04:00', 53], ['06:00', 53],['08:00', 63], ['10:00', 65], ['12:00', 63], ['14:00', 52],['16:00', 51], ['18:00', 51], ['20:00', 52], ['22:00', 53],['24:00', 52]]}, 
      {name: '用户2', id:'2', type: 'solid', data: [['00:00', 44], ['02:00', 65], ['04:00', 64], ['06:00', 43],['08:00', 52], ['10:00', 50], ['12:00', 52], ['14:00', 43],['16:00', 44], ['18:00', 45], ['20:00', 42], ['22:00', 40],['24:00', 42]]},
      {name: '用户2历史预测', id:'2', type: 'dotted', data: [['00:00', 39], ['02:00', 40], ['04:00', 39], ['06:00', 38],['08:00', 47], ['10:00', 45], ['12:00', 47], ['14:00', 38],['16:00', 39], ['18:00', 40], ['20:00', 37], ['22:00', 35],['24:00', 37]]}, 
    ]

    publicStore._public.powersPredict1 = [
      {name: '总发电', id:'', data: [['00:00', 60], ['02:00', 100], ['04:00', 120], ['06:00', 150],['08:00', 130], ['10:00', 150], ['12:00', 160], ['14:00', 170],['16:00', 180], ['18:00', 190], ['20:00', 200], ['22:00', 190],['24:00', 180]]}, 
      {name: '用户1', id:'1', data: [['00:00', 55], ['02:00', 56], ['04:00', 57], ['06:00', 58],['08:00', 59], ['10:00', 60], ['12:00', 60], ['14:00', 60],['16:00', 58], ['18:00', 56], ['20:00', 54], ['22:00', 52],['24:00', 50]]},
      {name: '用户2', id:'2', data: [['00:00', 50], ['02:00', 51], ['04:00', 52], ['06:00', 53],['08:00', 54], ['10:00', 55], ['12:00', 55], ['14:00', 55],['16:00', 54], ['18:00', 52], ['20:00', 50], ['22:00', 48],['24:00', 46]]},
    ]
    publicStore._public.powersPredict2 = [
      {name: '总发电', id:'', data: [
        [proxy.parseTime(state.date+1*24*3600*1000, state.dw), 60], 
        [proxy.parseTime(state.date+2*24*3600*1000, state.dw), 64],
        [proxy.parseTime(state.date+3*24*3600*1000, state.dw), 66],
        [proxy.parseTime(state.date+4*24*3600*1000, state.dw), 60], 
        [proxy.parseTime(state.date+5*24*3600*1000, state.dw), 64],
        [proxy.parseTime(state.date+6*24*3600*1000, state.dw), 66],
        [proxy.parseTime(state.date+7*24*3600*1000, state.dw), 66],
      ]}, 
      {name: '用户1', id:'1', data: [
        [proxy.parseTime(state.date+1*24*3600*1000, state.dw), 52], 
        [proxy.parseTime(state.date+2*24*3600*1000, state.dw), 56],
        [proxy.parseTime(state.date+3*24*3600*1000, state.dw), 58],
        [proxy.parseTime(state.date+4*24*3600*1000, state.dw), 56], 
        [proxy.parseTime(state.date+5*24*3600*1000, state.dw), 54],
        [proxy.parseTime(state.date+6*24*3600*1000, state.dw), 52],
        [proxy.parseTime(state.date+7*24*3600*1000, state.dw), 56],
      ]}, 
      {name: '用户2', id:'2', data: [
        [proxy.parseTime(state.date+1*24*3600*1000, state.dw), 50], 
        [proxy.parseTime(state.date+2*24*3600*1000, state.dw), 48],
        [proxy.parseTime(state.date+3*24*3600*1000, state.dw), 48],
        [proxy.parseTime(state.date+4*24*3600*1000, state.dw), 48], 
        [proxy.parseTime(state.date+5*24*3600*1000, state.dw), 50],
        [proxy.parseTime(state.date+6*24*3600*1000, state.dw), 52],
        [proxy.parseTime(state.date+7*24*3600*1000, state.dw), 54],
      ]}, 
    ]
	}

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
