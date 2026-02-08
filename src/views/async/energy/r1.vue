<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">当日总负荷曲线图</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="layout-col p20 ba1">
      <div class="hh100 ww100" id="Line_loadData"></div>
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
  });

  watch(() => publicStore._public.loadData, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart();
  }, { immediate: false, deep: true });

	const setChart = async() => {
		let chart = 'Line'
		let id = 'Line_loadData'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: 'MW',
			tool_dw: 'MW', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let data = publicStore._public.loadData
		let series = {data: []}
		series = data.map(v => {
			attr.legendArr.push(v.name)
			let data = v.data
      if(v.data.length>20) attr.symbol = true
			return {data}
		})
		drawChart(chart, id, attr, {series: series}, {});
	}
</script>

<style scoped lang="scss">

</style>
