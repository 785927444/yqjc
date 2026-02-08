<template>
    <div class="layout-row pl15 mt15 mb15">
        <MyTree class="flex1 mr15"></MyTree>
        <r1 class="flex5 mr15" />
    </div>
</template>
<script lang="ts" setup>
    import MyTree from "../Tree.vue"
    import r1 from "@/views/async/consumpt2/current/r1"
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
	
	// onMounted(async() => {
	//   createScheduled('home', 10*60*1000, () => { init() })
	// })
    
    watch(() => publicStore._public.checks, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        init();
    },{ immediate: false, deep: true });

	const init = async() => {
		getList()
	}

	const getList = async() => {
        // let query = {model: "t_v_data", args: `stationnum IN (${publicStore._public.checks.join(', ')})`}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
            {
                "id": 1,
                "info": "{\"hour\":{\"1\":\"2\",\"2\":\"5\",\"3\":\"9\",\"4\":\"8\",\"5\":\"2\",\"6\":\"3\",\"7\":\"5\",\"8\":\"5\",\"9\":\"0\",\"10\":\"16\",\"11\":\"5\",\"12\":\"5\",\"13\":\"6\",\"14\":\"3\",\"15\":\"9\",\"16\":\"12\",\"17\":\"65\",\"18\":\"13\",\"19\":\"2\",\"20\":\"6\",\"21\":\"2\",\"22\":\"13\",\"23\":\"6\",\"24\":\"5\"}}",
                "stationnum": 1,
                "timestamp": "2024-11-26",
                "unit": "kW",
                "value": 100,
                "yccode": "实时有功"
            },
            {
                "id": 2,
                "info": "{\"day\":{\"1\":\"2\",\"2\":\"3\",\"3\":\"4\",\"4\":\"1\",\"5\":\"8\",\"6\":\"5\",\"7\":\"4\",\"8\":\"5\",\"9\":\"10\",\"10\":\"6\",\"11\":\"15\",\"12\":\"8\",\"13\":\"12\",\"14\":\"4\",\"15\":\"12\",\"16\":\"2\",\"17\":\"6\",\"18\":\"23\",\"19\":\"8\",\"20\":\"16\",\"21\":\"21\",\"22\":\"3\",\"23\":\"6\",\"24\":\"5\",\"25\":\"16\",\"26\":\"21\",\"27\":\"3\",\"28\":\"6\",\"29\":\"5\",\"30\":\"3\",\"31\":\"6\"}}",
                "stationnum": 1,
                "timestamp": "2024-11-26",
                "unit": "kWh",
                "value": 186.69,
                "yccode": "日发电量"
            },
            {
                "id": 3,
                "info": "{\"month\":{\"1\":\"201\",\"2\":\"123\",\"3\":\"114\",\"4\":\"101\",\"5\":\"208\",\"6\":\"56\",\"7\":\"114\",\"8\":\"115\",\"9\":\"101\",\"10\":\"60\",\"11\":\"105\",\"12\":\"80\"}}",
                "stationnum": 1,
                "timestamp": "2024-11-26",
                "unit": "kWh",
                "value": 543.07,
                "yccode": "月发电量"
            },
            {
                "id": 4,
                "info": "{\"year\":{\"2020\":\"1201\",\"2021\":\"1123\",\"2022\":\"1114\",\"2023\":\"1101\",\"2024\":\"1208\"}}",
                "stationnum": 1,
                "timestamp": "2024-11-26",
                "unit": "kWh",
                "value": 5410.06,
                "yccode": "年发电量"
            },
            {
                "id": 5,
                "info": null,
                "stationnum": 1,
                "timestamp": "2024-11-26",
                "unit": "kWh",
                "value": 15240.5,
                "yccode": "总发电量"
            },
            {
                "id": 6,
                "info": null,
                "stationnum": 1,
                "timestamp": "2024-11-26",
                "unit": "%",
                "value": 101,
                "yccode": "效率"
            }
        ]
        publicStore._public.list = proxy.isNull(res)? [] : res
	}

</script>