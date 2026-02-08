<template>
    <div class="layout-col pl15 mt15 mb15 pr15">
        <QueryTerm></QueryTerm>
        <div class="flex-sc ww100 flex2 mt15">
            <r1></r1>
        </div>
        <b1 class="flex1 mt15"></b1>
    </div>
</template>
<script lang="ts" setup>
    import r1 from "./r1.vue";
    import b1 from "./b1.vue";
    import QueryTerm from "./queryTerm.vue";
    // import b1 from "./b1.vue";
    import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
    const { proxy }:any = getCurrentInstance();
	const publicStore = proxy.publicStore()
    const dictStore = proxy.dictStore()
	const state = reactive({
		...publicStore.$state,
	})
	onMounted(async() => {
        publicStore._public.types = [
           {id: 1, name: '空调', value: 'air', check: true},
           {id: 2, name: '照明', value: 'light', check: false},
           {id: 3, name: '充电桩', value: 'charging', check: false},
        ]
       await setInit()
       init()
	   createScheduled('home', 10*60*1000, () => { init() })
	})

	const setInit = async() => {
        // let stationnum = 1
        // let type = 'wb'
        // let query = {model: "t_v_device", args: `stationnum=${stationnum} and type IN ('air', 'light', 'charging')`}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "cfg": null,
            "id": "1731660019715",
            "name": "交流充电桩1#",
            "stationnum": 1,
            "type": "charging"
        },
        {
            "cfg": null,
            "id": "1731660019716",
            "name": "交流充电桩2#",
            "stationnum": 1,
            "type": "charging"
        },
        {
            "cfg": null,
            "id": "1731660019717",
            "name": "交流充电桩3#",
            "stationnum": 1,
            "type": "charging"
        },
        {
            "cfg": null,
            "id": "1731660019718",
            "name": "直流双枪快充桩4#",
            "stationnum": 1,
            "type": "charging"
        },
        {
            "cfg": null,
            "id": "1731660019719",
            "name": "直流双枪快充桩5#",
            "stationnum": 1,
            "type": "charging"
        },
        {
            "cfg": null,
            "id": "1731660019720",
            "name": "直流双枪快充桩6#",
            "stationnum": 1,
            "type": "charging"
        },
        {
            "cfg": null,
            "id": "5",
            "name": "空调1",
            "stationnum": 1,
            "type": "air"
        },
        {
            "cfg": null,
            "id": "6",
            "name": "空调2",
            "stationnum": 1,
            "type": "air"
        },
        {
            "cfg": null,
            "id": "7",
            "name": "照明1",
            "stationnum": 1,
            "type": "light"
        },
        {
            "cfg": null,
            "id": "8",
            "name": "照明2",
            "stationnum": 1,
            "type": "light"
        }
        ]
        publicStore._public.devices = proxy.isNull(res)? [] : res
    }

	const init = async() => {
		getElect()
	}

	const getElect = async() => {
        // let stationnum = 1
        // let query = {model: "t_v_monitor_elect", args: `stationnum='${stationnum}'`}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 1,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "air",
            "value": "120"
        },
        {
            "device_id": "6",
            "device_name": "空调2",
            "id": 2,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "air",
            "value": "111"
        },
        {
            "device_id": "7",
            "device_name": "照明1",
            "id": 3,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "light",
            "value": "130"
        },
        {
            "device_id": "8",
            "device_name": "照明2",
            "id": 4,
            "stationnum": "1",
            "time": "2024-11-11 12:00:00",
            "type": "light",
            "value": "154"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 5,
            "stationnum": "1",
            "time": "2024-11-12 12:00:00",
            "type": "air",
            "value": "188"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 6,
            "stationnum": "1",
            "time": "2024-11-13 12:00:00",
            "type": "air",
            "value": "241"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 7,
            "stationnum": "1",
            "time": "2024-11-14 12:00:00",
            "type": "air",
            "value": "169"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 8,
            "stationnum": "1",
            "time": "2024-11-15 12:00:00",
            "type": "air",
            "value": "126"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 9,
            "stationnum": "1",
            "time": "2024-11-16 12:00:00",
            "type": "air",
            "value": "133"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 10,
            "stationnum": "1",
            "time": "2024-11-17 12:00:00",
            "type": "air",
            "value": "174"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 11,
            "stationnum": "1",
            "time": "2024-11-18 12:00:00",
            "type": "air",
            "value": "265"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 12,
            "stationnum": "1",
            "time": "2024-11-19 12:00:00",
            "type": "air",
            "value": "321"
        },
        {
            "device_id": "5",
            "device_name": "空调1",
            "id": 13,
            "stationnum": "1",
            "time": "2024-11-20 12:00:00",
            "type": "air",
            "value": "268"
        }
        ]
        publicStore._public.list = proxy.isNull(res)? [] : res
        if(!proxy.isNull(publicStore._public.list) && !proxy.isNull(publicStore._public.devices)){
           let types = publicStore._public.types.filter(a=>a.check)
           let devices =publicStore._public.devices.filter(a=>{return types.some(type => type.value === a.type)})
           let lists = publicStore._public.list.filter(a=>{return devices.some(device => device.id === a.device_id)})
           publicStore._public.lists = lists
           // 列表
           let arr = []
           lists.forEach(v => {
                let data = arr.find(a=>a.time == v.time)
                if(data){
                    if(v.type=='air') data.air += Math.floor(v.value*100)/100
                    if(v.type=='light') data.light += Math.floor(v.value*100)/100
                    if(v.type=='charging') data.charging += Math.floor(v.value*100)/100
                }else{
                   arr.push({time: v.time, air: v.type=='air'?Math.floor(v.value*100)/100:0, light: v.type=='light'?Math.floor(v.value*100)/100:0, charging: v.type=='charging'?Math.floor(v.value*100)/100:0})
                }
           })
           publicStore._public.arr = arr
           // 曲线
           let line = [{name: '用电量', data: []}]
           lists.forEach(v => {
               let data = line[0].data.find(a=>a[0] == v.time)
               if(data){
                   data[1] += Math.floor(v.value*100)/100
               }else{
                   line[0].data.push([v.time, Math.floor(v.value*100)/100])
               }
           })
           publicStore._public.line = line
        }
	}

    watch(() => publicStore._public.types, async(val, old) => {
        if(proxy.isNull(val)) return
        if(proxy.isNull(old)) return
        if(!proxy.isNull(publicStore._public.list) && !proxy.isNull(publicStore._public.devices)){
            let types = publicStore._public.types.filter(a=>a.check)
            let devices =publicStore._public.devices.filter(a=>{return types.some(type => type.value === a.type)})
            let lists = publicStore._public.list.filter(a=>{return devices.some(device => device.id === a.device_id)})
            publicStore._public.lists = lists
            // 列表
            let arr = []
            lists.forEach(v => {
                    let data = arr.find(a=>a.time == v.time)
                    if(data){
                        if(v.type=='air') data.air += Math.floor(v.value*100)/100
                        if(v.type=='light') data.light += Math.floor(v.value*100)/100
                        if(v.type=='charging') data.charging += Math.floor(v.value*100)/100
                    }else{
                    arr.push({time: v.time, air: v.type=='air'?Math.floor(v.value*100)/100:0, light: v.type=='light'?Math.floor(v.value*100)/100:0, charging: v.type=='charging'?Math.floor(v.value*100)/100:0})
                    }
            })
            publicStore._public.arr = arr
            // 曲线
            let line = [{name: '用电量', data: []}]
            lists.forEach(v => {
                let data = line[0].data.find(a=>a[0] == v.time)
                if(data){
                    data[1] += Math.floor(v.value*100)/100
                }else{
                    line[0].data.push([v.time, Math.floor(v.value*100)/100])
                }
            })
            publicStore._public.line = line
        }
    },{ immediate: false, deep: true });

</script>