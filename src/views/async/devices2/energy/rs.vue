<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="SOC趋势曲线"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-col p12 ba1">
      <div class="hh100 ww100" id="Line_Soc"></div>
    </div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
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

	watch(() => publicStore._public.DevicesSoc, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart(val);
	}, { immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Line'
		let id = 'Line_Soc'
		let attr = {
				min: 0, 
				// max: 100,
				extent: 4, 
				colorList: [],
				legendArr: [],
				legendShow: true,
				labelShow: false,
				areaShow: true,
				y_name: '%',
				tool_dw: '', 
				tool_name_x: '日期：', 
				tool_name_y: '数值：', 
		}
		// let series = {data: []}
		// series = data.map(v => {
		// 		attr.legendArr.push(v.name)
		// 		let data = v.data
		// 		return {data}
		// })
		// console.log("series---", series)
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
