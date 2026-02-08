<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title3.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="flex-sc flex3 hh100">
          <span class="fw">中长期市场行情</span>
          <div class="flex-ec flex1 hh100 pr20">
            <span class="hh100 flex-cc plr10 cursor" 
            :class=" state.active==v.value?'ba2 i14':'white'" 
            v-for="(v, i) in state.actives" :key="i"
            @click.stop="state.active=v.value; changeActive()">{{v.name}}</span>
          </div>
        </span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 w50x3 flex-cc plr10 cursor i1 ml30">
            <el-date-picker class="ww100" v-model="state.datetimes" type="month" placeholder="请选择" @change="changeDate()" />
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
      <t21 class="flex3 hh100 ptb20 pl20 ba1 relative" @init="init" v-model:query="state.query1" />
      <div class="flex1 hh100 ptb20 pl20 ba1 ml5 i15 relative">
        <div class="absolute t5 r5 z1" v-if="!isNull(configStore.user) && configStore.user.id == '1'">
          <el-button size="small" type="info" @click.stop="handleClick('out')">模板</el-button>
          <el-button size="small" type="primary" @click.stop="handleClick('in')">导入</el-button>
          <el-button size="small" type="danger" @click.stop="handleClick('del')">清空</el-button>
        </div>
        <!-- 年度 -->
        <div class="layout-col hh100 ww100"  v-if=" state.active=='1'">
          <div class="ww100 hh25 flex-sc">
            <i-ep-school class="f40" />
            <div class="flex-col ww100 ml20">
              <span>年度累计交易电量</span>
              <span class="mt5">
                <span class="f24 white fw">{{ state.data&&state.data.annual_cum_trade_elec?state.data.annual_cum_trade_elec:'0' }}</span>
                <span class="f12 ce ml5">(GWh)</span>
              </span>
            </div>
          </div>
          <div class="ww100 hh25 flex-sc">
            <i-ep-officeBuilding class="f40" />
            <div class="flex-col ww100 ml20">
              <span>年度交易均价</span>
              <span class="mt5">
                <span class="f24 white fw">{{ state.data&&state.data.annual_avg_trade_price?state.data.annual_avg_trade_price:'0' }}</span>
                <span class="f12 ce ml5">(元/MWh)</span>
              </span>
            </div>
          </div>
        </div>
        <!-- 月度 -->
        <div class="hh100 ww100"  v-if=" state.active=='2'">
          <div class="ww100 hh25 flex-sc">
            <i-ep-school class="f40" />
            <div class="flex-col ww100 ml20">
              <span>本月累计交易电量</span>
              <span class="mt5">
                <span class="f24 white fw">{{ state.data&&state.data.month_cum_trade_elec?state.data.month_cum_trade_elec:'0' }}</span>
                <span class="f12 ce ml5">(GWh)</span>
              </span>
            </div>
          </div>
          <div class="ww100 hh25 flex-sc">
            <i-ep-officeBuilding class="f40" />
            <div class="flex-col ww100 ml20">
              <span>月度交易均价</span>
              <span class="mt5">
                <span class="f24 white fw">{{ state.data&&state.data.month_avg_trade_price?state.data.month_avg_trade_price:'0' }}</span>
                <span class="f12 ce ml5">(元/MWh)</span>
              </span>
            </div>
          </div>
          <div class="ww100 hh25 flex-sc">
            <i-ep-present class="f40" />
            <div class="flex-col ww100 ml20">
              <span>月度集中交易电量</span>
              <span class="mt5">
                <span class="f24 white fw">{{ state.data&&state.data.month_central_trade_elec?state.data.month_central_trade_elec:'0' }}</span>
                <span class="f12 ce ml5">(GWh)</span>
              </span>
            </div>
          </div>
          <div class="ww100 hh25 flex-sc">
            <i-ep-pictureRounded class="f40" />
            <div class="flex-col ww100 ml20">
              <span>月度集中交易均价</span>
              <span class="mt5">
                <span class="f24 white fw">{{ state.data&&state.data.month_avg_central_trade_price?state.data.month_avg_central_trade_price:'0' }}</span>
                <span class="f12 ce ml5">(元/MWh)</span>
              </span>
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
  import t21 from './t21'
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
      {value: '1', name: '年度情况'},
      {value: '2', name: '月度情况'},
    ],
    active: '1',
    datetime: {},
    datetimes: '',
    model: 't_medium_wide_sum'
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
    state.datetimes = `${state.datetime.year}-${state.datetime.month.toString().padStart(2, '0')}`
    getWide()
    getSum()
  }

  const changeDate = () => {
    if (!state.datetime)  state.datetime = {}
    const date = new Date(state.datetimes)
    state.datetime = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()}
    getWide()
    getSum()
  }

  const changeActive = () => {
    if (!state.active)  state.active = '1'
    getWide()
    getSum()
  }

  const getWide = async() => {
    state.query1 = {model: "t_medium_wide", args: `trade_year='${state.datetime.year}'`}
    let res = await publicStore.http({Api: state.query1})
    if(!proxy.isNull(res)){
      const chart1 = [
        {type: 'bar', name: '年度双边协商交易电量', key: 'annual_bilateral_energy', data: []}, 
        {type: 'bar', name: '年度挂牌交易电量', key: 'annual_listed_energy', data: []},
        {type: 'bar', name: '年度集中交易电量', key: 'annual_concentrated_energy', data: []},
        {type: 'line', name: '年度双边协商交易均价', key: 'annual_bilateral_price', data: []}, 
        {type: 'line', name: '年度挂牌交易均价', key: 'annual_listed_price', data: []},
        {type: 'line', name: '年度集中交易均价', key: 'annual_concentrated_price', data: []},
      ]
      const chart2 = [
        {type: 'bar', name: '月度双边协商交易电量', key: 'monthly_bilateral_energy', data: []}, 
        {type: 'bar', name: '月度集中交易(市场用户负荷曲线)电量', key: 'monthly_load_curve_energy', data: []},
        {type: 'bar', name: '月度分时集中交易电量', key: 'monthly_time_sharing_energy', data: []},
        {type: 'line', name: '月度双边协商交易均价', key: 'monthly_bilateral_price', data: []}, 
        {type: 'line', name: '月度集中交易(市场用户负荷曲线)均价', key: 'monthly_load_curve_price', data: []},
        {type: 'line', name: '月度分时集中交易均价', key: 'monthly_time_sharing_price', data: []},
      ]
      const chart = state.active == '1'? chart1: chart2
      res.sort((a, b) =>a.trade_month - b.trade_month).forEach(v => {
        chart.forEach(vv => {
          const temp = [`${v.trade_month}月`, v[vv.key]]
          vv.data.push(temp)
        })
      })
      publicStore._public.responsesEnv1 = [...chart]
    }else {
      publicStore._public.responsesEnv1 = []
      // await publicStore.rechart('Line_responsesEnv1')
    }
  }

  const getSum = async() => {
    state.query = {model: "t_medium_wide_sum", args: `trade_year='${state.datetime.year}' and trade_month='${state.datetime.month}'`}
    let res = await publicStore.http({Api: state.query})
    state.data = proxy.isNull(res)? {} : res[0]
  }

  const handleClick = async(remark) => {
    if(remark == 'out'){
      let query = {model: 't_medium_wide_sum'}
      let res = await publicStore.http({Api: query})
      let list = [...res]
      let name = '中长期市场行情-统计模板'
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'annual_cum_trade_elec', name: '年度累计交易电量'},
        {key: 'annual_avg_trade_price', name: '年度交易均价'},
        {key: 'month_cum_trade_elec', name: '本月累计交易电量'},
        {key: 'month_avg_trade_price', name: '月度交易均价'},
        {key: 'month_central_trade_elec', name: '月度集中交易电量'},
        {key: 'month_avg_central_trade_price', name: '月度集中交易均价'},
        {key: 'monthly_bilateral_energy', name: '月度双边协商交易电量'},
      ]
      proxy.handleExport(content, list, name)
    } 
    if(remark == 'in'){
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'annual_cum_trade_elec', name: '年度累计交易电量'},
        {key: 'annual_avg_trade_price', name: '年度交易均价'},
        {key: 'month_cum_trade_elec', name: '本月累计交易电量'},
        {key: 'month_avg_trade_price', name: '月度交易均价'},
        {key: 'month_central_trade_elec', name: '月度集中交易电量'},
        {key: 'month_avg_central_trade_price', name: '月度集中交易均价'},
        {key: 'monthly_bilateral_energy', name: '月度双边协商交易电量'},
      ]
      let ctx = {content: content, key: state.key, query: state.query, unique: ''}
      importRef.onVisable(ctx)
    }
    if(remark == 'del'){
      ElMessageBox.confirm('请确定已保存模板?', '删除提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'error'}).then(async() => {
        let query = {model: 't_medium_wide_sum'}
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
