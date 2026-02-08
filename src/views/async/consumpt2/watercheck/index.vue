<template>
    <div class="layout-col pl15 mt15 mb15 pr15">
        <QueryTerm></QueryTerm>
        <div class="flex-sc ww100 flex2 mt15">
            <r1 class="flex7"></r1>
            <r2 class="flex4"></r2>
        </div>
        <b1 class="flex1 mt15"></b1>
    </div>
</template>
<script lang="ts" setup>
    import r1 from "./r1.vue";
    import r2 from "./r2.vue";
    import QueryTerm from "./queryTerm.vue";
    import b1 from "./b1.vue";
    import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
    const { proxy }:any = getCurrentInstance();
	const publicStore = proxy.publicStore()
    const dictStore = proxy.dictStore()
	const state = reactive({
		...publicStore.$state,
	})
	onMounted(async() => {
       await setInit()
       init()
	   createScheduled('home', 10*60*1000, () => { init() })
	})

	const setInit = async() => {
        // let stationnum = 1
        // let type = 'wb'
        // let query = {model: "t_v_device", args: `stationnum=${stationnum} and type='${type}'`}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "cfg": null,
            "id": "1",
            "name": "水表1",
            "stationnum": 1,
            "type": "wb"
        },
        {
            "cfg": null,
            "id": "2",
            "name": "水表2",
            "stationnum": 1,
            "type": "wb"
        },
        {
            "cfg": null,
            "id": "3",
            "name": "水表3",
            "stationnum": 1,
            "type": "wb"
        },
        {
            "cfg": null,
            "id": "4",
            "name": "水表4",
            "stationnum": 1,
            "type": "wb"
        }
        ]
        let list = proxy.isNull(res)? [] : res
        if(!proxy.isNull(res)){
            res.forEach((v, i) => {
                v.check = false
                if(i==0 || i == 1) v.check = true
            })
            publicStore._public.devices = res
        }
    }

	const init = async() => {
		getWater()
	}

	const getWater = async() => {
        // let stationnum = 1
        // let query = {model: "t_v_monitor_water", args: `stationnum='${stationnum}'`}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 1,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "1",
            "value": "10"
        },
        {
            "device_id": "2",
            "device_name": "水表2",
            "id": 2,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "1",
            "value": "11"
        },
        {
            "device_id": "3",
            "device_name": "水表3",
            "id": 3,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "1",
            "value": "13"
        },
        {
            "device_id": "4",
            "device_name": "水表4",
            "id": 4,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "2",
            "value": "15"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 5,
            "stationnum": "1",
            "time": "2024-11-12 12:00:00",
            "type": "1",
            "value": "18"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 6,
            "stationnum": "1",
            "time": "2024-11-13 12:00:00",
            "type": "1",
            "value": "24"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 7,
            "stationnum": "1",
            "time": "2024-11-14 12:00:00",
            "type": "1",
            "value": "16"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 8,
            "stationnum": "1",
            "time": "2024-11-15 12:00:00",
            "type": "1",
            "value": "12"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 9,
            "stationnum": "1",
            "time": "2024-11-16 12:00:00",
            "type": "1",
            "value": "13"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 10,
            "stationnum": "1",
            "time": "2024-11-17 12:00:00",
            "type": "1",
            "value": "17"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 11,
            "stationnum": "1",
            "time": "2024-11-18 12:00:00",
            "type": "1",
            "value": "26"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 12,
            "stationnum": "1",
            "time": "2024-11-19 12:00:00",
            "type": "1",
            "value": "32"
        },
        {
            "device_id": "1",
            "device_name": "水表1",
            "id": 13,
            "stationnum": "1",
            "time": "2024-11-20 12:00:00",
            "type": "1",
            "value": "26"
        }
        ]
        publicStore._public.list = proxy.isNull(res)? [] : res
        if(!proxy.isNull(publicStore._public.list) && !proxy.isNull(publicStore._public.devices)){
           let devices = publicStore._public.devices.filter(a=>a.check)
           let lists = publicStore._public.list.filter(a=>{return devices.some(device => device.id === a.device_id)})
           publicStore._public.lists = lists
           // 曲线
           let line = [{name: '用水量', data: []}]
           lists.forEach(v => {
               let data = line[0].data.find(a=>a[0] == v.time)
               if(data){
                   data[1] += Math.floor(v.value*100)/100
               }else{
                   line[0].data.push([v.time, Math.floor(v.value*100)/100])
               }
           })
           publicStore._public.line = line
           // 饼状
           let pie = []
           let count = 0
           lists.forEach(v => {
               count += Math.floor(v.value*100)/100
               let data = pie.find(a=>a.id == v.device_id)
               if(data){
                   data.value += Math.floor(v.value*100)/100
               }else{
                   let temp = 
                   pie.push({id: v.device_id, name: v.device_name, value: Math.floor(v.value*100)/100})
               }
           })
           pie.forEach((v, i) => {
               v.color = dictStore.colorLists[i].color
               v.rate = (Math.floor(10000*v.value/count)/100) + '%' 
           })
           publicStore._public.pie = pie
        }
	}

    watch(() => publicStore._public.devices, async(val, old) => {
        if(proxy.isNull(val)) return
        if(proxy.isNull(old)) return
        if(!proxy.isNull(publicStore._public.list) && !proxy.isNull(publicStore._public.devices)){
           let devices = publicStore._public.devices.filter(a=>a.check)
           let lists = publicStore._public.list.filter(a=>{return devices.some(device => device.id === a.device_id)})
           // 曲线
           let line = [{name: '用水量', data: []}]
           lists.forEach(v => {
               let data = line[0].data.find(a=>a[0] == v.time)
               if(data){
                   data[1] += Math.floor(v.value*100)/100
               }else{
                   line[0].data.push([v.time, Math.floor(v.value*100)/100])
               }
           })
           publicStore._public.line = line
           // 饼状
           let pie = []
           let count = 0
           lists.forEach(v => {
               count += Math.floor(v.value*100)/100
               let data = pie.find(a=>a.id == v.device_id)
               if(data){
                   data.value += Math.floor(v.value*100)/100
               }else{
                   let temp = 
                   pie.push({id: v.device_id, name: v.device_name, value: Math.floor(v.value*100)/100})
               }
           })
           pie.forEach((v, i) => {
               v.color = dictStore.colorLists[i].color
               v.rate = (Math.floor(10000*v.value/count)/100) + '%' 
           })
           publicStore._public.pie = pie
        }
    },{ immediate: false, deep: true });

</script>