<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="趋势曲线图"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-row i15 ba1 p20">
      <div class="hh100 flex1 flex-col">
        <div class="ww100 flex-bc plr20 bs" style="border-bottom: none;">  
          <span class="flex-sc h42 f16">响应时间</span>
          <span class="flex-sc ml20"></span>
        </div>
        <div class="layout-col p20 bs">
          <div class="hh100 ww100" id="Line_data1"></div>
        </div>
      </div>
      <!-- <div class="hh100 flex1 flex-col ml8">
         <div class="ww100 flex-bc plr20 bs" style="border-bottom: none;">  
          <span class="flex-sc h42 f16">延时时间</span>
          <span class="flex-sc ml20"></span>
        </div>
        <div class="layout-col p20 bs">
          <div class="hh100 ww100" id="Line_data2"></div>
        </div>
      </div> -->
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
      let chart = [{name: '响应时间', data: chartData}]
      setChart1(chart)
    }
    // if(!proxy.isNull(val.res.loss)) {
    //   let chartData = val.res.loss.map(v => { return [proxy.parseTime(v[0], '{h}:{i}:{s}'), v[1]] })
    //   let chart = [{name: '延时时间', data: chartData}]
    //   setChart2(chart)
    // }
  }, { immediate: false, deep: true });

	const setChart1 = async(data) => {
		let chart = 'Line'
		let id = 'Line_data1'
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

	// const setChart2 = async(data) => {
	// 	let chart = 'Line'
	// 	let id = 'Line_data2'
	// 	let attr = {
	// 		min: 0, 
	// 		// max: 100,
	// 		extent: 4, 
	// 		colorList: [{color: '#FFC860', start: 'rgba(255, 200, 96, 0.5)', end: 'rgba(255, 200, 96, 0.1)'}],
	// 		legendArr: [],
	// 		legendShow: true,
	// 		labelShow: false,
	// 		areaShow: true,
	// 		y_name: '数值',
	// 		tool_dw: '', 
	// 		tool_name_x: '日期：', 
	// 		tool_name_y: '数值：', 
	// 	}
  //   let datas = []
  //   let series = {data: []}
  //   series = data.map(v => {
  //     datas = [...datas, ...v.data]
  //     attr.legendArr.push(v.name)
  //     if(v.data.length>20) attr.symbol = true
  //     let data = v.data
  //     return {data}
  //   })
  //   let xAxis = []
  //   let tempDatas = datas.sort((a, b) => a[2] - b[2])
  //   tempDatas.forEach(v => {
  //     let x = xAxis.find(a=>a == v[0])
  //     if(!x) xAxis.push(v[0])
  //     if(v[1] < 0) delete attr.min
  //   })
  //   drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	// }
</script>
  
<style scoped lang="scss">

</style>
  