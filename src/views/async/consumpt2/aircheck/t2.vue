<template>
    <div class="layout-col ba1 p15">
        <div class="h40 ww100 flex-sc relative mb10">
            <div class="ww100 hh100 flex-sc absolute">
                <div class="flex-sc flex1 hh100">
                <span class="hh100 flex-cc plr20 cursor" 
                :class="state.active==v.value?'bs4 white':'i14'" 
                v-for="(v, i) in state.actives" :key="i"
                @click.stop="state.active=v.value">{{v.name}}</span>
                </div>
                <span class="flex-sc hh100 absolute r15">
                    <div class="w100x4">
                        <el-date-picker class="ww100" v-model="publicStore.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
                    </div>
                </span>
            </div>
        </div>
        <div class="layout-row">
            <div class="flex3 hh100 p15">
                <div class="ww100 hh100 flex-sc" id="Bar_elect_usedata"></div>
            </div>
            <!-- <div class="flex1 flex-col-cc hh100">
                <div class="relative flex1 ww100 flex-col-cc">
                    <img class="absolute-cc ww50" src="@/assets/imgs/tt1.png" />
                    <div class="ww100 h50x6" id="Pie_elect_piedata"></div>
                    <div class="absolute-cc cursor tc f14">
                        <div class="mb2"><span class="f20">{{ state.sum }}</span>kwh</div>
                        <div>日用电量</div>
                    </div>
                </div>
                <div class="relative flex1 ww100 flex-col-ss">
                    <div class="ww100 flex-cc tl p5 cursor" v-if="publicStore._public.electPieData" v-for="(v, i) in publicStore._public.electPieData" :key="i">
                        <div class="w15 h10 mr8" :style="{background: v.color}"></div>
                        <div class="w70">{{v.name}}</div>
                        <div class="w70">{{v.value}}吨</div>
                        <div class="w70">{{v.rate}}</div>
                    </div>
                </div>
            </div> -->
        </div>
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
    sum:0,
    actives:[
        {name:"日用电",value:1},
        {name:"月用电",value:2},
        {name:"年用电",value:3},
    ]
})

watch(() => state.active, async(val, old) =>{
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    publicStore.rechart('Bar_elect_usedata')
    setChart(publicStore._public["charts"+val]);
},{ immediate: false, deep: true });

watch(() => publicStore._public.charts1, async(val, old) =>{
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
},{ immediate: false, deep: true });

// watch(() => publicStore._public.charts1, async(val, old) =>{
//     if(proxy.isNull(val)) return
//     if(JSON.stringify(val) == JSON.stringify(old)) return
//     await nextTick();
//     setChart();
// },{ immediate: false, deep: true });

// watch(() => publicStore._public.charts1, async(val, old) =>{
//     if(proxy.isNull(val)) return
//     if(JSON.stringify(val) == JSON.stringify(old)) return
//     await nextTick();
//     setChart();
// },{ immediate: false, deep: true });

async function setChart(val){
    let chart = 'Bars'
	let id = 'Bar_elect_usedata'
	let attr = {
		min: 0, 
        extent: 4, 
        colorList: [],
        legendArr: [],
        legendShow: true,
        labelShow: false,
        areaShow: true,
		y_name: 'kwh',
		tool_dw: 'kw', 
		tool_name_x: '厂站：', 
		tool_name_y: '数值：', 
	}
	let data = val
	let series =[]
    data.forEach(v => {
        attr.legendArr.push(v.name)
        let data = v.data
        series.push({data})
    })
    data.forEach(v => {
        let data = v.data
        series.push({data})
    })
    attr.colorList=[{r:96,g:231,b:255},{r:255,g:200,b:96}];
	drawChart(chart, id, attr, {series: series}, {});
}
</script>