<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="发电功率情况"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-col p12 ba1">
      <div class="hh100 ww100" id="Line_DevicesOutputPower"></div>
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

	watch(() => publicStore._public.DevicesOutputPower, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart(val);
	}, { immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Line'
		let id = 'Line_DevicesOutputPower'
		let attr = {
				min: 0, 
				// max: 100,
				extent: 4, 
				colorList: [],
				legendArr: [],
				legendShow: true,
				labelShow: false,
				areaShow: true,
				y_name: 'kW',
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
