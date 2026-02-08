<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="趋势曲线图"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="table i15 ba1 p20" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr)">
      <div class="hh100 ww100 flex-col" :class="index==0?'':'mt15'" v-for="(item, index) in publicStore.active.attr.childs?publicStore.active.attr.childs:[]" :key="index">
        <div class="fontStyle bs p10 mb15" v-if="!isNull(publicStore._public) && !isNull(publicStore._public.deviceTypes)">{{find(publicStore._public.deviceTypes, ['type', item['type']], 'name')}}</div>
        <div class="hh100 ww100" style="overflow-x: auto; width: 100%;">
          <div class="hh100 ww100" style="display: inline-flex;min-width: 100%;">
            <div class="hh100 flex-col" :class="i==0?'':'pl15'" v-for="(v, i) in !isNull(item.items)?item.items:[]" :key="i" style="flex: 0 0 33.3%;">
              <div class="ww100 flex-bc plr20 bs" style="border-bottom: none;">  
                <span class="flex-sc h42">
                  <span v-if="!isNull(item.sensors)">{{v.sensor_id? find(item.sensors, ['id', v.sensor_id], 'name') : ''}}</span>
                  <span class="mlr5">/</span>
                  <span v-if="!isNull(item.meas)">{{v.code? find(item.meas, ['code', v.code], 'name') : ''}}</span>
                </span>
                <span class="flex-sc ml20"></span>
              </div>
              <div class="layout-col p20 bs">
                <div class="hh100 ww100" :id="`Line_data_${v.sensor_id}_${v.code}`"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="hh100 flex1 flex-col ml8">
         <div class="ww100 flex-bc plr20 bs" style="border-bottom: none;">  
          <span class="flex-sc h42 f16">丢包率</span>
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
    if(proxy.isNull(val.attr)) return
    if(proxy.isNull(val.attr.childs)) return
    await nextTick();
    val.res.childs.forEach(v => {
      v.items.forEach(vv => {
        if(!proxy.isNull(vv.throughput)){
          let id = `Line_data_${vv.sensor_id}_${vv.code}`
          let chartData = vv.throughput.map(vvv => { return [proxy.parseTime(vvv[0], '{h}:{i}:{s}'), vvv[1]] })
          let chart = [{name: '', data: chartData}]
          setChart1(chart, id)
        }
      })
    })
  }, { immediate: false, deep: true });

	const setChart1 = async(data, id) => {
		let chart = 'Line'
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
  