<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">气象数据</span>
        <div class="flex-ec flex2 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex1 ww100 ptb20 pl20 ba1">
      <div class="hh100 ww100" id="Line_loadsEnv1" v-if="state.active==1"></div>
      <div class="hh100 ww100" id="Line_loadsEnv2"  v-if="state.active==2"></div>
    </div>
    <div class="flex1 ww100 p20 ba1">
      <div class="hh100 ww100" id="Line_loadsWind1" v-if="state.active==1"></div>
      <div class="hh100 ww100" id="Line_loadsWind2"  v-if="state.active==2"></div>
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
    active: '1',
    actives: [
      {value: '1', name: '当日'},
      {value: '2', name: '未来'},
    ]
  });

  watch(() => state.active, async(val, old) => {
    if(state.active == 1){
      await publicStore.rechart('Line_loadsEnv1')
			await publicStore.rechart('Line_loadsWind1')
      await nextTick();
      setChart1(publicStore._public.loadsEnv1);
			setChart3(publicStore._public.loadsWind1);
    }
    if(state.active == 2){
			await publicStore.rechart('Line_loadsEnv2')
      await publicStore.rechart('Line_loadsWind2')
      await nextTick();
      setChart2(publicStore._public.loadsEnv2);
			setChart4(publicStore._public.loadsWind2);
    }
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.loadsEnv1, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart1(val);
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.loadsEnv2, async(val, old) => {
    if(state.active==1) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart2();
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.loadsWind1, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart3(val);
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.loadsWind2, async(val, old) => {
    if(state.active==1) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart4();
  }, { immediate: false, deep: true });

	const setChart1 = async(data) => {
		let chart = 'Line'
		let id = 'Line_loadsEnv1'
    let attr = {
			min: 0, 
			max: 100,
      min2: 0,
      max2: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: '温度 ℃',
      y_name2: '湿度 %',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let series = data.map(v => {
			attr.legendArr.push(v.name)
			return {data: v.data}
		})
		drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
	}

	const setChart2 = async(data) => {
		let chart = 'Line'
		let id = 'Line_loadsEnv2'
    let attr = {
			min: 0, 
			max: 100,
      min2: 0,
      max2: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: '温度 ℃',
      y_name2: '湿度 %',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let series = data.map(v => {
			attr.legendArr.push(v.name)
			return {data: v.data}
		})
		drawChart(chart, id, attr,  {series: series, xAxis: {}}, {});
	}

	const setChart3 = async(data) => {
		let chart = 'Line'
		let id = 'Line_loadsWind1'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [{color: '#60E7FF', start: 'rgba(96, 231, 255, 1)', end: 'rgba(96, 231, 255, 0)'}],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: 'm/s',
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

	const setChart4 = async(data) => {
		let chart = 'Line'
		let id = 'Line_loadsWind2'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [{color: '#60E7FF', start: 'rgba(96, 231, 255, 1)', end: 'rgba(96, 231, 255, 0)'}],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: 'm/s',
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
</script>

<style scoped lang="scss">

</style>
