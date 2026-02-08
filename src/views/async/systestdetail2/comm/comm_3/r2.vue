<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="趋势曲线图"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-row i15 ba1 p20">
      <div class="hh100 ww100" id="Line_datas"></div>
    </div>
    <!-- 底部 -->
    <aa-foot></aa-foot>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart"
  const { drawChart } = ec()
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
  })

  watch(() => publicStore.active, async(val, old) => {
    if(proxy.isNull(val)) return
    if(proxy.isNull(val.res)) return
    await nextTick();
    if(!proxy.isNull(val.res.throughput)) {
      let chartData = val.res.throughput.map(v => { return [proxy.parseTime(v[0], '{h}:{i}:{s}'), v[1]] })
      let chart = [{name: '曲线', data: chartData}]
      setChart(chart)
    }
  }, { immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Line'
		let id = 'Line_datas'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [{color: '#60E7FF', start: 'rgba(96, 231, 255, 1)', end: 'rgba(96, 231, 255, 0)'}],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: '数值',
			tool_dw: '', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      if(v.data.length>20) attr.symbol = true
      let data = v.data
      return {data}
    })
    let xAxis = []
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    tempDatas.forEach(v => {
      let x = xAxis.find(a=>a == v[0])
      if(!x) xAxis.push(v[0])
      if(v[1] < 0) delete attr.min
    })
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

</script>
  
<style scoped lang="scss">

</style>
  