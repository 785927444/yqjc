<template>
  <div class="layout-col plr15 pb15">
    <div class="layout-col">
      <div class="layout-row flex3">
        <l1 class="flex2 mb15"></l1>
      </div>
      <div class="layout-col flex2 mt15">
        <b1 />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from './l1'
	import b1 from './b1'
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
	  // createScheduled('home', 10*60*1000, () => { init() })
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
    getList()
    // 折线图
		getLines1()
    // 折线图
		getLines2()

    publicStore._public.wdData = [
      {name: '', data: [['00:00', 10], ['01:00', 20], ['02:00', 20], ['03:00', 40],['04:00', 40], ['05:00', 10], ['06:00', 15], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
    ]

    publicStore._public.loadData3 = [
      {name: '', data: [['00:00', 10], ['01:00', 20], ['02:00', 20], ['03:00', 40],['04:00', 40], ['05:00', 10], ['06:00', 15], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
    ]

    publicStore._public.stationData = [
      {name: '站点1', data: [['00:00', 60], ['01:00', 30], ['02:00', 10], ['03:00', 30],['04:00', 50], ['05:00', 20], ['06:00', 25], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
      {name: '站点2', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
      {name: '站点3', data: [['00:00', 100], ['01:00', 50], ['02:00', 80], ['03:00', 90],['04:00', 20], ['05:00', 10], ['06:00', 0], ['07:00', 20],['08:00', 50], ['09:00', 65], ['10:00', 75], ['11:00', 15],['12:00', 55]]},
      {name: '站点4', data: [['00:00', 80], ['01:00', 35], ['02:00', 66], ['03:00', 88],['04:00', 40], ['05:00', 8], ['06:00', 30], ['07:00', 10],['08:00', 40], ['09:00', 55], ['10:00', 40], ['11:00', 35],['12:00', 25]]},
    ]

    publicStore._public.mainList = [
			{name: '01#逆变器', id: '1', zl1:11.3, zl2: 12.1, izgl: 15.3, ozgl: 15.1, transgl: 98, dayfd: 151, sumfd: 231451.2, status: '并网', alarm: '正常'}, 
			{name: '01#逆变器', id: '1', zl1:11.3, zl2: 12.1, izgl: 15.3, ozgl: 15.1, transgl: 98, dayfd: 151, sumfd: 231451.2, status: '并网', alarm: '正常'}, 
      {name: '01#逆变器', id: '1', zl1:11.3, zl2: 12.1, izgl: 15.3, ozgl: 15.1, transgl: 98, dayfd: 151, sumfd: 231451.2, status: '并网', alarm: '正常'}, 
      {name: '01#逆变器', id: '1', zl1:11.3, zl2: 12.1, izgl: 15.3, ozgl: 15.1, transgl: 98, dayfd: 151, sumfd: 231451.2, status: '并网', alarm: '正常'}, 
      {name: '01#逆变器', id: '1', zl1:11.3, zl2: 12.1, izgl: 15.3, ozgl: 15.1, transgl: 98, dayfd: 151, sumfd: 231451.2, status: '并网', alarm: '正常'}, 
		]

    publicStore._public.envList = [
			{name: '01#逆变器', id: '1', zl1:11.3, zl2: 12.1, izgl: 15.3, ozgl: 15.1, transgl: 98, dayfd: 151, sumfd: 231451.2, status: '并网', alarm: '正常'}, 
    ]

    publicStore._public.stationData2 = [
			{name: '', data: [['站点1', 140], ['站点2', 130], ['站点3', 110], ['站点4', 150]]},
      {name: '', data: [['站点1', 140], ['站点2', 130], ['站点3', 110], ['站点4', 150]]}
		];

    publicStore._public.energyData1 = [
      {name: '', data: [['00:00', 10], ['01:00', 20], ['02:00', 20], ['03:00', 40],['04:00', 40], ['05:00', 10], ['06:00', 15], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
    ]
    publicStore._public.energyData2 = [
      {name: '', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
    ]
    publicStore._public.energyData3 = [
      {name: '', data: [['00:00', 60], ['01:00', 50], ['02:00', 30], ['03:00', 30],['04:00', 20], ['05:00', 20], ['06:00', 10], ['07:00', 20],['08:00', 50], ['09:00', 35], ['10:00', 15], ['11:00', 15],['12:00', 25]]},
    ]
	}

	const getList = async() => {
    // let query = {model: "t_v_xs"}
    // let params = {Api: query}
    // let res = await publicStore.http(params)
		let res = [
			{
				"id": 1,
				"info": "{\"info0\":[{\"name\":\"#01逆变器\",\"electricity1\":11.9,\"electricity2\":11.8,\"inpower\":15.0,\"outpower\":14.9,\"efficiency\":98.5,\"day_generated energy\":125,\"all_generated energy\":5264,\"status\":1,\"isAlarm\":0},{\"name\":\"#02逆变器\",\"electricity1\":11.3,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":98.5,\"day_generated energy\":135,\"all_generated energy\":5214,\"status\":1,\"isAlarm\":0},{\"name\":\"#03逆变器\",\"electricity1\":10.3,\"electricity2\":10.2,\"inpower\":13.3,\"outpower\":12.9,\"efficiency\":95.5,\"day_generated energy\":105,\"all_generated energy\":4954,\"status\":1,\"isAlarm\":0},{\"name\":\"#04逆变器\",\"electricity1\":11.7,\"electricity2\":11.2,\"inpower\":14.3,\"outpower\":14.2,\"efficiency\":98.5,\"day_generated energy\":137,\"all_generated energy\":5344,\"status\":1,\"isAlarm\":0},{\"name\":\"#05逆变器\",\"electricity1\":11.6,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":97.5,\"day_generated energy\":145,\"all_generated energy\":5414,\"status\":1,\"isAlarm\":0},{\"name\":\"#06逆变器\",\"electricity1\":11.4,\"electricity2\":11.5,\"inpower\":15.1,\"outpower\":15.0,\"efficiency\":98.2,\"day_generated energy\":142,\"all_generated energy\":5224,\"status\":1,\"isAlarm\":0}], \"info1\":[{\"name\":\"楼顶检测设备\",\"temperature\":14.6,\"radiation_day\":1.3,\"humidity\":52.6,\"radiation_now\":164,\"wind_direction\":125,\"wind_speed\":1.5,\"status\":1,\"isAlarm\":0},{\"name\":\"广场检测设备\",\"temperature\":14.8,\"radiation_day\":1.2,\"humidity\":53.6,\"radiation_now\":163,\"wind_direction\":116,\"wind_speed\":1.2,\"status\":1,\"isAlarm\":0}]}",
				"name": "光伏1",
				"power": 388,
				"stationnum": 1,
				"type": 1
			},
			{
				"id": 2,
				"info": "{\"info0\":[{\"name\":\"#001逆变器\",\"electricity1\":11.9,\"electricity2\":11.8,\"inpower\":15.0,\"outpower\":14.9,\"efficiency\":98.5,\"day_generated energy\":125,\"all_generated energy\":5264,\"status\":1,\"isAlarm\":0},{\"name\":\"#02逆变器\",\"electricity1\":11.3,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":98.5,\"day_generated energy\":135,\"all_generated energy\":5214,\"status\":1,\"isAlarm\":0},{\"name\":\"#03逆变器\",\"electricity1\":10.3,\"electricity2\":10.2,\"inpower\":13.3,\"outpower\":12.9,\"efficiency\":95.5,\"day_generated energy\":105,\"all_generated energy\":4954,\"status\":1,\"isAlarm\":0},{\"name\":\"#04逆变器\",\"electricity1\":11.7,\"electricity2\":11.2,\"inpower\":14.3,\"outpower\":14.2,\"efficiency\":98.5,\"day_generated energy\":137,\"all_generated energy\":5344,\"status\":1,\"isAlarm\":0},{\"name\":\"#05逆变器\",\"electricity1\":11.6,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":97.5,\"day_generated energy\":145,\"all_generated energy\":5414,\"status\":1,\"isAlarm\":0},{\"name\":\"#06逆变器\",\"electricity1\":11.4,\"electricity2\":11.5,\"inpower\":15.1,\"outpower\":15.0,\"efficiency\":98.2,\"day_generated energy\":142,\"all_generated energy\":5224,\"status\":1,\"isAlarm\":0}], \"info1\":[{\"name\":\"楼顶检测设备\",\"temperature\":14.6,\"radiation_day\":1.3,\"humidity\":52.6,\"radiation_now\":164,\"wind_direction\":125,\"wind_speed\":1.5,\"status\":1,\"isAlarm\":0},{\"name\":\"广场检测设备\",\"temperature\":14.8,\"radiation_day\":1.2,\"humidity\":53.6,\"radiation_now\":163,\"wind_direction\":116,\"wind_speed\":1.2,\"status\":1,\"isAlarm\":0}]}",
				"name": "光伏2",
				"power": 399,
				"stationnum": 2,
				"type": 1
			},
			{
				"id": 3,
				"info": "{\"info0\":[{\"name\":\"#001逆变器\",\"electricity1\":11.9,\"electricity2\":11.8,\"inpower\":15.0,\"outpower\":14.9,\"efficiency\":98.5,\"day_generated energy\":125,\"all_generated energy\":5264,\"status\":1,\"isAlarm\":0},{\"name\":\"#02逆变器\",\"electricity1\":11.3,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":98.5,\"day_generated energy\":135,\"all_generated energy\":5214,\"status\":1,\"isAlarm\":0},{\"name\":\"#03逆变器\",\"electricity1\":10.3,\"electricity2\":10.2,\"inpower\":13.3,\"outpower\":12.9,\"efficiency\":95.5,\"day_generated energy\":105,\"all_generated energy\":4954,\"status\":1,\"isAlarm\":0},{\"name\":\"#04逆变器\",\"electricity1\":11.7,\"electricity2\":11.2,\"inpower\":14.3,\"outpower\":14.2,\"efficiency\":98.5,\"day_generated energy\":137,\"all_generated energy\":5344,\"status\":1,\"isAlarm\":0},{\"name\":\"#05逆变器\",\"electricity1\":11.6,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":97.5,\"day_generated energy\":145,\"all_generated energy\":5414,\"status\":1,\"isAlarm\":0},{\"name\":\"#06逆变器\",\"electricity1\":11.4,\"electricity2\":11.5,\"inpower\":15.1,\"outpower\":15.0,\"efficiency\":98.2,\"day_generated energy\":142,\"all_generated energy\":5224,\"status\":1,\"isAlarm\":0}], \"info1\":[{\"name\":\"楼顶检测设备\",\"temperature\":14.6,\"radiation_day\":1.3,\"humidity\":52.6,\"radiation_now\":164,\"wind_direction\":125,\"wind_speed\":1.5,\"status\":1,\"isAlarm\":0},{\"name\":\"广场检测设备\",\"temperature\":14.8,\"radiation_day\":1.2,\"humidity\":53.6,\"radiation_now\":163,\"wind_direction\":116,\"wind_speed\":1.2,\"status\":1,\"isAlarm\":0}]}",
				"name": "储能1",
				"power": 499,
				"stationnum": 3,
				"type": 2
			},
			{
				"id": 4,
				"info": "{\"info0\":[{\"name\":\"#001逆变器\",\"electricity1\":11.9,\"electricity2\":11.8,\"inpower\":15.0,\"outpower\":14.9,\"efficiency\":98.5,\"day_generated energy\":125,\"all_generated energy\":5264,\"status\":1,\"isAlarm\":0},{\"name\":\"#02逆变器\",\"electricity1\":11.3,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":98.5,\"day_generated energy\":135,\"all_generated energy\":5214,\"status\":1,\"isAlarm\":0},{\"name\":\"#03逆变器\",\"electricity1\":10.3,\"electricity2\":10.2,\"inpower\":13.3,\"outpower\":12.9,\"efficiency\":95.5,\"day_generated energy\":105,\"all_generated energy\":4954,\"status\":1,\"isAlarm\":0},{\"name\":\"#04逆变器\",\"electricity1\":11.7,\"electricity2\":11.2,\"inpower\":14.3,\"outpower\":14.2,\"efficiency\":98.5,\"day_generated energy\":137,\"all_generated energy\":5344,\"status\":1,\"isAlarm\":0},{\"name\":\"#05逆变器\",\"electricity1\":11.6,\"electricity2\":11.2,\"inpower\":15.3,\"outpower\":15.2,\"efficiency\":97.5,\"day_generated energy\":145,\"all_generated energy\":5414,\"status\":1,\"isAlarm\":0},{\"name\":\"#06逆变器\",\"electricity1\":11.4,\"electricity2\":11.5,\"inpower\":15.1,\"outpower\":15.0,\"efficiency\":98.2,\"day_generated energy\":142,\"all_generated energy\":5224,\"status\":1,\"isAlarm\":0}], \"info1\":[{\"name\":\"楼顶检测设备\",\"temperature\":14.6,\"radiation_day\":1.3,\"humidity\":52.6,\"radiation_now\":164,\"wind_direction\":125,\"wind_speed\":1.5,\"status\":1,\"isAlarm\":0},{\"name\":\"广场检测设备\",\"temperature\":14.8,\"radiation_day\":1.2,\"humidity\":53.6,\"radiation_now\":163,\"wind_direction\":116,\"wind_speed\":1.2,\"status\":1,\"isAlarm\":0}]}",
				"name": "储能2",
				"power": 599,
				"stationnum": 4,
				"type": 2
			}
		]
    publicStore._public.active = 0
		publicStore._public.list = proxy.isNull(res)? [] : res
	}

	const getLines1 = async() => {
    // let start = 1731859200000
		// let end = 1731945600000
		// let sensor_id = 1731642243025
		// let args = `sensor_id = ${sensor_id} and timestamp >= ${start} and timestamp < ${end} and measurement_code IN ('fz', 'yg')`
		// let order = "timestamp desc"
    // let query = {model: "t_sensor_measure_float", limit: 1000, order: order, args: args}
    // let params = {Api: query}
    // let res = await publicStore.http(params)
		let res = [
		{
			"id": 180,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731930900000,
			"value": 1
		},
		{
			"id": 360,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731930900000,
			"value": 0
		},
		{
			"id": 179,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731930600000,
			"value": 1
		},
		{
			"id": 359,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731930600000,
			"value": 0
		},
		{
			"id": 178,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731930300000,
			"value": 1
		},
		{
			"id": 358,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731930300000,
			"value": 0
		},
		{
			"id": 177,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731930000000,
			"value": 1
		},
		{
			"id": 357,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731930000000,
			"value": 0
		},
		{
			"id": 176,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731929700000,
			"value": 1
		},
		{
			"id": 356,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731929700000,
			"value": 0
		},
		{
			"id": 175,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731929400000,
			"value": 1
		},
		{
			"id": 355,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731929400000,
			"value": 0
		},
		{
			"id": 174,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731929100000,
			"value": 1
		},
		{
			"id": 354,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731929100000,
			"value": 0
		},
		{
			"id": 173,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731928800000,
			"value": 1
		},
		{
			"id": 353,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731928800000,
			"value": 0
		},
		{
			"id": 172,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731928500000,
			"value": 1
		},
		{
			"id": 352,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731928500000,
			"value": 0
		},
		{
			"id": 171,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731928200000,
			"value": 1
		},
		{
			"id": 351,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731928200000,
			"value": 0
		},
		{
			"id": 170,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731927900000,
			"value": 1
		},
		{
			"id": 350,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731927900000,
			"value": 0
		},
		{
			"id": 169,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731927600000,
			"value": 1
		},
		{
			"id": 349,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731927600000,
			"value": 0
		},
		{
			"id": 168,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731927300000,
			"value": 1
		},
		{
			"id": 348,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731927300000,
			"value": 0
		},
		{
			"id": 167,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731927000000,
			"value": 1
		},
		{
			"id": 347,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731927000000,
			"value": 0
		},
		{
			"id": 166,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731926700000,
			"value": 1
		},
		{
			"id": 346,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731926700000,
			"value": 0
		},
		{
			"id": 165,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731926400000,
			"value": 1
		},
		{
			"id": 345,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731926400000,
			"value": 0
		},
		{
			"id": 164,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731926100000,
			"value": 1
		},
		{
			"id": 344,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731926100000,
			"value": 0
		},
		{
			"id": 163,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731925800000,
			"value": 1
		},
		{
			"id": 343,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731925800000,
			"value": 0
		},
		{
			"id": 162,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731925500000,
			"value": 1
		},
		{
			"id": 342,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731925500000,
			"value": 0
		},
		{
			"id": 161,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731925200000,
			"value": 1
		},
		{
			"id": 341,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731925200000,
			"value": 0
		},
		{
			"id": 160,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731924900000,
			"value": 1
		},
		{
			"id": 340,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731924900000,
			"value": 0
		},
		{
			"id": 159,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731924600000,
			"value": 1
		},
		{
			"id": 339,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731924600000,
			"value": 0
		},
		{
			"id": 158,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731924300000,
			"value": 1
		},
		{
			"id": 338,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731924300000,
			"value": 0
		},
		{
			"id": 157,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731924000000,
			"value": 5
		},
		{
			"id": 337,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731924000000,
			"value": 0.134
		},
		{
			"id": 156,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731923700000,
			"value": 6
		},
		{
			"id": 336,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731923700000,
			"value": 0.069
		},
		{
			"id": 155,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731923400000,
			"value": 15
		},
		{
			"id": 335,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731923400000,
			"value": 1.451
		},
		{
			"id": 154,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731923100000,
			"value": 26
		},
		{
			"id": 334,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731923100000,
			"value": 2.754
		},
		{
			"id": 153,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731922800000,
			"value": 32
		},
		{
			"id": 333,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731922800000,
			"value": 3.725
		},
		{
			"id": 152,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731922500000,
			"value": 41
		},
		{
			"id": 332,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731922500000,
			"value": 5.13
		},
		{
			"id": 151,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731922200000,
			"value": 72
		},
		{
			"id": 331,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731922200000,
			"value": 8.228
		},
		{
			"id": 150,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731921900000,
			"value": 72
		},
		{
			"id": 330,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731921900000,
			"value": 8.228
		},
		{
			"id": 149,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731921600000,
			"value": 90
		},
		{
			"id": 329,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731921600000,
			"value": 10.291
		},
		{
			"id": 148,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731921300000,
			"value": 104
		},
		{
			"id": 328,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731921300000,
			"value": 12.125
		},
		{
			"id": 147,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731921000000,
			"value": 121
		},
		{
			"id": 327,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731921000000,
			"value": 14.102
		},
		{
			"id": 146,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731920700000,
			"value": 136
		},
		{
			"id": 326,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731920700000,
			"value": 15.84
		},
		{
			"id": 145,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731920400000,
			"value": 154
		},
		{
			"id": 325,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731920400000,
			"value": 18.368
		},
		{
			"id": 144,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731920100000,
			"value": 170
		},
		{
			"id": 324,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731920100000,
			"value": 20.513
		},
		{
			"id": 143,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731919800000,
			"value": 180
		},
		{
			"id": 323,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731919800000,
			"value": 22.197
		},
		{
			"id": 142,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731919500000,
			"value": 201
		},
		{
			"id": 322,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731919500000,
			"value": 24.968
		},
		{
			"id": 141,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731919200000,
			"value": 211
		},
		{
			"id": 321,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731919200000,
			"value": 25.971
		},
		{
			"id": 140,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731918900000,
			"value": 222
		},
		{
			"id": 320,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731918900000,
			"value": 26.9
		},
		{
			"id": 139,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731918600000,
			"value": 266
		},
		{
			"id": 319,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731918600000,
			"value": 33.152
		},
		{
			"id": 138,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731918300000,
			"value": 269
		},
		{
			"id": 318,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731918300000,
			"value": 33.429
		},
		{
			"id": 137,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731918000000,
			"value": 262
		},
		{
			"id": 317,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731918000000,
			"value": 33.665
		},
		{
			"id": 136,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731917700000,
			"value": 277
		},
		{
			"id": 316,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731917700000,
			"value": 35.156
		},
		{
			"id": 135,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731917400000,
			"value": 317
		},
		{
			"id": 315,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731917400000,
			"value": 40.427
		},
		{
			"id": 134,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731917100000,
			"value": 340
		},
		{
			"id": 314,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731917100000,
			"value": 43.138
		},
		{
			"id": 133,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731916800000,
			"value": 354
		},
		{
			"id": 313,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731916800000,
			"value": 45.454
		},
		{
			"id": 132,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731916500000,
			"value": 348
		},
		{
			"id": 312,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731916500000,
			"value": 44.135
		},
		{
			"id": 131,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731916200000,
			"value": 414
		},
		{
			"id": 311,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731916200000,
			"value": 54.072
		},
		{
			"id": 130,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731915900000,
			"value": 423
		},
		{
			"id": 310,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731915900000,
			"value": 54.816
		},
		{
			"id": 129,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731915600000,
			"value": 489
		},
		{
			"id": 309,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731915600000,
			"value": 63.08
		},
		{
			"id": 128,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731915300000,
			"value": 489
		},
		{
			"id": 308,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731915300000,
			"value": 63.08
		},
		{
			"id": 127,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731915000000,
			"value": 517
		},
		{
			"id": 307,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731915000000,
			"value": 66.746
		},
		{
			"id": 126,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731914700000,
			"value": 508
		},
		{
			"id": 306,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731914700000,
			"value": 65.515
		},
		{
			"id": 125,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731914400000,
			"value": 481
		},
		{
			"id": 305,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731914400000,
			"value": 62.067
		},
		{
			"id": 124,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731914100000,
			"value": 574
		},
		{
			"id": 304,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731914100000,
			"value": 73.962
		},
		{
			"id": 123,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731913800000,
			"value": 561
		},
		{
			"id": 303,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731913800000,
			"value": 73.902
		},
		{
			"id": 122,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731913500000,
			"value": 642
		},
		{
			"id": 302,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731913500000,
			"value": 83.008
		},
		{
			"id": 121,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731913200000,
			"value": 638
		},
		{
			"id": 301,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731913200000,
			"value": 82.529
		},
		{
			"id": 120,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731912900000,
			"value": 684
		},
		{
			"id": 300,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731912900000,
			"value": 89.412
		},
		{
			"id": 119,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731912600000,
			"value": 675
		},
		{
			"id": 299,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731912600000,
			"value": 87.589
		},
		{
			"id": 118,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731912300000,
			"value": 723
		},
		{
			"id": 298,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731912300000,
			"value": 94.761
		},
		{
			"id": 117,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731912000000,
			"value": 752
		},
		{
			"id": 297,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731912000000,
			"value": 98.538
		},
		{
			"id": 116,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731911700000,
			"value": 846
		},
		{
			"id": 296,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731911700000,
			"value": 113.86
		},
		{
			"id": 115,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731911400000,
			"value": 670
		},
		{
			"id": 295,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731911400000,
			"value": 93.233
		},
		{
			"id": 114,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731911100000,
			"value": 319
		},
		{
			"id": 294,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731911100000,
			"value": 45.202
		},
		{
			"id": 113,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731910800000,
			"value": 241
		},
		{
			"id": 293,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731910800000,
			"value": 33.337
		},
		{
			"id": 112,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731910500000,
			"value": 176
		},
		{
			"id": 292,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731910500000,
			"value": 24.915
		},
		{
			"id": 111,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731910200000,
			"value": 187
		},
		{
			"id": 291,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731910200000,
			"value": 25.829
		},
		{
			"id": 110,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731909900000,
			"value": 270
		},
		{
			"id": 290,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731909900000,
			"value": 38.514
		},
		{
			"id": 109,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731909600000,
			"value": 424
		},
		{
			"id": 289,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731909600000,
			"value": 53.761
		},
		{
			"id": 108,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731909300000,
			"value": 693
		},
		{
			"id": 288,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731909300000,
			"value": 97.729
		},
		{
			"id": 107,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731909000000,
			"value": 820
		},
		{
			"id": 287,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731909000000,
			"value": 104.59
		},
		{
			"id": 106,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731908700000,
			"value": 796
		},
		{
			"id": 286,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731908700000,
			"value": 102.26
		},
		{
			"id": 105,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731908400000,
			"value": 830
		},
		{
			"id": 285,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731908400000,
			"value": 107.41
		},
		{
			"id": 104,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731908100000,
			"value": 806
		},
		{
			"id": 284,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731908100000,
			"value": 105.24
		},
		{
			"id": 103,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731907800000,
			"value": 816
		},
		{
			"id": 283,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731907800000,
			"value": 106.92
		},
		{
			"id": 102,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731907500000,
			"value": 835
		},
		{
			"id": 282,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731907500000,
			"value": 109.05
		},
		{
			"id": 101,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731907200000,
			"value": 821
		},
		{
			"id": 281,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731907200000,
			"value": 106.92
		},
		{
			"id": 100,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731906900000,
			"value": 829
		},
		{
			"id": 280,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731906900000,
			"value": 107.95
		},
		{
			"id": 99,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731906600000,
			"value": 821
		},
		{
			"id": 279,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731906600000,
			"value": 106.44
		},
		{
			"id": 98,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731906300000,
			"value": 841
		},
		{
			"id": 278,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731906300000,
			"value": 109.54
		},
		{
			"id": 97,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731906000000,
			"value": 859
		},
		{
			"id": 277,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731906000000,
			"value": 111.13
		},
		{
			"id": 96,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731905700000,
			"value": 851
		},
		{
			"id": 276,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731905700000,
			"value": 110.98
		},
		{
			"id": 95,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731905400000,
			"value": 845
		},
		{
			"id": 275,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731905400000,
			"value": 109
		},
		{
			"id": 94,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731905100000,
			"value": 865
		},
		{
			"id": 274,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731905100000,
			"value": 111.54
		},
		{
			"id": 93,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731904800000,
			"value": 872
		},
		{
			"id": 273,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731904800000,
			"value": 114.02
		},
		{
			"id": 92,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731904500000,
			"value": 827
		},
		{
			"id": 272,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731904500000,
			"value": 104.83
		},
		{
			"id": 91,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731904200000,
			"value": 807
		},
		{
			"id": 271,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731904200000,
			"value": 101.11
		},
		{
			"id": 90,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731903900000,
			"value": 887
		},
		{
			"id": 270,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731903900000,
			"value": 112.2
		},
		{
			"id": 89,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731903600000,
			"value": 884
		},
		{
			"id": 269,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731903600000,
			"value": 112.59
		},
		{
			"id": 88,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731903300000,
			"value": 857
		},
		{
			"id": 268,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731903300000,
			"value": 107.92
		},
		{
			"id": 87,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731903000000,
			"value": 809
		},
		{
			"id": 267,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731903000000,
			"value": 99.212
		},
		{
			"id": 86,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731902700000,
			"value": 438
		},
		{
			"id": 266,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731902700000,
			"value": 65.027
		},
		{
			"id": 85,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731902400000,
			"value": 545
		},
		{
			"id": 265,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731902400000,
			"value": 57.846
		},
		{
			"id": 84,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731902100000,
			"value": 476
		},
		{
			"id": 264,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731902100000,
			"value": 67.114
		},
		{
			"id": 83,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731901800000,
			"value": 825
		},
		{
			"id": 263,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731901800000,
			"value": 100.2
		},
		{
			"id": 82,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731901500000,
			"value": 885
		},
		{
			"id": 262,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731901500000,
			"value": 112
		},
		{
			"id": 81,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731901200000,
			"value": 911
		},
		{
			"id": 261,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731901200000,
			"value": 114.01
		},
		{
			"id": 80,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731900900000,
			"value": 893
		},
		{
			"id": 260,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731900900000,
			"value": 110.49
		},
		{
			"id": 79,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731900600000,
			"value": 888
		},
		{
			"id": 259,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731900600000,
			"value": 111.62
		},
		{
			"id": 78,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731900300000,
			"value": 841
		},
		{
			"id": 258,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731900300000,
			"value": 104.5
		},
		{
			"id": 77,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731900000000,
			"value": 824
		},
		{
			"id": 257,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731900000000,
			"value": 105.48
		},
		{
			"id": 76,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731899700000,
			"value": 839
		},
		{
			"id": 256,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731899700000,
			"value": 106.5
		},
		{
			"id": 75,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731899400000,
			"value": 806
		},
		{
			"id": 255,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731899400000,
			"value": 103.71
		},
		{
			"id": 74,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731899100000,
			"value": 822
		},
		{
			"id": 254,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731899100000,
			"value": 105.26
		},
		{
			"id": 73,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731898800000,
			"value": 749
		},
		{
			"id": 253,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731898800000,
			"value": 94.404
		},
		{
			"id": 72,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731898500000,
			"value": 796
		},
		{
			"id": 252,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731898500000,
			"value": 101.94
		},
		{
			"id": 71,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731898200000,
			"value": 751
		},
		{
			"id": 251,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731898200000,
			"value": 95.772
		},
		{
			"id": 70,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731897900000,
			"value": 755
		},
		{
			"id": 250,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731897900000,
			"value": 96.519
		},
		{
			"id": 69,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731897600000,
			"value": 746
		},
		{
			"id": 249,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731897600000,
			"value": 96.771
		},
		{
			"id": 68,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731897300000,
			"value": 772
		},
		{
			"id": 248,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731897300000,
			"value": 99.429
		},
		{
			"id": 67,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731897000000,
			"value": 741
		},
		{
			"id": 247,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731897000000,
			"value": 94.89
		},
		{
			"id": 66,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731896700000,
			"value": 738
		},
		{
			"id": 246,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731896700000,
			"value": 96.441
		},
		{
			"id": 65,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731896400000,
			"value": 640
		},
		{
			"id": 245,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731896400000,
			"value": 85.147
		},
		{
			"id": 64,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731896100000,
			"value": 647
		},
		{
			"id": 244,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731896100000,
			"value": 82.979
		},
		{
			"id": 63,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731895800000,
			"value": 647
		},
		{
			"id": 243,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731895800000,
			"value": 82.979
		},
		{
			"id": 62,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731895500000,
			"value": 702
		},
		{
			"id": 242,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731895500000,
			"value": 91.511
		},
		{
			"id": 61,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731895200000,
			"value": 653
		},
		{
			"id": 241,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731895200000,
			"value": 83.435
		},
		{
			"id": 60,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731894900000,
			"value": 645
		},
		{
			"id": 240,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731894900000,
			"value": 84.522
		},
		{
			"id": 59,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731894600000,
			"value": 645
		},
		{
			"id": 239,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731894600000,
			"value": 84.522
		},
		{
			"id": 58,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731894300000,
			"value": 401
		},
		{
			"id": 238,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731894300000,
			"value": 48.213
		},
		{
			"id": 57,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731894000000,
			"value": 610
		},
		{
			"id": 237,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731894000000,
			"value": 80.05
		},
		{
			"id": 56,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731893700000,
			"value": 587
		},
		{
			"id": 236,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731893700000,
			"value": 77.148
		},
		{
			"id": 55,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731893400000,
			"value": 592
		},
		{
			"id": 235,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731893400000,
			"value": 78.373
		},
		{
			"id": 54,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731893100000,
			"value": 523
		},
		{
			"id": 234,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731893100000,
			"value": 67.625
		},
		{
			"id": 53,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731892800000,
			"value": 523
		},
		{
			"id": 233,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731892800000,
			"value": 67.625
		},
		{
			"id": 52,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731892500000,
			"value": 491
		},
		{
			"id": 232,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731892500000,
			"value": 62.437
		},
		{
			"id": 51,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731892200000,
			"value": 523
		},
		{
			"id": 231,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731892200000,
			"value": 68.563
		},
		{
			"id": 50,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731891900000,
			"value": 487
		},
		{
			"id": 230,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731891900000,
			"value": 62.579
		},
		{
			"id": 49,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731891600000,
			"value": 462
		},
		{
			"id": 229,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731891600000,
			"value": 60.394
		},
		{
			"id": 48,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731891300000,
			"value": 406
		},
		{
			"id": 228,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731891300000,
			"value": 47.993
		},
		{
			"id": 47,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731891000000,
			"value": 406
		},
		{
			"id": 227,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731891000000,
			"value": 47.993
		},
		{
			"id": 46,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731890700000,
			"value": 229
		},
		{
			"id": 226,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731890700000,
			"value": 31.29
		},
		{
			"id": 45,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731890400000,
			"value": 382
		},
		{
			"id": 225,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731890400000,
			"value": 48.016
		},
		{
			"id": 44,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731890100000,
			"value": 376
		},
		{
			"id": 224,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731890100000,
			"value": 47.412
		},
		{
			"id": 43,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731889800000,
			"value": 340
		},
		{
			"id": 223,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731889800000,
			"value": 42.481
		},
		{
			"id": 42,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731889500000,
			"value": 326
		},
		{
			"id": 222,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731889500000,
			"value": 40.359
		},
		{
			"id": 41,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731889200000,
			"value": 301
		},
		{
			"id": 221,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731889200000,
			"value": 36.499
		},
		{
			"id": 40,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731888900000,
			"value": 293
		},
		{
			"id": 220,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731888900000,
			"value": 34.759
		},
		{
			"id": 39,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731888600000,
			"value": 275
		},
		{
			"id": 219,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731888600000,
			"value": 32.251
		},
		{
			"id": 38,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731888300000,
			"value": 241
		},
		{
			"id": 218,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731888300000,
			"value": 27.412
		},
		{
			"id": 37,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731888000000,
			"value": 232
		},
		{
			"id": 217,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731888000000,
			"value": 25.82
		},
		{
			"id": 36,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731887700000,
			"value": 221
		},
		{
			"id": 216,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731887700000,
			"value": 24.604
		},
		{
			"id": 35,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731887400000,
			"value": 208
		},
		{
			"id": 215,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731887400000,
			"value": 23.017
		},
		{
			"id": 34,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731887100000,
			"value": 180
		},
		{
			"id": 214,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731887100000,
			"value": 19.812
		},
		{
			"id": 33,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731886800000,
			"value": 149
		},
		{
			"id": 213,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731886800000,
			"value": 16.252
		},
		{
			"id": 32,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731886500000,
			"value": 146
		},
		{
			"id": 212,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731886500000,
			"value": 15.687
		},
		{
			"id": 31,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731886200000,
			"value": 135
		},
		{
			"id": 211,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731886200000,
			"value": 14.317
		},
		{
			"id": 30,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731885900000,
			"value": 127
		},
		{
			"id": 210,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731885900000,
			"value": 12.895
		},
		{
			"id": 29,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731885600000,
			"value": 111
		},
		{
			"id": 209,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731885600000,
			"value": 11.345
		},
		{
			"id": 28,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731885300000,
			"value": 95
		},
		{
			"id": 208,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731885300000,
			"value": 9.571
		},
		{
			"id": 27,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731885000000,
			"value": 84
		},
		{
			"id": 207,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731885000000,
			"value": 8.1
		},
		{
			"id": 26,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731884700000,
			"value": 74
		},
		{
			"id": 206,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731884700000,
			"value": 7.216
		},
		{
			"id": 25,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731884400000,
			"value": 63
		},
		{
			"id": 205,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731884400000,
			"value": 6.043
		},
		{
			"id": 24,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731884100000,
			"value": 48
		},
		{
			"id": 204,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731884100000,
			"value": 4.716
		},
		{
			"id": 23,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731883800000,
			"value": 40
		},
		{
			"id": 203,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731883800000,
			"value": 3.915
		},
		{
			"id": 22,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731883500000,
			"value": 25
		},
		{
			"id": 202,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731883500000,
			"value": 2.488
		},
		{
			"id": 21,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731883200000,
			"value": 16
		},
		{
			"id": 201,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731883200000,
			"value": 1.323
		},
		{
			"id": 20,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731882900000,
			"value": 12
		},
		{
			"id": 200,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731882900000,
			"value": 0.961
		},
		{
			"id": 19,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731882600000,
			"value": 7
		},
		{
			"id": 199,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731882600000,
			"value": 0.207
		},
		{
			"id": 18,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731882300000,
			"value": 1
		},
		{
			"id": 198,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731882300000,
			"value": 0
		},
		{
			"id": 17,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731882000000,
			"value": 2
		},
		{
			"id": 197,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731882000000,
			"value": 0
		},
		{
			"id": 16,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731881700000,
			"value": 2
		},
		{
			"id": 196,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731881700000,
			"value": 0
		},
		{
			"id": 15,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731881400000,
			"value": 2
		},
		{
			"id": 195,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731881400000,
			"value": 0
		},
		{
			"id": 14,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731881100000,
			"value": 2
		},
		{
			"id": 194,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731881100000,
			"value": 0
		},
		{
			"id": 13,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731880800000,
			"value": 2
		},
		{
			"id": 193,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731880800000,
			"value": 0
		},
		{
			"id": 12,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731880500000,
			"value": 2
		},
		{
			"id": 192,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731880500000,
			"value": 0
		},
		{
			"id": 11,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731880200000,
			"value": 2
		},
		{
			"id": 191,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731880200000,
			"value": 0
		},
		{
			"id": 10,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731879900000,
			"value": 2
		},
		{
			"id": 190,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731879900000,
			"value": 0
		},
		{
			"id": 9,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731879600000,
			"value": 2
		},
		{
			"id": 189,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731879600000,
			"value": 0
		},
		{
			"id": 8,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731879300000,
			"value": 2
		},
		{
			"id": 188,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731879300000,
			"value": 0
		},
		{
			"id": 7,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731879000000,
			"value": 2
		},
		{
			"id": 187,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731879000000,
			"value": 0
		},
		{
			"id": 6,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731878700000,
			"value": 2
		},
		{
			"id": 186,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731878700000,
			"value": 0
		},
		{
			"id": 5,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731878400000,
			"value": 2
		},
		{
			"id": 185,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731878400000,
			"value": 0
		},
		{
			"id": 4,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731878100000,
			"value": 2
		},
		{
			"id": 184,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731878100000,
			"value": 0
		},
		{
			"id": 3,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731877800000,
			"value": 2
		},
		{
			"id": 183,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731877800000,
			"value": 0
		},
		{
			"id": 2,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731877500000,
			"value": 2
		},
		{
			"id": 182,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731877500000,
			"value": 0
		},
		{
			"id": 1,
			"measurement_code": "fz",
			"sensor_id": 1731642243025,
			"timestamp": 1731877200000,
			"value": 2
		},
		{
			"id": 181,
			"measurement_code": "yg",
			"sensor_id": 1731642243025,
			"timestamp": 1731877200000,
			"value": 0
		}
		]
    let list = proxy.isNull(res)? [] : res
		let dw = '{m}-{d} {h}:{i}:{s}'
		let charts = [
			{name: '辐照', data: []},
			{name: '有功', data: []},
		]
		list.forEach(v => {
			let temp = [proxy.parseTime(v.timestamp, dw), v.value]
			if(v.measurement_code == 'fz'){
				charts[0].data.unshift(temp)
			}
			if(v.measurement_code == 'yg'){
				charts[1].data.unshift(temp)
			}
		})
		publicStore._public.lines1 = charts
	}

	const getLines2 = async() => {
    // let start = "2024-11-16"
		// let end = "2024-11-19"
		// let args = `station_id IN ('1', '2')`
		// let order = "generation_date desc"
    // let query = {model: "t_v_solar_power_generation_day", limit: 1000, order: order, args: args}
    // let params = {Api: query}
    // let res = await publicStore.http(params)
		let res = [
			{
				"efficiency": "85",
				"generated_power": "502.3",
				"generation_date": "2025-03-17T00:00:00+08:00",
				"id": 8,
				"name": null,
				"peak_power": "60",
				"station_id": 1,
				"type": null
			},
			{
				"efficiency": "84",
				"generated_power": "456.6",
				"generation_date": "2025-03-17T00:00:00+08:00",
				"id": 12,
				"name": null,
				"peak_power": "61",
				"station_id": 2,
				"type": null
			},
			{
				"efficiency": "85",
				"generated_power": "502.3",
				"generation_date": "2025-02-17T00:00:00+08:00",
				"id": 7,
				"name": null,
				"peak_power": "60",
				"station_id": 1,
				"type": null
			},
			{
				"efficiency": "84",
				"generated_power": "456.6",
				"generation_date": "2025-02-17T00:00:00+08:00",
				"id": 11,
				"name": null,
				"peak_power": "52",
				"station_id": 2,
				"type": null
			},
			{
				"efficiency": "85",
				"generated_power": "502.3",
				"generation_date": "2025-01-17T00:00:00+08:00",
				"id": 6,
				"name": null,
				"peak_power": "60",
				"station_id": 1,
				"type": null
			},
			{
				"efficiency": "84",
				"generated_power": "456.6",
				"generation_date": "2025-01-17T00:00:00+08:00",
				"id": 10,
				"name": null,
				"peak_power": "61",
				"station_id": 2,
				"type": null
			},
			{
				"efficiency": "85",
				"generated_power": "502.3",
				"generation_date": "2024-12-17T00:00:00+08:00",
				"id": 5,
				"name": null,
				"peak_power": "60",
				"station_id": 1,
				"type": null
			},
			{
				"efficiency": "84",
				"generated_power": "456.6",
				"generation_date": "2024-12-17T00:00:00+08:00",
				"id": 9,
				"name": null,
				"peak_power": "61",
				"station_id": 2,
				"type": null
			},
			{
				"efficiency": "86",
				"generated_power": "553.2",
				"generation_date": "2024-11-18T00:00:00+08:00",
				"id": 1,
				"name": null,
				"peak_power": "61",
				"station_id": 1,
				"type": null
			},
			{
				"efficiency": "84",
				"generated_power": "456.6",
				"generation_date": "2024-11-18T00:00:00+08:00",
				"id": 3,
				"name": null,
				"peak_power": "61",
				"station_id": 2,
				"type": null
			},
			{
				"efficiency": "65.6",
				"generated_power": "253.6",
				"generation_date": "2024-11-17T00:00:00+08:00",
				"id": 2,
				"name": null,
				"peak_power": "65",
				"station_id": 1,
				"type": null
			},
			{
				"efficiency": "85",
				"generated_power": "502.3",
				"generation_date": "2024-11-17T00:00:00+08:00",
				"id": 4,
				"name": null,
				"peak_power": "60",
				"station_id": 2,
				"type": null
			}
		]
    let list = proxy.isNull(res)? [] : res
		let dw = '{y} {m}-{d}'
		let charts = [
			{name: '光伏1', data: []},
			{name: '光伏2', data: []},
		]
		list.forEach(v => {
			let temp = [proxy.parseTime(v.generation_date, dw), v.generated_power]
			if(v.station_id == '1'){
				charts[0].data.unshift(temp)
			}
			if(v.station_id == '2'){
				charts[1].data.unshift(temp)
			}
		})
		publicStore._public.lines2 = charts
    console.log("publicStore._public.lines2 --", publicStore._public.lines2 )
	}
</script>

<style lang="scss">
 
</style>
