<template>
  <div class="layout-col plr15 pb15">
    <div class="layout-row flex1 hidden">
      <div class="flex1 hh100 hidden flex-sc mr15">
        <t1 class="flex1 hh100 mr15" />
        <t2 class="flex1 hh100" />
      </div>
      <t3 class="flex1 hh100 hidden" />
    </div>
    <div class="layout-row flex1 hidden mtb15">
      <div class="flex1 hh100 hidden flex-sc mr15">
        <c1 class="flex1 hh100 mr15" />
        <c2 class="flex1 hh100" />
      </div>
      <c3 class="flex1 hh100 hidden" />
    </div>
    <div class="layout-row flex1 hidden">
      <b1 class="flex1 hh100 mr15" />
      <b2 class="flex1 hh100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import t1 from './t1'
  import t2 from './t2'
  import t3 from './t3'
	import c1 from './c1'
  import c2 from './c2'
  import c3 from './c3'
	import b1 from './b1'
  import b2 from './b2'
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
	  createScheduled('response', 10*60*1000, () => { init() })
	})

	const init = async() => {
    publicStore._public.responsesRate1 = [
      {name: '日前响应', value: 62, color: '#54CFF3', rate: '62%', key: 'count_A'},
      {name: '日内响应', value: 20, color: '#3E6AE3', rate: '20%', key: 'count_B'},
      {name: '实时响应', value: 18, color: '#F9B74A', rate: '18%', key: 'count_C'},
    ]
    publicStore._public.responsesBar1 = [
      {name: '日前响应', value1: 35, value2: 12, value: 47},
      {name: '日内响应', value1: 21, value2: 26, value: 47 },
      {name: '实时响应', value1: 9, value2: 38, value: 47 },
    ]

    publicStore._public.responsesEnv1 = [
      {name: '基线负荷', data: [['11:30', 2750], ['12:00', 2780],['12:30', 2680]]}, 
      {name: '出清价格', data: [['11:30', 3.8], ['12:00', 3.9],['12:30', 3.8]]},
      {name: '目标负荷', data: [['11:30', 210], ['12:00', 220],['12:30', 180]]},
    ]
    publicStore._public.responsesEnv2 = [
      {name: '', data: [['00:00', 2800], ['00:30', 2750],['01:00', 2700], ['01:30', 2650],['02:00', 2600], ['02:30', 2550],['03:00', 2500], ['03:30', 2500],['04:00', 2500], ['04:30', 2550],['05:00', 2600], ['05:30', 2700],['06:00', 2850], ['06:30', 3050],['07:00', 3300], ['07:30', 3600],['08:00', 3900], ['08:30', 4200],['09:00', 4500], ['09:30', 4700],['10:00', 4800], ['10:30', 4850],['11:00', 4800], ['11:30', 4700],['12:00', 4500], ['12:30', 4300],['13:00', 4100], ['13:30', 3900],['14:00', 3700], ['14:30', 3500],['15:00', 3300], ['15:30', 3100],['16:00', 2900], ['16:30', 2700],['17:00', 2500], ['17:30', 2700],['18:00', 3000], ['18:30', 3300],['19:00', 3600], ['19:30', 3900],['20:00', 4200], ['20:30', 4400],['21:00', 4500], ['21:30', 4500],['22:00', 4400], ['22:30', 4200],['23:00', 3900], ['23:30', 3600]]}, 
    ]

    publicStore._public.responsesRate2 = [
      {name: '日前响应应邀', value: 47, color: '#54CFF3', rate: '47%', key: 'count_A'},
      {name: '日内响应应邀', value: 23, color: '#3E6AE3', rate: '23%', key: 'count_B'},
      {name: '实时响应应邀', value: 20, color: '#F9B74A', rate: '20%', key: 'count_C'},
      {name: '未应邀', value: 10, color: '#FF60E7', rate: '10%', key: 'count_D'},
    ]
    publicStore._public.responsesLoads = [
      {name: '基线负荷', id:'1', data: [['11:30', 2750],['12:00', 2780],['12:30', 2680]]}, 
      {name: '实际负荷', id:'2', data: [['11:30', 2850], ['12:00', 2880],['12:30', 2780]]},
    ]
    publicStore._public.responsesInvit1 = [
      {name: '基线负荷', data: [['11:30', 2750], ['12:00', 2780],['12:30', 2680]]}, 
      {name: '出清价格', data: [['11:30', 3.8], ['12:00', 3.9],['12:30', 3.8]]},
      {name: '目标负荷', data: [['11:30', 210], ['12:00', 220],['12:30', 180]]},
    ]
    publicStore._public.responsesInvit2 = [
      {name: '基线负荷', data: [['19:30', 2550], ['20:00', 2580],['20:30', 2580]]}, 
      {name: '出清价格', data: [['19:30', 3.8], ['20:00', 3.8],['20:30', 3.8]]},
      {name: '目标负荷', data: [['19:30', 500], ['20:00', 500],['20:30', 500]]},
    ]

    publicStore._public.responsesInvits = [
      {date: '2025-07-01', type: '1', timeRange: '08:00-18:00', value: '-500', status: '1', rate: '-300/--', new: '1'}, 
      {date: '2025-07-01', type: '0', timeRange: '09:00-19:00', value: '-300', status: '2', rate: '-500/-500', new: '1'}, 
      {date: '2025-06-30', type: '', timeRange: '', value: '', status: '3', rate: '-300/--', new: '0'}, 
      {date: '2025-06-30', type: '', timeRange: '', value: '', status: '3', rate: '-300/--', new: '0'}, 
      {date: '2025-06-30', type: '', timeRange: '', value: '', status: '3', rate: '-300/--', new: '0'}, 
    ]
    publicStore._public.responsesPowers = [
      {name: '居民用电', time: '5', num: '2', cap: '2500', power: '500'}, 
      {name: '工业用电', time: '10', num: '4', cap: '3500', power: '1000'}, 
      {name: '商业用电', time: '8', num: '3', cap: '3000', power: '800'}, 
      {name: '农业用电', time: '6', num: '2', cap: '2600', power: '600'}, 
    ]

	}

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
