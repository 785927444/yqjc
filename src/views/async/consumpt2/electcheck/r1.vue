<template>
    <div class="layout-col ba1">
        <div class="h40 ww100 flex-sc relative mb10">
            <div class="ww100 hh100 flex-sc absolute">
                <div class="flex-sc flex1 hh100">
                <span class="hh100 flex-cc plr30 cursor" 
                :class="state.active==v.value?'bs4 white':'i14'" 
                v-for="(v, i) in state.actives" :key="i"
                @click.stop="state.active=v.value">{{v.name}}</span>
                </div>
            </div>
        </div>
        <div class="flex1 ww100 flex-col">
            <div class="hh100 ww100 p20" id="Line_nhjc_ydjc" v-if="state.active==1"></div>
            <div class="hh100 ww100 p20" id="Bar_nhjc_ydjc" v-if="state.active==2"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ec from "@/utils/chart";
    const { drawChart } = ec();
    const { proxy }: any = getCurrentInstance();
    const publicStore = proxy.publicStore();
    const configStore = proxy.configStore();
    const state = reactive({
        ...publicStore.$state,
        active:1,
        actives:[
            {name:"曲线图",value:1},
            // {name:"柱状图",value:2},
        ],
    })

    watch(() => publicStore._public.line, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        setChart1();
    },{ immediate: false, deep: true });

    async function setChart1(){
        let chart = "Line";
        const id = "Line_nhjc_ydjc";
        let attr = {
            min: 0, 
            // max: 100,
            extent: 4, 
            colorList: [],
            legendArr: [],
            legendShow: true,
            labelShow: false,
            areaShow: true,
            y_name: '用电量/kwh',
            tool_dw: 'kw', 
            tool_name_x: '日期：', 
            tool_name_y: '数值：', 
        }
        let data = publicStore._public.line
        let series = {data: []}
        series = data.map(v => {
            attr.legendArr.push(v.name)
            let data = v.data
            return {data}
        })
        drawChart(chart, id, attr, {series: series}, {});
    }

    async function setChart2(){
        let chart = 'Bar2'
        let id = 'Bar_nhjc_ydjc'
        let attr = {
            min: 0, 
            // max: 100,
            extent: 4, 
            colorList: [],
            legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
            y_name: '用电量/kwh',
            tool_dw: 'kw', 
            tool_name_x: '日期：', 
            tool_name_y: '数值：', 
        }
        let data = publicStore._public.line
        let series = {data: []}
        series = data.map(v => {
            attr.legendArr.push(v.name)
            let data = v.data
            return {data}
        })
        drawChart(chart, id, attr, {series: series}, {});
    }
</script>