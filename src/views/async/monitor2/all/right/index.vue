<template>
  <div class="layout-col">
		<div class="flex-col hh100 ww100">
			<r1 class="flex1 mb15" />
			<r2 class="flex1 mb15" />
			<r3 class="flex1" />
		</div>
  </div>
</template>

<script lang="ts" setup>
	import r1 from './r1'
	import r2 from './r2'
	import r3 from './r3'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})

  onBeforeUnmount(() => {
		publicStore._public.DevicesDailyOutput = ''
		publicStore._public.DevicesOutputPower = ''
		publicStore._public.DevicesDailyInput = ''
		publicStore._public.DevicesInputPower = ''
    publicStore._public.DevicesPower = ''
		publicStore.rechart()
  })

  // 实时请求
	const reInit = async() => {
    // 光伏/风机发电量
    getDevicesBar('DevicesDailyOutput', [{name: '日发电量', code: 'pv_daily_energy', data: []}], '1', `photovoltaic','wind`);
    // 光伏/风机发电功率
    getDevicesLine('DevicesOutputPower', [{name: '发电功率', code: 'pv_active_power', data: []}], '0', `photovoltaic','wind`);
    // 储能充放电量
    getDevicesBar('DevicesDailyInput', [{name: '储能日充电量', code: 'Daily_Input', data: []}, {name: '储能日放电量', code: 'Daily_Output', data: []}], '1', `energy`);
    // 储能充放功率
    getDevicesLine('DevicesInputPower', [{name: '储能充电功率', code: 'Input_Power', data: []}], '0', `energy`);
	}

  // 监控实时
	watch(() => publicStore._public.init, async(val, old) => {
    getDevicesPower()
	}, { immediate: false, deep: true });

  // 功率比例
  const getDevicesPower = async() => {
    // 光伏
    let photovoltaic = 0
    if(publicStore._public.photovoltaicInfo && publicStore._public.photovoltaicInfo.pv_active_power) photovoltaic = Math.floor((publicStore._public.photovoltaicInfo.pv_active_power*10))/10
    // 储能
    let energy = 0
    if(publicStore._public.energyInfo && publicStore._public.energyInfo.Out_TotW) energy = Math.abs(Math.floor((publicStore._public.energyInfo.Out_TotW*10))/10)
    // 充电桩
    let charge = 0
    if(publicStore._public.chargeInfo && publicStore._public.chargeInfo.Input_Power) charge = Math.floor((publicStore._public.chargeInfo.Input_Power*10))/10
    // 风机
    let wind = 0
    if(publicStore._public.windInfo && publicStore._public.windInfo.Output_Power) wind = Math.floor((publicStore._public.windInfo.Output_Power*10))/10
    // 分体空调
    let airconditioner = 0
    if(publicStore._public.airconditionerInfo && publicStore._public.airconditionerInfo.Total_Power) airconditioner = Math.floor((publicStore._public.airconditionerInfo.Total_Power*10))/10
    let sum = photovoltaic + energy + charge + wind + airconditioner
    let name = 'DevicesPower'
    let chart = [
      {name: '光伏发电', value: photovoltaic, rate: Math.floor((photovoltaic/sum*1000))/10},
      {name: '储能充放', value: energy, rate: Math.floor((energy/sum*1000))/10},
      {name: '充电桩充电', value: charge, rate: Math.floor((charge/sum*1000))/10},
      {name: '风机发电', value: wind, rate: Math.floor((wind/sum*1000))/10},
      {name: '分体空调', value: airconditioner, rate: Math.floor((airconditioner/sum*1000))/10},
    ]
    // if(photovoltaic == 0 && energy1 == 0 && energy2 == 0 && charge == 0 && wind == 0 && airconditioner == 0) return
    publicStore._public[name] = chart
  }

  // 柱状图 name: 名称（数据+dom） chart: 数据  format：时间格式  status： 1累计/其他统计
  const getDevicesBar = async(name, chart, status='0', type='', limit = 10, format='{m}-{d} {h}:{i}:{s}') => {
    let code = ''
    if (!chart) return 
    if (chart.length == 0) return 
    if (chart.length == 1) code = chart[0].code
    if (chart.length > 1) code = chart.map((v, i) =>`'${v.code}'`).join(',').slice(1, -1)
    if (!proxy.isNull(publicStore._public.devices)){
      let query = getCodeQuery(code, status, type, limit)
      if(type == 'energy')     console.log(query,'res里面的数据')
      let res = await publicStore.http({ Api: query })
      let list = proxy.isNull(res)? [] : res
      let timekey = 'date'
      let codekey = 'code'
      list.forEach((v, i)=> {
        let value = Math.floor(100*Number(v.value))/100
        let timestamp = v[timekey]
        let time = !isNaN(parseFloat(timestamp)) && isFinite(timestamp)? proxy.parseTime(timestamp, format) : timestamp.split('T')[0].slice(5)
        let item = [time, value, timestamp]
        let chartTemp = chart.find(a=>a.code == v[codekey]) 
        if(chartTemp){
          let exist = chartTemp.data.find(a=>a[2]==timestamp)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chartTemp.data.unshift(item)
          }
        }
      })
    } 
    publicStore._public[name] = chart
  }

  // 折线图 name: 名称（数据+dom） chart: 数据  format：时间格式  status： 1累计/其他统计
  const getDevicesLine = async(name, chart, status='0', type='', limit = 200, format='{m}-{d} {h}:{i}:{s}') => {
    let code = ''
    if (!chart) return 
    if (chart.length == 0) return 
    if (chart.length == 1) code = chart[0].code
    if (chart.length > 1) code = chart.map((v, i) =>`'${v.code}'`).join(',').slice(1, -1)
    if (!proxy.isNull(publicStore._public.devices)){
      let query = getCodeQuery(code, status, type, limit)
      let res = await publicStore.http({ Api: query })
      let list = proxy.isNull(res)? [] : res
      let timekey = 'date'
      let codekey = 'code'
      list.forEach((v, i)=> {
        let value = Math.floor(100*Number(v.value))/100
        let timestamp = v[timekey]
        let time = !isNaN(parseFloat(timestamp)) && isFinite(timestamp)? proxy.parseTime(timestamp, format) : timestamp.split('T')[0].slice(5)
        let item = [time, value, timestamp]
        let chartTemp = chart.find(a=>a.code == v[codekey]) 
        if(chartTemp){
          let exist = chartTemp.data.find(a=>a[2]==timestamp)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chartTemp.data.unshift(item)
          }
        }
      })
    } 
    publicStore._public[name] = chart
  }

  // 获取测点参数
  const getCodeQuery = (code, status, type, limit = 200) => {
    let query = {}
    let model = status == '1'? 't_sensor_measure_float_day_station' : status == '0'? 't_sensor_measure_float_station' : ''
    let args = `code IN ('${code}') and type IN ('${type}') and station_num='${configStore.distributId}'`
    if(!proxy.isNull(state.datetime)) args += ` and date>='${state.datetime.start}' and date<='${state.datetime.end}'`
    query = { model: model, limit: limit, args: args, order: "(date + 0) desc" }
    return query
  }

  // 暴露给父组件
  defineExpose({
    reInit,
  })
</script>

<style scoped lang="scss">

</style>
