<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title3.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="flex-sc flex3 hh100">
          <span class="fw">现货市场行情</span>
          <div class="flex-ec flex1 hh100 pr20">
            <span class="hh100 flex-cc plr10 cursor" 
            :class=" state.active==v.value?'ba2 i14':'white'" 
            v-for="(v, i) in state.actives" :key="i"
            @click.stop="state.active=v.value; changeActive()">{{v.name}}</span>
          </div>
        </span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 w50x3 flex-cc plr10 cursor i1 ml30">
            <el-date-picker class="ww100" v-model="state.datetimes" type="date" placeholder="请选择" @change="changeDate()" />
          </span>
          <!-- <span class="hh100 flex-cc plr10 cursor i1 ml30">
            <span>更多</span>
            <i-ep-arrowRightBold class="f12 ml2" />
          </span> -->
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="layout-row"  style="overflow:visible;">
      <b21 class="flex3 hh100 ptb20 pl20 ba1 relative" @init="init" v-model:query="state.query1" v-model:active="state.active" />
      <div class="flex1 hh100 ml5 i15 relative">
        <div class="absolute t5 r5 z1" v-if="!isNull(configStore.user) && configStore.user.id == '1'">
          <el-button size="small" type="info" @click.stop="handleClick('out')">模板</el-button>
          <el-button size="small" type="primary" @click.stop="handleClick('in')">导入</el-button>
          <el-button size="small" type="danger" @click.stop="handleClick('del')">清空</el-button>
        </div>
        <div class="layout-col hh100 ww100">
          <!-- 电量 -->
          <div class="ww100 hh50 flex-col-bc ba1">
            <div class="ww100 hh100 flex-col-cc plr20 ptb10">
              <div class="ww100 flex-bc">
                <span>用电量</span>
                <i-ep-present class="f20" />
              </div>
              <div class="ww100 flex-sc mt5">
                <span class="f24 i1 fw">{{ state.data&&state.data.latestUsePower?Math.floor(state.data.latestUsePower*100)/100:'0' }}</span>
                <span class="f12 ce mt5 ml5">(GWh)</span>
              </div>
            </div>
            <div class="ww100 flex-bc plr20 ptb10 ba1">
              <span>本月用电量</span>
              <div class="ww100 flex-ec flex1 tr">
                <span class="f24 white fw">{{ state.data&&state.data.monthUsePower?Math.floor(state.data.monthUsePower*100)/100:'0' }}</span>
                <span class="f12 ce mt5 ml5">(GWh)</span>
              </div>
            </div>
          </div>
          <!-- 电价 -->
          <div class="ww100 hh25 flex-col-bc ba1 mt5">
            <div class="ww100 hh100 flex-col-cc plr20 ptb10">
              <div class="ww100 flex-bc">
                <span>今日平均日前价格</span>
                <i-ep-coin class="f20" />
              </div>
              <div class="ww100 flex-sc mt5">
                <span class="f24 white fw">{{ state.data&&state.data.todaymeanPrevPrice?state.data.todaymeanPrevPrice:'0' }}</span>
                <span class="f12 ce mt5 ml5">(元/MWh)</span>
                <span class="f12 cc mt5 ml10">环比</span>
              </div>
            </div>
          </div>
          <!-- 电价 -->
          <div class="ww100 hh25 flex-col-bc ba1 mt5">
            <div class="ww100 hh100 flex-col-cc plr20 ptb10">
              <div class="ww100 flex-bc">
                <span>今日平均实时价格</span>
                <i-ep-coin class="f20" />
              </div>
              <div class="ww100 flex-sc mt5">
                <span class="f24 white fw">{{ state.data&&state.data.todaymeanPrice?state.data.todaymeanPrice:'0' }}</span>
                <span class="f12 ce mt5 ml5">(元/MWh)</span>
                <span class="f12 cc mt5 ml10">环比</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 导入 -->
    <ImportData @init="init" :state="state" ref="importRef"/>
  </div>
</template>

