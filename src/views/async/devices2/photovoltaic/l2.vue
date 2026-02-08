<template>
  <div class="layout-col">
		<!-- 标题 -->
		<!-- <aa-title title="日发电情况"><template #right-content></template></aa-title> -->
    <aa-title title="发电情况">
      <template #right-content>
        <div class="ww100 hh100 flex-ec ml20">
          <div class="flex-bc flex1 hh100">
            <span class="hh100 flex-sc plr10 cursor ptb10" 
            :class=" publicStore.actIndex==v.value?'ba2 i14':'white'" 
            v-for="(v, i) in state.actives" :key="i"
            @click.stop="publicStore.actIndex=v.value">{{v.name}}</span>
            <span class="flex1 ml15">
              <span class="w50x3 flex-sc cursor i1">
                <el-date-picker v-if="publicStore.actIndex == '2'" class="ww100" v-model="publicStore.datetimes" type="month" placeholder="请选择月份" />
                <el-date-picker v-if="publicStore.actIndex == '3'" class="ww100" v-model="publicStore.datetimes" type="year" placeholder="请选择年份" />
              </span>
            </span>
          </div>
        </div>
      </template>
    </aa-title>
    <!-- 内容 -->
    <div class="layout-col ptb12 ba1">
      <div class="hh100 ww100 plr25" id="Bars_DevicesDailyOutput"></div>
    </div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart";
import { isNull } from "@/utils/common";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
    actives: [
      {value: '-1', name: '日'},
      {value: '2', name: '月'},
      {value: '3', name: '年'},
    ],
  });

  watch(() => publicStore._public.DevicesDailyOutput, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
  }, { immediate: false, deep: true });

  const setChart = async(data) => {
    let chart = 'Bars'
    let id = 'Bars_DevicesDailyOutput'
    let length = data[0]['data'].length
    let attr = {
      min: 0, 
      // max: 100,
      extent: 4, 
      // zoomStart: length < 10? 0 : length-10,
      zoomEnd: 12,
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
