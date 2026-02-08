<template>
    <div class="ba1 flex-col-cc ww100 hh100">
        <div class="hh100 ww70 flex-cc">
            <div class="flex1 relative">
                <img class="ww100" src="@/assets/imgs/tt1.png" />
                <div class="ww100 h100x4 absolute-cc" id="Pie_watercheck">
                </div>
                <div class="absolute-cc cursor tc f14">
                    <div class="mb2 f18">{{state.sum}}吨</div>
                    <div>合计</div>
                </div>
            </div>
            <div class="flex-col-cs relative flex1 ml30">
				<div class="ww100 flex-sc tl p5 cursor" v-if="publicStore._public.pie" v-for="(v, i) in publicStore._public.pie" :key="i">
				<div class="w15 h10 mr8" :style="{background: v.color}"></div>
				<div class="w50">{{v.name}}</div>
                <div class="w50">{{v.value}}吨</div>
				<div class="w50">{{v.rate}}</div>
				</div>
			</div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import ec from "@/utils/chart";
const { drawChart } = ec();
const { proxy }: any = getCurrentInstance();
const publicStore = proxy.publicStore();

const state = reactive({
    ...publicStore.$state,
    sum:0
})
watch(() => publicStore._public.pie, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart();
  },{ immediate: false, deep: true });

async function setChart(){
    let chart = 'Pie'
    let id = 'Pie_watercheck'
    let params = {
        colorList: [],
        labelShow: false,
        internalDiameterRatio: 0.8, 
        distance: 200, 
        alpha: 30, 
        pieHeight: 20, 
        opacity: 0.8
    }
    let data = publicStore._public.pie
    data.forEach((item:any)=>{
        state.sum+=item.value||0
    })
    drawChart(chart, id, {}, data, params)
}
</script>