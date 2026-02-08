<template>
    <div class="layout-col pl15 mt15 mb15">
        <t1 class="flex1 mb20"></t1>
        <t2 class="flex4"></t2>
    </div>
</template>
<script lang="ts" setup>
    import t1 from "./t1";
    import t2 from "./t2"
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
		getAirCondition()
	}

	const getAirCondition = async() => {
        // let query = {model: "t_v_monitor_airCondition"}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "day_earnings": 3000,
            "day_efficiency": 24,
            "day_electricity_consumption": 5000,
            "day_energy_saving_power": 1200,
            "day_info": "{\"data\":{\"timeRange\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\"],\"floor1\":[\"0.71\",\"27.80\",\"37.05\",\"9.54\",\"49.91\",\"47.82\",\"19.19\",\"33.93\",\"2.06\",\"41.20\",\"30.09\",\"12.41\",\"28.09\",\"12.82\",\"36.54\",\"19.59\",\"40.23\",\"8.35\",\"13.78\",\"0.07\",\"21.14\",\"6.85\",\"35.70\",\"24.61\"],\"floor2\":[\"15.06\",\"9.06\",\"23.03\",\"98.02\",\"98.01\",\"91.61\",\"77.10\",\"2.84\",\"58.76\",\"12.78\",\"59.74\",\"55.87\",\"26.09\",\"80.72\",\"47.55\",\"92.29\",\"89.33\",\"88.59\",\"44.54\",\"65.49\",\"53.77\",\"46.78\",\"65.77\",\"67.27\"],\"floor3\":[\"9.96\",\"2.54\",\"4.25\",\"8.53\",\"3.89\",\"4.13\",\"2.39\",\"4.81\",\"1.71\",\"7.17\",\"3.44\",\"3.56\",\"3.48\",\"4.16\",\"2.26\",\"8.95\",\"2.08\",\"6.57\",\"5.99\",\"4.11\",\"8.71\",\"1.40\",\"6.62\",\"5.49\"],\"floor4\":[\"18.03\",\"10.46\",\"1.62\",\"13.81\",\"3.71\",\"16.74\",\"16.63\",\"16.01\",\"0.21\",\"12.76\",\"2.02\",\"10.24\",\"11.81\",\"18.98\",\"9.62\",\"13.67\",\"11.36\",\"6.98\",\"3.27\",\"12.66\",\"6.92\",\"16.95\",\"16.15\",\"12.10\"]}}",
            "id": 1,
            "month_earnings": 90000,
            "month_efficiency": 24,
            "month_electricity_consumption": 156300,
            "month_energy_saving_power": 36000,
            "month_info": "{\"data\":{\"timeRange\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\",\"25\",\"26\",\"27\",\"28\",\"29\",\"30\",\"31\"],\"floor1\":[\"316.31\",\"301.52\",\"103.74\",\"167.71\",\"325.20\",\"240.19\",\"255.92\",\"497.67\",\"285.89\",\"206.89\",\"495.87\",\"229.33\",\"476.66\",\"418.76\",\"375.04\",\"354.78\",\"122.19\",\"254.07\",\"247.42\",\"259.98\",\"466.20\",\"120.93\",\"474.72\",\"186.11\",\"133.01\",\"266.29\",\"341.52\",\"461.98\",\"390.35\",\"397.70\",\"315.24\"],\"floor2\":[\"173.41\",\"230.99\",\"248.73\",\"258.94\",\"263.76\",\"157.03\",\"408.73\",\"138.52\",\"427.00\",\"259.72\",\"310.70\",\"219.07\",\"260.96\",\"267.78\",\"327.90\",\"448.49\",\"255.54\",\"271.93\",\"207.56\",\"253.28\",\"244.46\",\"196.52\",\"250.58\",\"276.48\",\"305.72\",\"467.49\",\"306.66\",\"203.15\",\"353.22\",\"413.28\",\"132.01\"],\"floor3\":[\"469.68\",\"285.83\",\"778.78\",\"388.70\",\"762.92\",\"187.65\",\"127.84\",\"170.70\",\"253.22\",\"329.97\",\"515.15\",\"180.90\",\"703.94\",\"528.75\",\"593.39\",\"355.73\",\"610.67\",\"223.34\",\"414.55\",\"507.72\",\"709.49\",\"298.92\",\"499.54\",\"353.61\",\"227.17\",\"603.43\",\"787.57\",\"142.77\",\"369.46\",\"266.04\",\"462.74\"],\"floor4\":[\"389.31\",\"997.14\",\"117.81\",\"385.02\",\"229.75\",\"361.34\",\"226.62\",\"512.45\",\"278.13\",\"965.96\",\"479.12\",\"314.37\",\"137.33\",\"316.05\",\"396.19\",\"405.27\",\"182.12\",\"216.46\",\"845.24\",\"939.08\",\"261.48\",\"549.59\",\"548.44\",\"986.60\",\"382.77\",\"130.97\",\"575.66\",\"112.78\",\"254.93\",\"685.04\",\"658.40\"]}}",
            "year_earnings": 1080000,
            "year_efficiency": 24,
            "year_electricity_consumption": 1875600,
            "year_energy_saving_power": 432000,
            "year_info": "{\"data\":{\"timeRange\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\"],\"floor1\":[\"2343.60\",\"15102.09\",\"10245.41\",\"6043.62\",\"10324.12\",\"13537.85\",\"11438.08\",\"16037.07\",\"11370.87\",\"5269.86\",\"8258.16\",\"6641.47\"],\"floor2\":[\"12332.54\",\"693.98\",\"20025.25\",\"20553.87\",\"32455.71\",\"31706.59\",\"28671.06\",\"14284.31\",\"5682.48\",\"3486.57\",\"30770.75\",\"28491.46\"],\"floor3\":[\"1182.93\",\"1504.94\",\"1009.51\",\"1861.11\",\"2775.52\",\"1320.58\",\"2657.38\",\"688.647\",\"3110.74\",\"2275.69\",\"1501.15\",\"2321.98\"],\"floor4\":[\"1007.29\",\"1090.09\",\"2231.78\",\"5912.43\",\"46.9611\",\"4728.63\",\"7286.40\",\"5130.32\",\"5989.20\",\"249.623\",\"6154.79\",\"4257.49\"]}}"
        }
        ]
        publicStore._public.airCondition = proxy.isNull(res)? {} : res[0]
        if(!proxy.isNull(publicStore._public.airCondition)){
            try{
                let info1 = JSON.parse(publicStore._public.airCondition.day_info)
                let info2 = JSON.parse(publicStore._public.airCondition.month_info) 
                let info3 = JSON.parse(publicStore._public.airCondition.year_info)  
                // let info3 = JSON.parse(publicStore._public.airCondition.year_info)
                console.log("info1---", info1)
                console.log("info2---", info2)
                console.log("info3---", info3)
                let charts1 = [
                    {name: '楼层一', data: []}, 
                    {name: '楼层二', data: []},
                    // {name: '楼层三', data: []}, 
                    // {name: '楼层四', data: []},
                ]
                info1.data.timeRange.forEach((v, i) => {
                    let temp1 = [v, info1.data.floor1[i]]
                    let temp2 = [v, info1.data.floor2[i]]
                    // let temp3 = [v, info1.data.floor3[i]]
                    // let temp4 = [v, info1.data.floor4[i]]
                    charts1[0].data.push(temp1)
                    charts1[1].data.push(temp2)
                    // charts1[2].data.unshift(temp3)
                    // charts1[3].data.unshift(temp4)
                })
                publicStore._public.charts1 = charts1

                let charts2 = [
                    {name: '楼层一', data: []}, 
                    {name: '楼层二', data: []},
                    // {name: '楼层三', data: []}, 
                    // {name: '楼层四', data: []},
                ]
                info2.data.timeRange.forEach((v, i) => {
                    let temp1 = [v, info2.data.floor1[i]]
                    let temp2 = [v, info2.data.floor2[i]]
                    // let temp3 = [v, info1.data.floor3[i]]
                    // let temp4 = [v, info1.data.floor4[i]]
                    charts2[0].data.push(temp1)
                    charts2[1].data.push(temp2)
                    // charts1[2].data.unshift(temp3)
                    // charts1[3].data.unshift(temp4)
                })
                publicStore._public.charts2 = charts2

                let charts3 = [
                    {name: '楼层一', data: []}, 
                    {name: '楼层二', data: []},
                    // {name: '楼层三', data: []}, 
                    // {name: '楼层四', data: []},
                ]
                info3.data.timeRange.forEach((v, i) => {
                    let temp1 = [v, info3.data.floor1[i]]
                    let temp2 = [v, info3.data.floor2[i]]
                    // let temp3 = [v, info1.data.floor3[i]]
                    // let temp4 = [v, info1.data.floor4[i]]
                    charts3[0].data.push(temp1)
                    charts3[1].data.push(temp2)
                    // charts1[2].data.unshift(temp3)
                    // charts1[3].data.unshift(temp4)
                })
                publicStore._public.charts3 = charts3
            }catch(err) {
                console.error('json 解析错误')
            }
        }
	}
</script>