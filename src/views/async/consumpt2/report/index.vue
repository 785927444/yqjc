<template>
    <div class="layout-row pl15 mt15 mb15">
        <MyTree class="flex1 mr15"></MyTree>
        <r1 class="flex5 mr15"></r1>
    </div>
</template>
<script lang="ts" setup>
    import MyTree from "../Tree.vue"
    import r1 from "./r1.vue";
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
	
	onMounted(async() => {
       publicStore.actIndex = 1
	   createScheduled('home', 10*60*1000, () => { init() })
	})
    
    watch(() => publicStore._public.checks,async (val, old) =>{
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        init();
    },{ immediate: false, deep: true });

	const init = async() => {
		getList()
	}

	const getList = async() => {
        // let query = {model: "t_v_report_day", args: `stationnum IN (${publicStore._public.checks.join(', ')})`}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "after_current_connection": 80,
            "day": "2024-10-1",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 1,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-2",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 2,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-3",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 3,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-4",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 4,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-5",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 5,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-6",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 6,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-7",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 7,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-8",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 8,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-9",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 9,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-10",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 10,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-11",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 11,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-12",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 12,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-13",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 13,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-14",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 14,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-15",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 15,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-16",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 16,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-17",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 17,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-18",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 18,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-19",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 19,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-20",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 20,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-21",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 21,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-22",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 22,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-23",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 23,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-24",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 24,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-25",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 25,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-26",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 26,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-27",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 27,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-28",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 28,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-29",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 29,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-30",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 30,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-10-31",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 31,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-1",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 32,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-2",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 33,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-3",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 34,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-4",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 35,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-5",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 36,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-6",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 37,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-7",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 38,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-8",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 39,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-9",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 40,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-10",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 41,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-11",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 42,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-12",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 43,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-13",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 44,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-14",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 45,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-15",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 46,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-16",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 47,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-17",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 48,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-18",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 49,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-19",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 50,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-20",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 51,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-21",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 52,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-22",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 53,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-23",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 54,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-24",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 55,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-25",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 56,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-26",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 57,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-27",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 58,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-28",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 59,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-29",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 60,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-11-30",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 61,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2024-12-30",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 62,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2025-01-30",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 63,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2025-02-30",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 64,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        },
        {
            "after_current_connection": 80,
            "day": "2025-03-30",
            "dynamoelectric_benefit": 45,
            "generating_efficiency": 85,
            "id": 65,
            "inverter1": 40,
            "inverter2": 50,
            "power_generation_capacity": 90,
            "solar_radiation": 50,
            "stationnum": 1
        }
        ]
        publicStore._public.list = proxy.isNull(res)? [] : res
	}
</script>