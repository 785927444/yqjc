<template>
  <div class="layout-col" style="padding: 0;">
    		<aa-title title="光伏电量情况"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <!-- <div class="flex1 ww100 flex-bc ba1 mr15">
      <div class="flex1 hh100 flex-col-cc hidden">
        <div class="w50x5 h50x5 relative p20" v-if="publicStore._public.responsesRate2">
          <img class="ww100 hh100" src="@/assets/imgs/tt1.png" />
          <div class="absolute-cc ww100 hh100" id="Pie_responsesRate2"></div>
          <div class="absolute-cc cursor tc f14">
            <img src="@/assets/imgs/电@1x.png" alt="">
          </div>
        </div>
      </div> -->
      <div class="flex1 ww100 flex-bc ba1 mr15">
      <div class="flex1 hh100 flex-col-cc hidden">
        <div class="w50x4 h50x4 relative p20" v-if="publicStore._public.responsesRate2">
          <img class="ww100" src="@/assets/imgs/tt1.png" />
          <div class="absolute-cc ww100 hh100" id="Pie_responsesRate2"></div>
          <div class="absolute-cc cursor tc f14">
            <img src="@/assets/imgs/电@1x.png" alt="">
          </div>
        </div>
      </div>
      <div class="flex-col-cs flex1 relative ml20 f16">
        <div class="ww100 flex-sc tl p5 cursor" v-if="publicStore._public.responsesRate2" v-for="(v, i) in publicStore._public.responsesRate2" :key="i">
          <div class="w10 h10 rad100 mr8" :style="{background: v.color}"></div>
          <div class="w50x3">{{v.name}}</div>
          <div class="w100 flex-sc mr10">{{v.value?v.value:0}} <span class="f12">kW</span></div>
          <div class="flex1 mr10">{{v.rate?v.rate:0}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
    sum: 0
  });

  watch(() => publicStore._public.responsesRate2, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
  },{ immediate: false, deep: true });

	const setChart = async(data) => {
    console.log("data---", data)
		let chart = 'Pie'
		let id = 'Pie_responsesRate2'
		let params = {
      radius: ['50%', '65%'],
			colorList: [],
			labelShow: false,
			internalDiameterRatio: 0.8, 
			distance: 200, 
			alpha: 30, 
			pieHeight: 20, 
			opacity: 0.8
		}
    
    state.sum = 0;
    data.forEach((item:any)=>{ state.sum += item.value || 0})
    const chartData = data.filter((item: any) => !item.hideSector);

		// 3. 饼图绘制使用过滤后的数据
		drawChart(chart, id, {}, chartData, params)
	}
</script>

<style scoped lang="scss">
</style>