<template>
    <div class="layout-col plr15 pb15 mt15">
       <div class="flex1 layout-row mb15">
            <l1 class="flex1"></l1>
            <r1 class="flex1 mlr15"></r1>
            <r2 class="flex1"></r2>
       </div>
       <div class="flex1 mr15 layout-row">
            <l2 class="flex1"></l2>
            <c2 class="flex1 mlr15"></c2>
            <c1 class="flex1 "></c1>
            
       </div>
    </div>
</template>
<script lang="ts" setup>
    import l1 from './l1';
    import l2 from './l2';
    import c1 from './c1';
    import c2 from './c2';
    import r1 from './r1';
    import r2 from './r2';
    import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
    const { proxy }:any = getCurrentInstance();
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
	onMounted(async() => {
       init()
	   createScheduled('home', 10*60*1000, () => { init() })
	})

	const init = async() => {
		getWarn()
	}

	const getWarn = async() => {
        // let stationnum = '1'
        // let query = {model: "t_v_monitor_warn", args: `stationnum=${stationnum}`}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#01-01BMS#01簇端电压过限中度告警",
            "device_id": "1",
            "device_name": "电表1",
            "electric": "12",
            "floor": "二楼",
            "id": 1,
            "name": "电压告警",
            "nature": "日常用电",
            "power_consumption": "556",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 1,
            "voltage": "55"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#02-01BMS#01簇端电压过限中度告警",
            "device_id": "2",
            "device_name": "电表2",
            "electric": "11",
            "floor": "二楼",
            "id": 2,
            "name": "电压告警",
            "nature": "日常用电",
            "power_consumption": "885",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 1,
            "voltage": "46"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#03-01BMS#01簇端电压过限中度告警",
            "device_id": "3",
            "device_name": "电表3",
            "electric": "13",
            "floor": "二楼",
            "id": 3,
            "name": "电压告警",
            "nature": "日常用电",
            "power_consumption": "462",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 1,
            "voltage": "62"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#04-01BMS#01簇端电流过限中度告警",
            "device_id": "4",
            "device_name": "电表4",
            "electric": "32",
            "floor": "二楼",
            "id": 4,
            "name": "电流告警",
            "nature": "日常用电",
            "power_consumption": "346",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 2,
            "voltage": "20"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#05-01BMS#01簇端电流过限中度告警",
            "device_id": "5",
            "device_name": "电表5",
            "electric": "46",
            "floor": "二楼",
            "id": 5,
            "name": "电流告警",
            "nature": "日常用电",
            "power_consumption": "386",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 2,
            "voltage": "24"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#06-01BMS#01簇端电流过限中度告警",
            "device_id": "6",
            "device_name": "电表6",
            "electric": "39",
            "floor": "二楼",
            "id": 6,
            "name": "电流告警",
            "nature": "日常用电",
            "power_consumption": "410",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 2,
            "voltage": "23"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#07-01BMS#01簇端能耗过限中度告警",
            "device_id": "7",
            "device_name": "电表7",
            "electric": "12",
            "floor": "二楼",
            "id": 7,
            "name": "能耗告警",
            "nature": "日常用电",
            "power_consumption": "1210",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 3,
            "voltage": "22"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#08-01BMS#01簇端能耗过限中度告警",
            "device_id": "8",
            "device_name": "电表8",
            "electric": "10",
            "floor": "二楼",
            "id": 8,
            "name": "能耗告警",
            "nature": "日常用电",
            "power_consumption": "1485",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 3,
            "voltage": "25"
        },
        {
            "aera": "广东省-珠海市-香洲区",
            "company": "园区",
            "coord": "(1，1)",
            "depart": "软件部",
            "describe": "#09-01BMS#01簇端能耗过限中度告警",
            "device_id": "9",
            "device_name": "电表9",
            "electric": "13",
            "floor": "二楼",
            "id": 9,
            "name": "能耗告警",
            "nature": "日常用电",
            "power_consumption": "1582",
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": 3,
            "voltage": "23"
        }
        ]
        publicStore._public.list = proxy.isNull(res)? [] : res
        publicStore._public.max = publicStore._public.list.reduce((max, current) => {return (Number(current.power_consumption) > Number(max.power_consumption)) ? current : max}, publicStore._public.list[0])
	    let aeras = []
        publicStore._public.list.forEach(v => {
            let aera = aeras.find(a=>a.aera == v.aera)
            if(aera){
                aera.power_consumption += Math.floor(v.power_consumption*100)/100
                aera.data.push(v)
            }else{
                aeras.push({aera: v.aera, power_consumption: Math.floor(v.power_consumption*100)/100, data: [v]})
            }
        })
        publicStore._public.maxAera = aeras.reduce((max, current) => {return (Number(current.power_consumption) > Number(max.power_consumption)) ? current : max}, aeras[0])
        console.log("publicStore._public.maxAera---", publicStore._public.maxAera)
    }
</script>