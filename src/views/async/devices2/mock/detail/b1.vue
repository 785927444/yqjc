<template>
  <div class="layout-col">
		<!-- 标题 -->
		<!-- <div class="h40 ww100 flex-sc relative">
			<img class="hh100" src="@/assets/imgs/title3.png" />
			<div class="ww100 hh100 flex-sc absolute pl35">
				<span class="fw flex1 ptb5">选择环境</span>
				<div class="flex-ec flex1"></div>
			</div>
		</div> -->
		<div class="flex1 ww100 flex-ss i15 warp">
			<!-- 图表1 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>光伏发电量趋势图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Line_PhotovoltaicPower"></div>
				</div>
			</div>
			<!-- 图表2 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>发电功率趋势图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Line_OutputPower"></div>
				</div>
			</div>
			<!-- 图表3 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>风机发电量趋势图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Line_WindPower"></div>
				</div>
			</div>
			<!-- 图表4 -->
			<div class="flex-col ww50 hh50 p5">
				<div class="ww100 flex-bc pl5 pr15 i15 ba1 mb2">  
					<span class="flex-sc h42 f16"><img class="w30" src="@/assets/imgs/title-dot.png"/><span>风机尾流损失趋势图</span></span>
					<span class="flex-sc ml20"></span>
				</div>
				<div class="flex1 hh100 flex-col ptb10 pl10 pr20 ba1">
					<div class="hh100 ww100" id="Line_WakeLoss"></div>
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

	watch(() => publicStore._public.PhotovoltaicPower, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart1(val);
	}, { immediate: false, deep: true });

	watch(() => publicStore._public.OutputPower, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart2(val);
	}, { immediate: false, deep: true });

	watch(() => publicStore._public.WindPower, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
		setChart3(val);
	}, { immediate: false, deep: true });

  watch(() => publicStore._public.WakeLoss, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart4(val);
  },{ immediate: false, deep: true });

	const setChart1 = async(data) => {
		let chart = 'Line'
		let id = 'Line_PhotovoltaicPower'
    let attr = {
			min: 0, 
			// max: 1000,
      min2: 0,
      // max2: 200,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			legendX: 'center',
			labelShow: false,
			areaShow: false,
			y_name: 'kWh',
      y_name2: 'w/㎡',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
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

	const setChart2 = async(data) => {
		let chart = 'Line'
		let id = 'Line_OutputPower'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			legendX: 'center',
			labelShow: false,
			areaShow: false,
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

	const setChart3 = async(data) => {
		let chart = 'Line'
		let id = 'Line_WindPower'
    let attr = {
			min: 0, 
			// max: 1000,
      min2: 0,
      // max2: 200,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			legendX: 'center',
			labelShow: false,
			areaShow: false,
			y_name: 'kWh',
      y_name2: 'm/s',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
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

	const setChart4 = async(data) => {
		let chart = 'Line'
		let id = 'Line_WakeLoss'
    let attr = {
			min: 0, 
			// max: 1000,
      min2: 0,
      // max2: 200,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			legendX: 'center',
			labelShow: false,
			areaShow: false,
			y_name: '%',
      y_name2: 'm/s',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
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
