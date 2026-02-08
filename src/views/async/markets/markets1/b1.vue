<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title2.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">现货价格</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 i1">
            <span class="hh100 w50x3 flex-cc plr10 cursor i1 ml30" v-if="state.active=='1'">
              <el-date-picker class="ww100" v-model="state.datetime1" type="year" placeholder="请选择" @change="changeDate()" />
            </span>
            <span class="hh100 w50x3 flex-cc plr10 cursor i1 ml30" v-if="state.active=='2'">
              <el-date-picker class="ww100" v-model="state.datetime2" type="year" placeholder="请选择" @change="changeDate()" />
            </span>
            <span class="hh100 w50x3 flex-cc plr10 cursor i1 ml30" v-if="state.active=='3'">
              <el-date-picker class="ww100" v-model="state.datetime3" type="date" placeholder="请选择" @change="changeDate()" />
            </span>      
            <span class="flex-sc">
              <span class="w30 h30 rad50 bo-i1-1 tc lh32 ml15 cursor" @click.stop="calcs(-1)"><i-ep-arrowLeft /></span>
              <span class="w30 h30 rad50 bo-i1-1 tc lh32 ml15 cursor" @click.stop="calcs(1)"><i-ep-arrowRight /></span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex1 ww100 ptb20 pl20 ba1 relative">
      <div class="absolute t5 r5 z1" v-if="!isNull(configStore.user) && configStore.user.id == '1'">
        <el-button size="small" type="info" @click.stop="handleClick('out')">模板</el-button>
        <el-button size="small" type="primary" @click.stop="handleClick('in')">导入</el-button>
        <el-button size="small" type="danger" @click.stop="handleClick('del')">清空</el-button>
      </div>
      <div class="absolute t15 r15 flex-ss">
        <div class="flex-cc rad50 p8" :style="{background: find(state.actives, ['value', state.active], 'colors')['end']}">
          <span class="w12 h12 rad50" :style="{background: find(state.actives, ['value', state.active], 'colors')['color']}"></span>
        </div>
        <div class="flex-col-ss ml10">
          <div class="flex-sc" v-if="find(state.actives, ['value', state.active], 'data')">
            <span class="f24 white fw">{{ find(state.actives, ['value', state.active], 'data') }}</span>
            <span class="f12 ce ml5 mt5">{{ find(state.actives, ['value', state.active], 'dw') }}</span>
          </div>
          <div class="i15 pt5" v-if="find(state.actives, ['value', state.active], 'name')">{{ find(state.actives, ['value', state.active], 'name') }}</div>
        </div>
      </div>
      <div class="hh100 ww100" id="Line_pricesEnv1" v-if="state.active=='1'"></div>
      <div class="hh100 ww100" id="Line_pricesEnv2" v-if="state.active=='2'"></div>
      <div class="hh100 ww100" id="Line_pricesEnv3" v-if="state.active=='3'"></div>
    </div>
    <!-- 导入 -->
    <ImportData @init="init" :state="state" ref="importRef"/>
  </div>
</template>

