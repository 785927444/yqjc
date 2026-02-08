<template>
    <div class="ba1 layout-col">
        <div class="h40 ww100 flex-sc relative mb10">
            <img class="hh100 ww100" src="@/assets/imgs/title3.png" />
            <div class="ww100 hh100 flex-sc absolute pl40">
                <span class="fw flex1 ptb5">曲线数据</span>
                <div class="flex-ec flex1 hh100">
                    <span class="hh100 flex-cc plr10 cursor" 
                    :class="state.active==v.value?'bs4 white':'i14'" 
                    v-for="(v, i) in state.actives" :key="i"
                    @click.stop="state.active=v.value">{{v.name}}</span>
                </div>
            </div>
        </div>
        <div class="flex1 ww100 hh100 p20" v-if="state.active == 1" id="Line_sjnh_pdfh1"></div>
        <div class="flex1 ww100 hh100 p20" v-if="state.active == 2" id="Line_sjnh_pdfh2"></div>
    </div>
</template>
<script lang="ts" setup>
    import ec from "@/utils/chart";
    const { drawChart } = ec();
    const { proxy }: any = getCurrentInstance();
    const publicStore = proxy.publicStore();

    const state = reactive({
        ...publicStore.$state,
        active:1,
        actives:[{name:"配电房负荷",value:1}, {name:"日用电量",value:2}]
    })

    watch(() => state.active, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        if(val == 1) {
            publicStore.rechart('Line_sjnh_pdfh2')
            setChart3()
        }
        if(val == 2) {
            publicStore.rechart('Line_sjnh_pdfh1')
            setChart4()
        }
    },{ immediate: false, deep: true });

    watch(() => publicStore._public.lines3, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        setChart3();
    },{ immediate: false, deep: true });

    watch(() => publicStore._public.lines4, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        setChart4();
    },{ immediate: false, deep: true });

    async function setChart3(){
        let chart = "Line";
        const id = "Line_sjnh_pdfh1";
        let attr = {
            min: 0, 
            // max: 100,
            extent: 4, 
            colorList: [],
            legendArr: [],
            legendShow: true,
            labelShow: false,
            areaShow: false,
            yAxisShow:false,
            y_name: '用电量/kw',
            tool_dw: 'kw', 
            tool_name_x: '日期：', 
            tool_name_y: '数值：', 
        }
        let data = publicStore._public.lines3
        let series = {data: []}
        series = data.map(v => {
            attr.legendArr.push(v.name)
            let data = v.data
            return {data}
        })
        drawChart(chart, id, attr, {series: series}, {});
    }

    async function setChart4(){
        let chart = "Line";
        const id = "Line_sjnh_pdfh2";
        let attr = {
            min: 0, 
            // max: 100,
            extent: 4, 
            colorList: [],
            legendArr: [],
            legendShow: true,
            labelShow: false,
            areaShow: false,
            yAxisShow:false,
            y_name: '用电量/kw',
            tool_dw: 'kw', 
            tool_name_x: '日期：', 
            tool_name_y: '数值：', 
        }
        let data = publicStore._public.lines4
        let series = {data: []}
        series = data.map(v => {
            attr.legendArr.push(v.name)
            let data = v.data
            return {data}
        })
        drawChart(chart, id, attr, {series: series}, {});
    }
</script>