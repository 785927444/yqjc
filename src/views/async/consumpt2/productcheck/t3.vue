<template>
    <div class="layout-col">
        <div class="h40 ww100 flex-sc relative mb10">
            <img class="hh100 ww100" src="@/assets/imgs/subtitle2.png"/>
            <div class="ww100 hh100 flex-sc absolute ">
                <span class="fw flex1 ptb5 pl40">发电趋势</span>
                <div class="flex-ec flex1 hh100">
                    <div class="w100x4">
                        <el-date-picker class="ww100" v-model="publicStore.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex1 ww100 hh100 ba1" id="line_nhjc_cxjc"></div>
    </div>
</template>
<script setup lang="ts">
import ec from "@/utils/chart";
    const { drawChart } = ec();
    const { proxy }: any = getCurrentInstance();
    const publicStore = proxy.publicStore();
    const state = reactive({
        ...publicStore.$state,
    })

    watch(() => publicStore._public.charts, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        setChart();
    },{ immediate: false, deep: true });

    async function setChart(){
        let chart = 'Line'
        let id = 'line_nhjc_cxjc'
        let attr = {
            min: 0, 
            // max: 100,
            extent: 4, 
            colorList: [],
            legendArr: [],
            legendShow: false,
            labelShow: true,
            areaShow: true,
            y_name: 'kwh',
            tool_dw: 'kwh', 
            tool_name_x: '日期：', 
            tool_name_y: '数值：', 
        }
        let data = publicStore._public.charts
        let series = {data: []}
        series = data.map(v => {
            attr.legendArr.push(v.name)
            let data = v.data
            return {data}
        })
        drawChart(chart, id, attr, {series: series}, {});
    }
</script>