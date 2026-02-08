<template>
  <div class="layout-col">
		<!-- 标题 -->
		<div class="h40 ww100 flex-sc relative">
			<img class="hh100" src="@/assets/imgs/title3.png" />
			<div class="ww100 hh100 flex-sc absolute pl35">
				<span class="fw flex1 ptb5">环境参数展示</span>
				<div class="flex-ec flex1"></div>
			</div>
		</div>
		<div class="flex1 ww100 flex-ss i15 warp">
			<!-- 图表1 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>风速变化趋势图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Line_WindSpeed"></div>
				</div>
			</div>
			<!-- 图表2 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>温度变化趋势图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Line_Temperature"></div>
				</div>
			</div>
			<!-- 图表3 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>辐照变化趋势图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Line_Irradiation"></div>
				</div>
			</div>
			<!-- 图表4 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>风向玫瑰图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Laser_WindDirection"></div>
				</div>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart"
  const { drawChart } = ec()
  const { proxy }:any = getCurrentInstance()
	const dictStore = proxy.dictStore()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
  })

	watch(() => publicStore._public.WindSpeed, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart1(val);
	}, { immediate: false, deep: true });

	watch(() => publicStore._public.Temperature, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart2(val);
	}, { immediate: false, deep: true });

	watch(() => publicStore._public.Irradiation, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart3(val);
	}, { immediate: false, deep: true });

  watch(() => publicStore._public.WindDirection, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart4(val);
  },{ immediate: false, deep: true });

	const setChart1 = async(data) => {
		let chart = 'Line'
		let id = 'Line_WindSpeed'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [dictStore.colorLists[0]],
			legendArr: [],
			legendShow: false,
			labelShow: false,
			areaShow: false,
			y_name: 'm/s',
			tool_dw: '', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let series = {data: []}
		series = data.map(v => {
			attr.legendArr.push(v.name)
			let data = v.data
			return {data}
		})
		drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
	}

	const setChart2 = async(data) => {
		let chart = 'Line'
		let id = 'Line_Temperature'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [dictStore.colorLists[1]],
			legendArr: [],
			legendShow: false,
			labelShow: false,
			areaShow: false,
			y_name: '℃',
			tool_dw: '', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let series = {data: []}
		series = data.map(v => {
			attr.legendArr.push(v.name)
			let data = v.data
			return {data}
		})
		drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
	}

	const setChart3 = async(data) => {
		let chart = 'Line'
		let id = 'Line_Irradiation'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [dictStore.colorLists[2]],
			legendArr: [],
			legendShow: false,
			labelShow: false,
			areaShow: false,
			y_name: 'w/㎡',
			tool_dw: '', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let series = {data: []}
		series = data.map(v => {
			attr.legendArr.push(v.name)
			let data = v.data
			return {data}
		})
		drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
	}

	const setChart4 = async(data) => {
		let chart = 'Laser'
		let id = 'Laser_WindDirection'
		let attr = {
			min: 0, 
			max: 100, 
			colorList: [], 
			legendArr: [],
			legendShow: true, 
			labelShow: true,	
		}
    attr.legendArr = data.map(v => { return v.name })
    let value = data.map(v => { return v.value })
    let series = [{value: value, name: '统计一'}]
		drawChart(chart, id, attr, series, {});
	}
</script>

<style scoped lang="scss">

</style>
