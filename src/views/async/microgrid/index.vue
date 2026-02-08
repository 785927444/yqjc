<template>
  <div class="layout-row plr15 pb15">
    <div class="layout-col flex3">
      <l1 class="flex1 mb15" />
      <l2 class="flex1 mb15" />
      <l3 class="flex1" />
    </div>
    <div class="layout-col flex5 mlr15">
      <c1 class="flex1" />
    </div>
    <div class="layout-col flex3">
      <r1 class="flex1 mb15" />
      <r2 class="flex1 mb15" />
      <r3 class="flex1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from '@/views/async/microgrid/l1'
	import l2 from '@/views/async/microgrid/l2'
  import l3 from '@/views/async/microgrid/l3'
	import c1 from '@/views/async/microgrid/c1'
	import r1 from '@/views/async/microgrid/r1'
	import r2 from '@/views/async/microgrid/r2'
	import r3 from '@/views/async/microgrid/r3'
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
	
	watch([
		()=>configStore.provinceId,
		()=>configStore.cityId,
		()=>configStore.districtId,
		()=>configStore.supplyId, 
		()=>configStore.distributId], (val) => {
	    init()
	}, {immediate: false, deep: true})

	const init = async() => {
		publicStore._public.loadData4 = [
			{name: '供电负荷', data: [['00:00', 0], ['02:00', 500], ['04:00', 1200], ['06:00', 1546],['08:00', 1456], ['10:00', 2000], ['12:00', 1863], ['14:00', 1500],['16:00', 1430], ['18:00', 1250], ['20:00', 880], ['22:00', 1460],['24:00', 880]]}, 
			{name: '公共负荷', data: [['00:00', 2000], ['02:00', 1800], ['04:00', 1685], ['06:00', 1435],['08:00', 1924], ['10:00', 1600], ['12:00', 1420], ['14:00', 1543],['16:00', 1002], ['18:00', 1340], ['20:00', 1550], ['22:00', 1223],['24:00', 1550]]}
		]

		publicStore._public.micData = [
			{name: '供电负荷', data: [['00:00', 540], ['02:00', 468], ['04:00', 45], ['06:00', 456],['08:00', 200], ['10:00', 478], ['12:00', 120], ['14:00', 240],['16:00', 480], ['18:00', 462], ['20:00', 300], ['22:00', 410],['24:00', 452]]}, 
			{name: '公共负荷', data: [['00:00', 1000], ['02:00', 889], ['04:00', 246], ['06:00', 100],['08:00', 468], ['10:00', 467], ['12:00', 880], ['14:00', 440],['16:00', 201], ['18:00', 300], ['20:00', 410], ['22:00', 510],['24:00', 432]]}
		]
    
    publicStore._public.supplyData = [
      {name: '光伏发电', value: 25, color: '#54CFF3', rate: '25%', key: 'count_A'},
      {name: '储能站', value: 25, color: '#3E6AE3', rate: '25%', key: 'count_B'},
      {name: 'LPS', value: 25, color: '#F9B74A', rate: '25%', key: 'count_C'},
    ]

    publicStore._public.consumeData = [
      {name: '数据中心', value: 25, color: '#54CFF3', rate: '25%', key: 'count_A'},
      {name: '储能站', value: 25, color: '#3E6AE3', rate: '25%', key: 'count_B'},
    ]

    publicStore._public.rangeData1 = [
      {name: '光伏发电', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['24:00', 45]]}, 
      {name: 'LPS', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['24:00', 35]]},
      {name: '储能电池', data: [['00:00', 100], ['02:00', 50], ['04:00', 80], ['06:00', 90],['08:00', 20], ['10:00', 10], ['12:00', 0], ['14:00', 20],['16:00', 50], ['18:00', 65], ['20:00', 75], ['22:00', 15],['24:00', 55]]},
    ]
    
    publicStore._public.rangeData2 = [
      {name: '光伏发电', data: [['00:00', 100], ['02:00', 20], ['04:00', 20], ['06:00', 10],['08:00', 40], ['10:00', 40], ['12:00', 45], ['14:00', 20],['16:00', 50], ['18:00', 40], ['20:00', 15], ['22:00', 50],['24:00', 45]]}, 
      {name: 'LPS', data: [['00:00', 10], ['02:00', 40], ['04:00', 30], ['06:00', 50],['08:00', 80], ['10:00', 20], ['12:00', 10], ['14:00', 70],['16:00', 30], ['18:00', 45], ['20:00', 45], ['22:00', 15],['24:00', 15]]},
      {name: '储能电池', data: [['00:00', 120], ['02:00', 20], ['04:00', 40], ['06:00', 60],['08:00', 10], ['10:00', 50], ['12:00', 0], ['14:00', 50],['16:00', 50], ['18:00', 65], ['20:00', 55], ['22:00', 15],['24:00', 25]]},
    ]

	}

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
