<template>
    <div class="layout-col flex1 mb15">
        <div class="h40 ww100 flex-sc relative mb15">
            <img class="hh100 ww100" src="@/assets/imgs/title2.png" />
            <div class="ww100 hh100 flex-sc absolute pl40">
                <span class="fw flex1 ptb5">区域</span>
            </div>
        </div>
        <div class="ba1 flex1 overlay">
            <el-tree 
            ref="treeRef" 
            node-key="id"
            :data="state.treeData" 
            :default-expand-all="true" 
            :props="defaultProps" 
            @check-change="handleCheckChange" 
            show-checkbox></el-tree>
        </div>
    </div>
</template>
<script lang="ts" setup>
    const { proxy }: any = getCurrentInstance();
    const publicStore = proxy.publicStore();
    const state = reactive({
        ...publicStore.$state,
        treeData:[]
    })
    const defaultProps = {
        children: 'children',
        label: 'station_name',
    }
    let treeRef = $ref()
    const handleCheckChange = (data: any, checked: boolean) =>  publicStore._public.checks = treeRef.getCheckedKeys(true)
    onMounted(async()=>{
        // let query = {model: "t_station"}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
            {
                "city": "440400",
                "district": "440402",
                "id": "1",
                "province": "440000",
                "station_name": "1号储能站",
                "station_num": 1,
                "type": 1
            },
            {
                "city": null,
                "district": null,
                "id": "10",
                "province": null,
                "station_name": "高新储能站",
                "station_num": 4,
                "type": 2
            },
            {
                "city": "440600",
                "district": "440606",
                "id": "2",
                "province": "440000",
                "station_name": "2号储能站",
                "station_num": 2,
                "type": 1
            },
            {
                "city": null,
                "district": null,
                "id": "28b90c73-5239-44ee-b475-e80c3224d672",
                "province": null,
                "station_name": "cs",
                "station_num": 5,
                "type": 3
            },
            {
                "city": "",
                "district": "",
                "id": "3",
                "province": "",
                "station_name": "1号充电站",
                "station_num": 3,
                "type": 2
            },
            {
                "city": "",
                "district": "",
                "id": "4",
                "province": "",
                "station_name": "2号充电站",
                "station_num": 4,
                "type": 2
            },
            {
                "city": null,
                "district": null,
                "id": "5",
                "province": null,
                "station_name": "园区1号光伏电站",
                "station_num": 1,
                "type": 3
            },
            {
                "city": null,
                "district": null,
                "id": "6",
                "province": null,
                "station_name": "3号储能站",
                "station_num": 3,
                "type": 1
            },
            {
                "city": null,
                "district": null,
                "id": "7",
                "province": null,
                "station_name": "2号光伏电站",
                "station_num": 2,
                "type": 3
            },
            {
                "city": null,
                "district": null,
                "id": "8",
                "province": null,
                "station_name": "海上光伏电站",
                "station_num": 3,
                "type": 3
            },
            {
                "city": null,
                "district": null,
                "id": "9",
                "province": null,
                "station_name": "西北光伏电站",
                "station_num": 4,
                "type": 3
            }
        ]
        publicStore._public.treeData = proxy.isNull(res)? [] : res
        publicStore._public.treeData.forEach(v => v.children = [])
        state.treeData = publicStore._public.treeData
        publicStore._public.checks = [publicStore._public.treeData[0].id]
        treeRef.setCheckedKeys(publicStore._public.checks, true)
    })
</script>