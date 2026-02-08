<template>
  <div class="layout-col">
    <!-- 标题 -->
		<div class="h40 ww100 flex-sc relative mb5">
			<img class="hh100" src="@/assets/imgs/title.png" />
			<div class="ww100 hh100 flex-sc absolute pl35">
				<span class="fw flex1 ptb5">储能柜充放电功率情况</span>
				<div class="flex-ec flex1"></div>
			</div>
		</div>
    <!-- 内容 -->
    <div class="layout-col p12 ba1 relative">
			<div class="absolute tt40 l10 z1" style="color: #FFC860; opacity: 0.5;" v-if="!isNull(publicStore._public.DevicesInputPower)">放电</div>
      <div class="absolute tt52 b90 l10 z1" style="color: #60E7FF; opacity: 0.5;" v-if="!isNull(publicStore._public.DevicesInputPower)">充电</div>
			<div class="hh100 ww100" id="Line_DevicesInputPower"></div>
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

	watch(() => publicStore._public.DevicesInputPower, async(val, old) => {
		if(proxy.isNull(val)) return
		if(JSON.stringify(val) == JSON.stringify(old)) return
		await nextTick();
    const charts = alignData(val)
		setChart(charts);
	}, { immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Line'
		let id = 'Line_DevicesInputPower'
		let attr = {
			// min: 0, 
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
		let series = {data: []}
		series = data.map(v => {
			attr.legendArr.push(v.name)
			let data = v.data
      if(v.data.length>20) attr.symbol = true
			return {data}
		})
		drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
	}

  const alignData = (originalArray) => {
    const sourceData = originalArray[0].data;
    const positiveData = []; // 对应充电
    const negativeData = []; // 对应放电
    sourceData.forEach(point => {
        const [time, value] = point; // 时间戳（索引 0）和数值（索引 1）是 Echarts 需要的
        // 创建对齐点
        if (value > 0) {
            // 正值：加入正系列，负系列为 0
            positiveData.push([time, value]);
            negativeData.push([time, 0]);
        } else if (value < 0) {
            // 负值：正系列为 0，加入负系列
            positiveData.push([time, 0]);
            negativeData.push([time, value]);
        } else {
            // 0 值：均为 0（以保持 x 轴连续）
            positiveData.push([time, 0]);
            negativeData.push([time, 0]);
        }
    });
		return  [
			{name: "储能充电功率", data: negativeData },
			{name: "储能放电功率", data: positiveData }
		]
  }
</script>

<style scoped lang="scss">

</style>