<script lang="ts" setup>
  import b21 from './b21'
  import api from '@/api'
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  let importRef = $ref()
  const state = reactive({
    ...publicStore.$state,
    actives: [
      {value: '1', name: '最新情况'},
      {value: '2', name: '本月情况'},
      {value: '3', name: '本年情况'},
    ],
    active: '1',
    datetime: {},
    datetimes: '',
    model: 't_medium_yide_sum',
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
    state.datetimes = `${state.datetime.year}-${state.datetime.month.toString().padStart(2, '0')}-${state.datetime.day.toString().padStart(2, '0')}`
    getYide()
    getSum()
  }

  const changeDate = () => {
    if (!state.datetime)  state.datetime = {}
    const date = new Date(state.datetimes)
    state.datetime = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()}
    getYide()
    getSum()
  }

  const changeActive = () => {
    if (!state.active)  state.active = '1'
    getYide()
    getSum()
  }

  const getYide = async() => {
    state.query1 = {model: `t_medium_yide${state.active}`, args: `trade_year='${state.datetime.year}' and trade_month='${state.datetime.month}' and trade_day='${state.datetime.day}'`}
    let res = await publicStore.http({Api: state.query1})
    if(!proxy.isNull(res)){
      const chart1 = [
        {type: 'bar', name: '用电量', key: 'powerNum', data: []}, 
        {type: 'line', name: '日前价格', key: 'currentPrice', data: []},
        {type: 'line', name: '实时价格', key: 'realTimePrice', data: []},
      ]
      const chart2 = [
        {type: 'bar', name: '用电量', key: 'powerNum', data: []}, 
        {type: 'line', name: '日前价格', key: 'currentPrice', data: []},
        {type: 'line', name: '实时价格', key: 'realTimePrice', data: []},
      ]
      const chart = state.active == '1'? chart1: chart2
      res.sort((a, b) =>new Date(a.datetime) - new Date(b.datetime)).forEach(v => {
        chart.forEach(vv => {
          const temp = [proxy.parseTime(v.datetime, '{h}:{i}'), vv.type=='bar'?Math.floor(v[vv.key]/10)/100:v[vv.key], v.datetime]
          vv.data.push(temp)
        })
      })
      publicStore._public.stockEnv1 = [...chart]
    } else {
      publicStore._public.stockEnv1 = []
      // await publicStore.rechart('Line_stockEnv1')
    }
  }

  const getSum = async() => {
    state.query = {model: "t_medium_yide_sum", args: `trade_year='${state.datetime.year}' and trade_month='${state.datetime.month}' and trade_day='${state.datetime.day}'`}
    let res = await publicStore.http({Api: state.query})
    state.data = proxy.isNull(res)? {} : res[0]
  }

  const handleClick = async(remark) => {
    if(remark == 'out'){
      let query = {model: 't_medium_yide_sum'}
      let res = await publicStore.http({Api: query})
      let list = [...res]
      let name = '现货市场行情-统计模板'
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'trade_day', name: '日'},
        {key: 'latestUsePower', name: '用电量'},
        {key: 'monthUsePower', name: '本月用电量'},
        {key: 'todaymeanPrevPrice', name: '今日平均日前价格'},
        {key: 'todaymeanPrice', name: '今日平均实时价格'},
      ]
      proxy.handleExport(content, list, name)
    } 
    if(remark == 'in'){
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'trade_day', name: '日'},
        {key: 'latestUsePower', name: '用电量'},
        {key: 'monthUsePower', name: '本月用电量'},
        {key: 'todaymeanPrevPrice', name: '今日平均日前价格'},
        {key: 'todaymeanPrice', name: '今日平均实时价格'},
      ]
      let ctx = {content: content, key: state.key, query: state.query, unique: ''}
      importRef.onVisable(ctx)
    }
    if(remark == 'del'){
      ElMessageBox.confirm('请确定已保存模板?', '删除提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'error'}).then(async() => {
        let query = {model: 't_medium_yide_sum'}
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
