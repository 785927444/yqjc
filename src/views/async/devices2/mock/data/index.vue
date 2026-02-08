<template>
  <div class="layout-col">
    <div class="layout-row plr15">
      <!-- 左边 -->
      <div class="flex-col flex2 ww100 hidden">
        <l1 class="flex1 mb15" />
        <l2 class="flex2" />
      </div>
      <!-- 右边 -->
      <div class="flex-col flex5 ww100 hidden ml15">
        <r1 />
      </div>
    </div>
    <div class="flex-ec mt15 bgi22 plr15 ptb10">
      <div class="ptb6 plr12 rad2 bgi1 cursor" @click.stop="publicStore._public.active = {name: '查看结果', path: ''}">查看结果</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from './l1'
	import l2 from './l2'
	import r1 from './r1'
  import scheduled from "@/utils/scheduled";
  const { createScheduled } = scheduled();
  const { proxy }: any = getCurrentInstance();
  const configStore = proxy.configStore();
  const publicStore = proxy.publicStore();
  const state = reactive({
    ...publicStore.$state,
    today: {}
  });

  onMounted(async () => {
    setInit();
    await getInit();
  });

	onBeforeUnmount(async() => {
    publicStore._public.WindSpeed = ''
    publicStore._public.Temperature = ''
    publicStore._public.Irradiation = ''
    publicStore._public.WindDirection = ''
	})

  const setInit = async () => {
		publicStore._public.envs = [
      {name: '晴朗', value: '1', check: true},
			{name: '阴天', value: '2', check: false},
			{name: '小雨', value: '3', check: false},
			{name: '暴雨', value: '4', check: false},
		]
		publicStore._public.params = [
      {name: '风机', value: '1', check: false, Output_Power: '', Efficiency: ''},
			{name: '光伏', value: '2', check: false, Output_Power: '', Efficiency: ''},
		]
  }

  const getInit = async (key) => {
    // 获取今日时间
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0); // 精确到毫秒为 0
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999); // 精确到毫秒为 999
    state.today.start = startOfToday.getTime(); // 开始时间的时间戳
    state.today.end = endOfToday.getTime();     // 结束时间的时间戳
    setTimeout(() => {
      getWindSpeed()
      getTemperature()
      getIrradiation()
      getWindDirection()
    }, 50);
  };

  const getWindSpeed = async () => {
    let name = "WindSpeed"
    let chart = [{name: 'wx', data: []}]
    let data = [
      ['00:00', 20],['00:02', 40],['00:04', 30],['00:06', 40],['00:08', 20],['00:10', 40],
      ['00:12', 30],['00:14', 40],['00:16', 50],['00:18', 30],['00:20', 30],['00:22', 40],
    ]
    chart.forEach((v, i)=>{ v.data = data })
    publicStore._public[name] = chart
  }

  const getTemperature = async () => {
    let name = "Temperature"
    let chart = [{name: 'wx', data: []}]
    let data = [
      ['00:00', 50],['00:02', 55],['00:04', 56],['00:06', 54],['00:08', 53],['00:10', 55],
      ['00:12', 53],['00:14', 52],['00:16', 51],['00:18', 50],['00:20', 50],['00:22', 52],
    ]
    chart.forEach((v, i)=>{ v.data = data })
    publicStore._public[name] = chart
  }

  const getIrradiation = async () => {
    let name = "Irradiation"
    let chart = [{name: 'wx', data: []}]
    let data = [
      ['00:00', 70],['00:02', 80],['00:04', 90],['00:06', 90],['00:08', 80],['00:10', 70],
      ['00:12', 60],['00:14', 50],['00:16', 50],['00:18', 50],['00:20', 60],['00:22', 60],
    ]
    chart.forEach((v, i)=>{ v.data = data })
    publicStore._public[name] = chart
  }

  const getWindDirection = async () => {
    let name = "WindDirection"
    let chart = [
      {name: 'N', value: 40},
      {name: 'NNW', value: 45},
      {name: 'NW', value: 80},
      {name: 'WNW', value: 50},
      {name: 'W', value: 50},
      {name: 'WSW', value: 45},
      {name: 'SW', value: 40},
      {name: 'SSW', value: 35},
      {name: 'S', value: 35},
      {name: 'SSE', value: 35},
      {name: 'SE', value: 40},
      {name: 'ESE', value: 45},
      {name: 'E', value: 50},
      {name: 'ENE', value: 50},
      {name: 'NE', value: 80},
      {name: 'NNE', value: 45},
    ]
    // chart.forEach((v, i)=>{ v.data = data })
    publicStore._public[name] = chart
  }
</script>

<style lang="scss">
 
</style>