<script lang="ts" setup>
  import api from '@/api'
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const dictStore = proxy.dictStore();
  let importRef = $ref()
  const state = reactive({
    ...publicStore.$state,
    actives: [
      {value: '1', name: '零售用户电能量电费均价', colors: dictStore.colorLists[0], dw: '元/MWh', data: ''},
      {value: '2', name: '现货偏差电量加权平均价（含分摊)', colors: dictStore.colorLists[1], dw: '元/MWh', data: ''},
      {value: '3', name: '全省发电侧加权价格', colors: dictStore.colorLists[2], dw: '元/MWh', data: ''},
    ],
    active: '1',
    datetime: {},
    datetimes: '',
    datetime1: '',
    datetime2: '',
    datetime3: '',
  });

	onMounted(async() => {
    init()
	})

  const init = () => {
    if (!state.datetime) state.datetime = {}
    // state.date = new Date().getTime()
    // const date = new Date()
    // date.setDate(date.getDate() - 6)
    state.date = 1764562332000
    const date = new Date("2025-12-31 12:12:12")
    state.datetime.year = date.getFullYear()
    state.datetime.month = date.getMonth() + 1
    state.datetime.day = date.getDate()
    state.datetime.hours = date.getHours()
    state.datetime.minutes = date.getMinutes()
    state.datetime.seconds = date.getSeconds()
    state.datetime1 = `${state.datetime.year}`
    state.datetime2 = `${state.datetime.year}`
    state.datetime3 = `${state.datetime.year}-${state.datetime.month.toString().padStart(2, '0')}-${state.datetime.day.toString().padStart(2, '0')}`
    getPricesEnv()
  }

  const changeDate = () => {
    if (!state.datetime)  state.datetime = {}
    state.datetimes = state['datetime'+state.active]
    const date = new Date(state.datetimes)
    state.datetime = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()}
    state.datetime1 = `${state.datetime.year}`
    state.datetime2 = `${state.datetime.year}`
    state.datetime3 = `${state.datetime.year}-${state.datetime.month.toString().padStart(2, '0')}-${state.datetime.day.toString().padStart(2, '0')}`
    getPricesEnv()
  }

  const calcs = async(val) => {
    const index = state.actives.findIndex(a=>a.value == state.active)
    if(index != -1) {
      let newIndex
      if (val === -1) {
        newIndex = index === 0 ? state.actives.length - 1 : index - 1
      } else if (val === 1) {
        newIndex = index === state.actives.length - 1 ? 0 : index + 1
      } else {
        console.log('无效的方向值，请输入 -1(左) 或 1(右)')
        return state.active
      }
      if(state.active != state.actives[newIndex].value){
        state.active = state.actives[newIndex].value
        await publicStore.rechart('Line_pricesEnv1')
        publicStore._public.pricesEnv1 = []
        await publicStore.rechart('Line_pricesEnv2')
        publicStore._public.pricesEnv2 = []
        await publicStore.rechart('Line_pricesEnv3')
        publicStore._public.pricesEnv3 = []
        init()
      }
    }
  }

  const getPricesEnv = async() => {
    state.model = `t_medium_price${state.active}`
    if(state.active == '1'){
      state.query = {model: state.model, args: `trade_year='${state.datetime1}'`}
      getPricesEnv1()
    }
    if(state.active == '2'){
      state.query = {model: state.model, args: `trade_year='${state.datetime2}'`}
      getPricesEnv2()
    }
    if(state.active == '3'){
      state.query = {model: state.model, args: `trade_year='${state.datetime.year}' and trade_month='${state.datetime.month}' and trade_day='${state.datetime.day}'`}
      getPricesEnv3()
    }
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const getPricesEnv1 = async() => {
    let res = await publicStore.http({Api: state.query})
    const active = state.actives.find(a=>a.value == state.active)
    active.data = 0
    const chart = [{name: active.name, key: 'value', data: []}]
    if(!proxy.isNull(res)){
      res.sort((a, b) =>a.trade_month - b.trade_month).forEach(v => {
        active.data += Number(v.value)
        chart.forEach(vv => {
          const temp = [`${v.trade_month}月`, v[vv.key]]
          vv.data.push(temp)
        })
      })
      active.data = Math.floor((active.data/res.length)*100)/100
    }
    publicStore._public.pricesEnv1 = [...chart]
  }

  const getPricesEnv2 = async() => {
    let res = await publicStore.http({Api: state.query})
    const active = state.actives.find(a=>a.value == state.active)
    active.data = 0
    const chart = [{name: active.name, key: 'value', data: []}]
    if(!proxy.isNull(res)){
      res.sort((a, b) =>a.trade_month - b.trade_month).forEach(v => {
        active.data += Number(v.value)
        chart.forEach(vv => {
          const temp = [`${v.trade_month}月`, v[vv.key]]
          vv.data.push(temp)
        })
      })
      active.data = Math.floor((active.data/res.length)*100)/100
    }
    publicStore._public.pricesEnv2 = [...chart]
  }

  const getPricesEnv3 = async() => {
    let res = await publicStore.http({Api: state.query})
    const active = state.actives.find(a=>a.value == state.active)
    active.data = 0
    const chart = [{name: active.name, key: 'value', data: []}]
    if(!proxy.isNull(res)){
      res.sort((a, b) =>new Date(a.datetime) - new Date(b.datetime)).forEach(v => {
        // active.data += Number(v.value)
        chart.forEach(vv => {
          const temp = [proxy.parseTime(v.datetime, '{h}:{i}'), v[vv.key], v.datetime]
          vv.data.push(temp)
        })
      })
      // active.data = Math.floor((active.data/res.length)*100)/100
    }
    publicStore._public.pricesEnv3 = [...chart]
  }

  watch(() => publicStore._public.pricesEnv1, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    setChart1(val)
  }, { immediate: false, deep: true })

  watch(() => publicStore._public.pricesEnv2, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    setChart2(val)
  }, { immediate: false, deep: true })

  watch(() => publicStore._public.pricesEnv3, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    setChart3(val)
  }, { immediate: false, deep: true })

	const setChart1 = async(data) => {
    const active = state.actives.find(a=>a.value == state.active)
		let chart = 'Line'
		let id = 'Line_pricesEnv1'
    let attr = {
			min: 0, 
			// max: 100,
      // min2: 0,
      // max2: 10,
			colorList: [active.colors],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: true,
      y_name: '数值',
			tool_name_x: '时间：', 
      tool_name_y: '数值：',
		}
		let datas = []
		let series = {data: []}
		series = data.map(v => {
			datas = [...datas, ...v.data]
			attr.legendArr.push({name: v.name, type: v.type})
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

	const setChart2 = async(data) => {
    const active = state.actives.find(a=>a.value == state.active)
		let chart = 'Line'
		let id = 'Line_pricesEnv2'
    let attr = {
			min: 0, 
			// max: 100,
      // min2: 0,
      // max2: 10,
			colorList: [active.colors],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: true,
      y_name: '数值',
			tool_name_x: '时间：',
      tool_name_y: '数值：',  
		}
		let datas = []
		let series = {data: []}
		series = data.map(v => {
			datas = [...datas, ...v.data]
			attr.legendArr.push({name: v.name, type: v.type})
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

	const setChart3 = async(data) => {
    const active = state.actives.find(a=>a.value == state.active)
		let chart = 'Line'
		let id = 'Line_pricesEnv3'
    let attr = {
			min: 0, 
			// max: 100,
      // min2: 0,
      // max2: 10,
			colorList: [active.colors],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: true,
      y_name: '数值',
			tool_name_x: '时间：', 
			tool_name_y: '数值：', 
		}
		let datas = []
		let series = {data: []}
		series = data.map(v => {
			datas = [...datas, ...v.data]
			attr.legendArr.push({name: v.name, type: v.type})
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

  const handleClick = async(remark) => {
    if(remark == 'out'){
      let query = {model: `t_medium_price${state.active}`}
      let res = await publicStore.http({Api: query})
      res.forEach(v => {
        if(v.datetime && v.datetime.indexOf('+')!=-1) v.datetime = v.datetime.split('+')[0];
      })
      let list = [...res]
      const active = state.actives.find(a=>a.value == state.active)
      let name = `现货价格-${active.name}-模板`
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'trade_day', name: '日'},
        {key: 'datetime', name: '时间'},
        {key: 'value', name: '电价'},
      ]
      proxy.handleExport(content, list, name)
    } 
    if(remark == 'in'){
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'trade_day', name: '日'},
        {key: 'datetime', name: '时间'},
        {key: 'value', name: '电价'},
      ]
      let ctx = {content: content, key: state.key, query: state.query, unique: ''}
      importRef.onVisable(ctx)
    }
    if(remark == 'del'){
      ElMessageBox.confirm('请确定已保存模板?', '删除提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'error'}).then(async() => {
      let query = {model: `t_medium_price${state.active}`}
      let res = await publicStore.http({Api: query})
        let params = {model: state.model, list: res}
        api.delApi(params).then((res:any) => {
          if(res.code == 200){
            init()
            ElNotification({ title: '提示', message: '操作成功', type: 'success' })
          }else{
            ElNotification({ title: '提示', message: res.msg?res.msg:'操作失败', type: 'error' })
          }
        }).catch((err) => {
          ElNotification({ title: '提示', message: '操作失败', type: 'error' })
        })
      })
    }
  }

</script>

<style scoped lang="scss">

</style>
