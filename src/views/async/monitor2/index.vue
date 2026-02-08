<template>
  <div class="layout-row">
    <div class="flex-col hh100 ww28 plr20 pb20 pt80 absolute t0 l0 z9" v-if="!configStore.actStatus">
			<allRight ref="allRef" />
			<!-- <div class="flex-col hh100 ww100" v-if="publicStore.actIndex == 'gf'"></div>
	  	<div class="flex-col hh100 ww100" v-if="publicStore.actIndex == 'cn'"></div>
	  	<div class="flex-col hh100 ww100" v-if="publicStore.actIndex == 'cd'"></div> -->
    </div>
		<div class="layout-col">
			<c />
		</div>
    <div class="flex-col hh100 ww28 plr20 pb20 pt80 absolute t0 r0 z9" v-if="!configStore.actStatus">
			<allLeft />
			<!-- <div class="flex-col hh100 ww100" v-if="publicStore.actIndex == 'gf'"></div>
			<div class="flex-col hh100 ww100" v-if="publicStore.actIndex == 'cn'"></div>
			<div class="flex-col hh100 ww100" v-if="publicStore.actIndex == 'cd'"></div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  // 模型
  import c from './c.vue'
	// 全局
  import allRight from './all/right'
	import allLeft from './all/left'

	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
		num: 0,
	})
	let allRef = $ref()
  
	onMounted(async() => {
	  getInit()
    createScheduled('monitor2', 10*1000, () => { 
			getDevicesData() 
			if(publicStore.actIndex  == 'home') allRef.reInit()
		})
	})

  // 初始化
	const getInit = async() => {
		let query1 = {model: "t_station", args: `parent_id='${configStore.distributId}'`, field: "id, parent_id, station_name, `order`, mark, instlPos"}
		let query2 = {model: "t_sensor", args: `stationNum='${configStore.distributId}' and class='0'`}
		let res = await publicStore.http({Api1: query1, Api2: query2})
		// 获取可视化间隔
		publicStore._public.bays = proxy.isNull(res.Api1)? [] : res.Api1.filter(a =>a.instlPos)
		// 获取所有设备
    publicStore._public.devices = proxy.isNull(res.Api2)? [] : res.Api2
		// 获取实时参数
		state.query = {model: "redis"}
		state.query.key = publicStore._public.devices.map(a=>{return "mo:Hash:sensor:" + a.id})
		// 实时更新
		getDevicesData()
		if(publicStore.actIndex  == 'home') allRef.reInit()
	}

  // 实时更新
  const getDevicesData = async() => {
    if (!proxy.isNull(publicStore._public.devices)){
      let params = {getApi: state.query}
      let res = await publicStore.http(params)
			let baysData = JSON.parse(JSON.stringify(publicStore._public.bays))
      let homeInfo = {}
      let homeDevices = []
      let photovoltaicInfo = {}
      let photovoltaicDevices = []
      let energyInfo = {}
      let energyDevices = []
      let chargeInfo = {}
      let chargeDevices = []
      let windInfo = {}
      let windDevices = []  
      let airconditionerInfo = {}
      let airconditionerDevices = [] 
      let airconditionerfzInfo = {}
      let airconditionerfzDevices = [] 
      publicStore._public.devices.forEach(vv => {
        let device =  Object.assign({}, vv)
        let redis_exist = res.find(a=>a.sensor_id == vv.id)
        let redis_data = redis_exist? redis_exist : {}
        Object.assign(device, redis_data)
        if(device.isAlarm) device.alarm = device.isAlarm>0? '1' : '0'
				let bay = baysData.find(a=>a.id == vv.bayNum)
				if(bay){
					setData(bay, redis_data)
				}
        if(vv.type == 'photovoltaic'){
          setData(photovoltaicInfo, redis_data)
          photovoltaicDevices.push(device)
        }
        if(vv.type == 'energy'){
          setData(energyInfo, redis_data)
          energyDevices.push(device)
        }
        if(vv.type == 'charge'){
          setData(chargeInfo, redis_data)
          chargeDevices.push(device)
        }
        if(vv.type == 'wind'){
          setData(windInfo, redis_data)
          windDevices.push(device)
        }
        if(vv.type == 'airconditioner'){
          setData(airconditionerInfo, redis_data)
          airconditionerDevices.push(device)
        }
        if(vv.type == 'airconditionerfz'){
          setData(airconditionerfzInfo, redis_data)
          airconditionerfzDevices.push(device)
        }
        setData(homeInfo, redis_data)
        homeDevices.push(device)
      })
			publicStore._public.baysData = baysData
      publicStore._public.homeInfo = homeInfo
      publicStore._public.homeDevices = homeDevices
      publicStore._public.photovoltaicInfo = photovoltaicInfo
      publicStore._public.photovoltaicDevices = photovoltaicDevices
      publicStore._public.energyInfo = energyInfo
      publicStore._public.energyDevices = energyDevices
      publicStore._public.chargeInfo = chargeInfo
      publicStore._public.chargeDevices = chargeDevices
      publicStore._public.windInfo = windInfo
      publicStore._public.windDevices = windDevices
      publicStore._public.airconditionerInfo = airconditionerInfo
      publicStore._public.airconditionerDevices = airconditionerDevices
      publicStore._public.airconditionerfzInfo = airconditionerfzInfo
      publicStore._public.airconditionerfzDevices = airconditionerfzDevices
      // console.log("publicStore._public.homeInfo---", publicStore._public.homeInfo)
      // console.log("publicStore._public.homeDevices---", publicStore._public.homeDevices)
      // console.log("publicStore._public.chargeInfo---", publicStore._public.chargeInfo)
    } else{
      publicStore._public.homeInfo = {};
      publicStore._public.homeDevices = [];
      publicStore._public.photovoltaicInfo = {}
      publicStore._public.photovoltaicDevices = []
      publicStore._public.energyInfo = {}
      publicStore._public.energyDevices = []
      publicStore._public.chargeInfo = {}
      publicStore._public.chargeDevices = []
      publicStore._public.windInfo = {}
      publicStore._public.windDevices = []
      publicStore._public.airconditionerInfo = {}
      publicStore._public.airconditionerDevices = []
      publicStore._public.airconditionerfzInfo = {}
      publicStore._public.airconditionerfzDevices = []
    }
		publicStore._public.init = !publicStore._public.init
  }

  // 设置数据
  const setData = (info, data) => {
    info['sum'] = !info['sum'] ? 1 : info['sum'] + 1
    Object.keys(data).forEach((key)=>{
      if (key.indexOf('_tc')==-1 && (typeof data[key] === 'number' || (typeof data[key] === 'string' && data[key].trim() !== '' && !isNaN(Number(data[key].trim()))))) {
        if(key == 'timestamp'){
          // 最大
          if(!info[key] || info[key] && info[key]<data[key]) info[key] = data[key]
        }else{
          // 累计
          info[key] = !info[key] ? Number(data[key]) : Number(info[key]) + Number(data[key])
        }
        // 工况
        if(key == 'offline') {
          info[key+data[key]] = !info[key+data[key]] ? 1 : info[key+data[key]] + 1
        }
        // 告警
        if(key == 'isAlarm') {
          if(data[key] > 0) info['alarm1'] = !info['alarm1'] ? 1 : info['alarm1'] + 1
          if(data[key] == 0) info['alarm0'] = !info['alarm0'] ? 1 : info['alarm0'] + 1
        }
        // 逆变器状态
        if(key == 'pv_inverter_status') {
          info[key+data[key]] = !info[key+data[key]] ? 1 : info[key+data[key]] + 1
        }
        // 空调状态
        if(key == '2022') {
          info[key+data[key]] = !info[key+data[key]] ? 1 : info[key+data[key]] + 1
        }
      } 
    })
  }
</script>

<style scoped lang="scss">

</style>
