<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title1.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">邀约计划</span>
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
      <div class="hh100 ww100" id="Line_responsesInvit1" v-if="state.active==1"></div>
      <div class="hh100 ww100" id="Line_responsesInvit2"  v-if="state.active==2"></div>
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
      {value: '1', name: '日内'},
      {value: '2', name: '日前'},
    ]
  });

  watch(() => state.active, async(val, old) => {
    if(state.active == 1){
      await publicStore.rechart('Line_responsesInvit1')
      await nextTick();
      setChart1(publicStore._public.responsesInvit1);
    }
    if(state.active == 2){
			await publicStore.rechart('Line_responsesInvit2')
      await nextTick();
      setChart2(publicStore._public.responsesInvit2);
    }
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.responsesInvit1, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart1(val);
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.responsesInvit2, async(val, old) => {
    if(state.active==1) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart2();
  }, { immediate: false, deep: true });

	const setChart1 = async(data) => {
		let chart = 'Line'
		let id = 'Line_responsesInvit1'
    let attr = {
			min: 0, 
			// max: 100,
      min2: 0,
      max2: 10,
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
      y_name2: '元/kWh',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		// let series = data.map((v, i) => {
		// 	attr.legendArr.push(v.name)
		// 	return {data: v.data}
		// })
		// drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      let data = v.data
      return {data}
    })
    let xAxis = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    // 处理所有待插入的时间点
    tempDatas.forEach(time => {
      xAxis = insertTime(xAxis, time[0]);
    });
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

	const setChart2 = async(data) => {
		let chart = 'Line'
		let id = 'Line_responsesInvit2'
    let attr = {
			min: 0, 
			// max: 100,
      min2: 0,
      max2: 10,
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
      y_name2: '元/kWh',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		// let series = data.map((v, i) => {
		// 	attr.legendArr.push(v.name)
		// 	return {data: v.data}
		// })
		// drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      let data = v.data
      return {data}
    })
    let xAxis = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    // 处理所有待插入的时间点
    tempDatas.forEach(time => {
      xAxis = insertTime(xAxis, time[0]);
    });
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

  // 将时间字符串转换为分钟数方便比较
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // 在有序数组中插入新时间点（保持排序）
  function insertTime(sortedArray, newTime) {
    const newTimeMinutes = timeToMinutes(newTime);
    
    // 如果时间已存在，则不插入
    if (sortedArray.includes(newTime)) {
      return sortedArray;
    }
    
    // 找到插入位置
    let insertIndex = sortedArray.findIndex(time => {
      return timeToMinutes(time) > newTimeMinutes;
    });
    
    // 如果没找到（新时间最大），则插入到最后
    if (insertIndex === -1) {
      insertIndex = sortedArray.length;
    }
    
    // 插入新时间点
    sortedArray.splice(insertIndex, 0, newTime);
    return sortedArray;
  }

</script>

<style scoped lang="scss">

</style>
