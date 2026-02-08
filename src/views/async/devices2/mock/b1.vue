<template>
  <div class="layout-col ba1 p10">
    <div class="ww100 flex-bc plr20 bs" style="border-bottom: none;">  
      <span class="flex-sc h42 f16">风机发电量趋势图</span>
      <span class="flex-sc ml20"></span>
    </div>
    <!-- 内容 -->
    <div class="layout-col p20 bs">
      <div class="hh100 ww100" id="Bars_DevicesDailyOutput2"></div>
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

  watch(() => publicStore._public.DevicesDailyOutput2, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
  }, { immediate: false, deep: true });

  const setChart = async(data) => {
    let chart = 'Bars'
    let id = 'Bars_DevicesDailyOutput2'
    let length = data[0]['data'].length
    let attr = {
      min: 0, 
      // max: 100,
      extent: 4, 
      // zoomStart: length < 10? 0 : length-10,
      zoomEnd: 10,
      colorList: [],
      legendArr: [],
      legendShow: false,
      labelShow: false,
      areaShow: false,
      y_name: 'kWh',
      tool_dw: '', 
      tool_name_x: '日期：', 
      tool_name_y: '数值：', 
    }
 		let series =[]
    data.forEach(v => {
			attr.legendArr.push(v.name)
			let data = v.data
			series.push({data})
		})
    data.forEach(v => {
			let data = v.data
			series.push({data})
		})
    drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
  }
</script>

<style scoped lang="scss">

</style>
