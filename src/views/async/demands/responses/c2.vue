<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">受邀时段负荷情况</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex1 ww100 ptb20 pl20 ba1">
      <div class="hh100 ww100" id="Line_responsesLoads"></div>
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

  watch(() => publicStore._public.responsesLoads, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
  },{ immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Line'
		let id = 'Line_responsesLoads'
    let attr = {
			min: 0, 
			// max: 100,
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		// let series = data.map((v, i) => {
		// 	attr.legendArr.push(v.name)
		// 	return {data: v.data}
		// })
		// drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      let data = v.data
      return {data}
    })
    let xAxis = []
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    tempDatas.forEach(v => {
      let x = xAxis.find(a=>a == v[0])
      if(!x) xAxis.push(v[0])
    })
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}
</script>

<style scoped lang="scss">

</style>
