<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="日充放电量情况"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-col ptb12 ba1">
      <div class="hh100 ww100 plr25" id="Bars_DevicesDailyput"></div>
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

  watch(() => publicStore._public.DevicesDailyput, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    const charts = alignData(val)
    setChart(charts);
  }, { immediate: false, deep: true });

  const setChart = async(data) => {
    let chart = 'Bars'
    let id = 'Bars_DevicesDailyput'
    let length = data[0]['data'].length
    let attr = {
      min: 0, 
      // max: 100,
      extent: 4, 
      // zoomStart: length < 10? 0 : length-10,
      zoomEnd: 8,
      colorList: [],
      legendArr: [],
      legendShow: true,
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

	const alignData = (originalArray) => {
    const limit = 5
    // 收集所有时间戳
    const allTimes = [...new Set(originalArray.flatMap(item => item.data.map(d => d[2])))].sort();
    // 取最后limit个时间
    const recentTimes = allTimes.slice(-limit);
    // 对齐所有数据集
    return originalArray.map(item => {
      const dataMap = new Map(item.data.map(d => [d[2], d]));
      return {
        ...item,
        data: recentTimes.map(ts => 
          dataMap.get(ts) || [ts.slice(5, 10), 0, ts]
        )
      };
    });
  };
</script>

<style scoped lang="scss">

</style>
