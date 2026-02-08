<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title3.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">负荷曲线</span>
        <div class="flex-ec flex1 hh100">
          <div class="ml15">用户：</div>
          <div class="w100x4">
            <el-select v-model="state.userid" placeholder="请选择" style="width:100%" clearable filterable :multiple="true" @change="publicStore.rechart('Line_loadsReal');changeUserid()">
              <!-- <el-option label="全部" value="0" /> -->
              <el-option v-for="v in !isNull(state.users)?state.users:[]" :key="v.id" :value="v.id" :label="v.name" />
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="layout-col p20 ba1">
      <!-- 实际 -->
      <div class="flex1 ww100 hidden flex-col mb20">
        <div class="ww100 flex-bc h40 lh40 bgi22 i15 mb15">  
          <span class="flex-sc f16">
            <img class="w30" src="@/assets/imgs/title-dot.png"/>
            <span>实时负荷曲线</span>
          </span>
          <span class="flex-sc pr10 cursor" @click="state.check = !state.check; publicStore.rechart('Line_loadsReal'); setChart1(publicStore._public.loadsReal)">
            <span v-if="!state.check" class="w16 h16 flex-cc rad2 bo-i1-1 bgi22 mr6 f12 i1"></span>
            <span v-if="state.check" class="w16 h16 flex-cc rad2 bo-i1-1 bgi22 mr6 f12 i1"><i-ep-select /></span>
            <span>历史预测负荷曲线</span>
          </span>
        </div>
        <div class="hh100 ww100" id="Line_loadsReal"></div>
      </div>
      <!-- 预测 -->
       <div class="flex1 ww100 hidden flex-col">
        <div class="ww100 flex-bc h40 lh40 bgi22 i15 mb15">  
          <span class="flex-sc f16">
            <img class="w30" src="@/assets/imgs/title-dot.png"/>
            <span>预测负荷曲线</span>
          </span>
          <span class="flex-ec flex2 hh100">
            <span class=" flex-cc plr10 cursor" 
            :class="state.active==v.value?'bs4 white':'i14'" 
            v-for="(v, i) in state.actives" :key="i"
            @click.stop="state.active=v.value">{{v.name}}</span>
          </span>
        </div>
        <div class="hh100 ww100" id="Line_loadsPredict1" v-if="state.active==1"></div>
        <div class="hh100 ww100" id="Line_loadsPredict2" v-if="state.active==2"></div>
       </div>
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
      {value: '1', name: '未来1天'},
      {value: '2', name: '未来7天'},
    ],
    userid: ['1', '2', '3'],
    users: [
      {id: '1', name: '工业负荷'},
      {id: '2', name: '商业负荷'},
      {id: '3', name: '居民负荷'},
    ],
    check: true,
    colors: [
      {color: '#60E7FF', start: 'rgba(96, 231, 255, 0.5)', end: 'rgba(96, 231, 255, 0.1)'},
      {color: '#FFC860', start: 'rgba(255, 200, 96, 0.5)', end: 'rgba(255, 200, 96, 0.1)'}, 
      {color: '#F45C5C', start: 'rgba(96, 231, 255, 1)', end: 'hsla(189, 100.00%, 68.80%, 0.00)'},
      {color: '#6097FF', start: 'rgba(96, 151, 255, 1)', end: 'rgba(96, 151, 255, 0.1)'}, 
    ]
  });

  watch(() => state.active, async(val, old) => {
    await nextTick();
    if(state.active == 1){
      await publicStore.rechart('Line_loadsPredict1')
      setChart3(publicStore._public.loadsPredict1);
    }
    if(state.active == 2){
			await publicStore.rechart('Line_loadsPredict2')
			setChart4(publicStore._public.loadsPredict2);
    }
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.loadsReal, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart1(val);
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.loadsPredict1, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart3(val);
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.loadsPredict2, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart4(val);
  }, { immediate: false, deep: true });

  const changeUserid = async() => {
    setChart1(publicStore._public.loadsReal)
    if(state.active == 1){
      setChart3(publicStore._public.loadsPredict1)
    }
    if(state.active == 2){
			setChart4(publicStore._public.loadsPredict2)
    }
  }

  const filterUser = (data) => {
    // if(proxy.isNull(state.userid)) return data
    return data.filter(item => state.userid.includes(item.id)  || item.id == '')
  }

  const filterCheck = (data) => {
    let datas = state.check? data : data.filter(a=>a.type == 'solid')
    let colors = []
    if(state.check) {
      datas.forEach((v, i) => {
        let temp1 = {...state.colors[i]}
        colors.push(temp1)
        let temp2 = {...temp1}
        temp2.type = 'dotted'
        colors.push(temp2)
      })
    }else{
     colors = [...state.colors]
    }
    return {datas: datas, colors: colors}
  }

	const setChart1 = async(data) => {
    data = filterUser(data)
    let res = filterCheck(data)
    data = res.datas
    let colors = res.colors
		let chart = 'Line'
		let id = 'Line_loadsReal'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: colors,
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
			tool_dw: 'kW', 
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

	const setChart3 = async(data) => {
    data = filterUser(data)
		let chart = 'Line'
		let id = 'Line_loadsPredict1'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
			tool_dw: 'kW', 
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
    data = filterUser(data)
		let chart = 'Line'
		let id = 'Line_loadsPredict2'
		let attr = {
			min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
			tool_dw: 'kW', 
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
