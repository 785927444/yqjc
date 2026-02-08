<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">当日发电情况</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="layout-col p20 ba1">
      <div class="hh100 ww100" id="Line_pvData1" v-if="state.active==1"></div>
      <div class="hh100 ww100" id="Line_pvData2"  v-if="state.active==2"></div>
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
      {value: '1', name: '屋顶光伏'},
      {value: '2', name: '其他光伏'},
    ]
  });

  watch(() => state.active, async(val, old) => {
    if(state.active == 1){
      await publicStore.rechart('Line_pvData1')
      await nextTick();
      setChart1();
    }
    if(state.active == 2){
      await publicStore.rechart('Line_pvData2')
      await nextTick();
      setChart2()
    }
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.pvData1, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart1()
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.pvData2, async(val, old) => {
    if(state.active==1) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart2()
  }, { immediate: false, deep: true });

	const setChart1 = async() => {
		let chart = 'Line'
		let id = 'Line_pvData1'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: 'MWh',
			tool_dw: 'MWh', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let data = publicStore._public.pvData1
		let series = {data: []}
		series = data.map(v => {
			attr.legendArr.push(v.name)
			let data = v.data
      if(v.data.length>20) attr.symbol = true
			return {data}
		})
		drawChart(chart, id, attr, {series: series}, {});
	}

	const setChart2 = async() => {
		let chart = 'Line'
		let id = 'Line_pvData2'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: 'MWh',
			tool_dw: 'mWh', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let data = publicStore._public.pvData2
		let series = {data: []}
		series = data.map(v => {
			attr.legendArr.push(v.name)
			let data = v.data
      if(v.data.length>20) attr.symbol = true
			return {data}
		})
		drawChart(chart, id, attr, {series: series}, {});
	}
</script>

<style scoped lang="scss">

</style>
