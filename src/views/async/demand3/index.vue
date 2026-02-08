<template>
  <div class="layout-col">
   <!-- 面包屑 -->
   <div class="ww100 flex-sc ba9 h40 mb15">
      <div class="cursor hh100 ptb10 plr20 i21" @click="toPath('/demand')">响应总览</div>
	  <div class="cursor hh100 ptb10 plr20 i21" @click="toPath('/demand2')">邀约下发</div>
	  <div class="cursor hh100 ptb10 plr20 ba10" @click="toPath('/demand3')">客户管理</div>
	  <div class="flex1 hh100 flex-ec">
	  <img src="@/assets/imgs/uu1.png" />
	  <span class="ml5 cc">需求侧响应</span>
	  <span class="mlr10 cc">/</span>
	  <span class="mr5">客户管理</span>
	  <img src="@/assets/imgs/uu2.png" />
	  </div>
  </div>
    <!-- 搜索 -->
    <div class="ww100 flex-bc plr15">
      <div class="flex-sc">
        <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1" @click.stop="handleClick('selectAll')" :icon="Plus">新增</el-button>
      </div>
      <div class="flex-ec cursor flex1">
        <div class="ml15 mr10">用户名称</div>
        <div class="flex w50x4">
          <el-input v-model="state.user_name" placeholder="请输入" style="width: 100%" clearable filterable />
        </div>
        <div class="ml15 mr10">所属聚合商</div>
        <div class="flex w50x2">
          <el-select v-model="state.agg" placeholder="请选择" style="width: 100%" clearable filterable>
            <el-option label="全部" value="" />
            <el-option v-for="(v, i) in aggs" :key="v.value" :label="v.name" :value="v.value" />
          </el-select>
        </div>
        <div class="ml15 mr10">邀约类型</div>
        <div class="flex w50x2">
          <el-select v-model="state.invi_type" placeholder="请选择" style="width: 100%" clearable filterable>
            <el-option label="全部" value="" />
            <el-option v-for="(v, i) in invi_types" :key="v.value" :label="v.name" :value="v.value" />
          </el-select>
        </div>
        <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1 ml15" @click.stop="state.page = 1; init()" :icon="Search">搜索</el-button>
      </div>
    </div>
    <!-- 内容 -->
    <div class="layout-col p15">
      <div class="layout-col bss">
        <div class="row bgi22">
          <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
        </div>
        <div class="table">
          <div class="row" :class="publicStore.active[state.key] == item[state.key] || item['click']?'active':index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click="handleClick('active', item)">
            <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
              <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'?'none':kk=='deal'&&item['clear_type']!=0?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
              <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
              <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
              <span v-else-if="v.type == 'find'" :class="find(v.value[0], [v.value[1], item[v.key]], 'color')?find(v.value[0], [v.value[1], item[v.key]], 'color'):''">
                {{find(v.value[0], [v.value[1], item[v.key]], v.value[2])}}
              </span>
              <span v-else-if="v.type == 'range'" :class="findRange(v.value[0], [v.value[1], item[v.key]], 'color')?findRange(v.value[0], [v.value[1], item[v.key]], 'color'):''">
                {{findRange(v.value[0], [v.value[1], item[v.key]], v.value[2])}}
              </span>
              <span v-else-if="v.type == 'switch'">
                <el-switch v-model="item[v.key]" :active-text="v.value[1].name" :inactive-text="v.value[0].name" :active-value="v.value[1].value" :inactive-value="v.value[0].value" inline-prompt @change="handleClick('switch', item)"></el-switch>
              </span>
              <span v-else-if="v.type == 'input'"><el-input v-model="item[v.value]" placeholder="请输入" style="width: 150px;" size="small" /></span>
              <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
            </div>
          </div>
          <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
        <Pagination class="plr20" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
        <Deal @init="init" title="告警处理" ref="exposeRef" />
        <Alarm @init="init" title="告警分析" ref="alarmRef" />
        <!-- <AlarmView ref="alarmViewRef" /> -->
       </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Plus, Refresh, Search, Filter, Connection, Edit, Operation } from '@element-plus/icons-vue'
  const route = useRoute()
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  let aggs = $ref([
    {value: '0', name: 'xxx1', color: 'i21'},
    {value: '1', name: 'xxx2', color: 'i8'},
    {value: '2', name: 'xxx3', color: 'ca'},
  ])
  let invi_types = $ref([
    {value: '0', name: '填谷', color: 'i21'},
    {value: '1', name: '填谷', color: 'i8'},
    {value: '2', name: '填谷', color: 'ca'},
  ])
  const state = reactive({
	  ...publicStore.$state,
    key: 'id',
    query: {"o": "o_sensor_alarm_log"},
    content: [
      { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x3', show: true, align: 'left',  key: 'user', name: '账号' },
      { width: 'w50x3', show: true, align: 'left',  key: 'user_name', name: '用户名称' },
      { width: 'w50x3', show: true, align: 'left',  key: 'number', name: '电表号' },
      { width: 'w50x3', show: true, align: 'left',  key: 'agg', name: '所属聚合商', type: 'find', value: [aggs, 'value', 'name'] },
      { width: 'w50x3', show: true, align: 'left',  key: 'unit', name: '供电单位' },
      { width: 'w50x3', show: true, align: 'left',  key: 'area', name: '所属地区' },
      { width: 'w50x3', show: true, align: 'left',  key: 'cap', name: '额定容量（kw）' },
      { width: 'w50x3', show: true, align: 'left',  key: 'line', name: '配网线路' },
      { width: 'w50x3', show: true, align: 'left',  key: 'address_name', name: '联系人姓名' },
      { width: 'w50x3', show: true, align: 'left',  key: 'address_phone', name: '联系人电话' },
      { width: 'w50x3', show: true, align: 'left',  key: 'address', name: '地址' },
      { width: 'flex1', show: true, align: 'right', key: {edit: '编辑', del: '删除'},  name: '操作' },
    ],
    user_name: '',
    type: '',
    clickArr: [],
    list: [
      {id: '1', user: '666', user_name: '用户1##', number: '23525315', agg: '0', unit: 'xxx', area: '地区1##', cap: '10', line: '线路1', address_name: 'xxx', address_phone: '1358888888', address: 'xxxxxx'},
      {id: '2', user: '888', user_name: '用户2##', number: '23525315', agg: '0', unit: 'xxx', area: '地区2##', cap: '10', line: '线路2', address_name: 'xxx', address_phone: '1358888888', address: 'xxxxxx'},
    ]
  })
  let exposeRef = $ref()
  let alarmRef = $ref()
  let alarmViewRef = $ref()
 
  onMounted(async() => {
    state.form = route.query
    // await getInit()
    // await init()
  })

  const getInit = async () => {
    let query =  {"o": "o_sensor", "p": [publicStore.distributId], "i": 0}
    let params = {queryApi: query}
    let res = await publicStore.post(params)
    state.deviceList = proxy.isNull(res)? [] : res.filter(a=>a.class == 3)
    state.sensorList = proxy.isNull(res)? [] : res.filter(a=>a.class == 0)
  }

  const init = async () => {
    getQuery()
    state.params = {queryApi: Object.assign({s: (state.page -1)*state.limit, n: state.limit}, state.query), queryApiCount: state.query}
    let res = await publicStore.post(state.params)
    state.list = proxy.isNull(res.queryApi)? [] : res.queryApi
    state.list.forEach(v => {
      let sersor = state.sensorList.find(a=>a.id == v.sensor_id)
      if(sersor){
        let device = state.deviceList.find(a=>a.id == sersor.parent_id)
        if(device){
          v.device_name = device.name
        }
      }
    })
    state.empty = proxy.isNull(res.queryApi)? true : false
    state.total = proxy.isNull(res.queryApiCount)? 0 : parseInt(res.queryApiCount[0].count)
  }

    // 检索条件
  const getQuery  = () => {
    if(state.form.type){
      console.log('类型告警-------')
      if(!state.sensor_id && proxy.isNull(state.datetime)){
        state.query.p = [publicStore.distributId, state.form.type]
        state.query.i = 16
      }
      // 检索设备
      if(state.sensor_id && proxy.isNull(state.datetime)){
        state.query.p = [publicStore.distributId, state.sensor_id]
        state.query.i = 8
      }
      // 检索时间段
      if(!state.sensor_id && !proxy.isNull(state.datetime)){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [publicStore.distributId, state.form.type, start, end]
        state.query.i = 17
      }
      // 传感器 + 时间段
      if(state.sensor_id && !proxy.isNull(state.datetime)){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.sensor_id, start, end]
        state.query.i = 10
      }
    }else{
      console.log('站告警-------', state.clear_type, state.device_id, state.sensor_id, state.datetime, state.alarm_level)
      // 检索全部
      if(!state.clear_type && !state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && !state.alarm_level){
        state.query.p = [publicStore.distributId]
        state.query.i = 0
      }
      // 检索时间段
      if(!state.clear_type && !state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && !state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [publicStore.distributId, start, end]
        state.query.i = 9
      }
      // 检索传感器
      if(!state.clear_type && state.sensor_id && proxy.isNull(state.datetime) && !state.alarm_level){
        state.query.p = [publicStore.distributId, state.sensor_id]
        state.query.i = 8
      }
      // 检索状态
      if(state.clear_type && !state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && !state.alarm_level){
        state.query.p = [publicStore.distributId, state.clear_type]
        state.query.i = 31
      }
      // 检索设备
      if(!state.clear_type && state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && !state.alarm_level){
        state.query.p = [state.device_id]
        state.query.i = 71
      }
      // 检索报警级别
      if(!state.clear_type && !state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && state.alarm_level){
        state.query.p = [publicStore.distributId, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 76
      }
      // 传感器 + 报警级别
      if(!state.clear_type && state.sensor_id && proxy.isNull(state.datetime) && state.alarm_level){
        state.query.p = [state.sensor_id, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 77
      }
      // 设备 + 报警级别
      if(!state.clear_type && state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && state.alarm_level){
        state.query.p = [state.device_id, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 78
      }
      // 状态 + 报警级别
      if(state.clear_type && !state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && state.alarm_level){
        state.query.p = [publicStore.distributId, state.clear_type, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 79
      }
      // 时间段 + 报警级别
      if(!state.clear_type && !state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [publicStore.distributId, start, end, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 80
      }
      // 传感器 + 时间段
      if(!state.clear_type && state.sensor_id && !proxy.isNull(state.datetime) && !state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.sensor_id, start, end]
        state.query.i = 10
      }
      // 状态 + 时间段
      if(state.clear_type && !state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && !state.alarm_level){
        let start = Date.parse(state.params.date_time[0]) + ''
        let end = Date.parse(state.params.date_time[1]) + ''
        state.query.p = [publicStore.distributId, start, end, state.clear_type]
        state.query.i = 33
      }
      // 状态 + 传感器
      if(state.clear_type && state.sensor_id && proxy.isNull(state.datetime) && !state.alarm_level){
        state.query.p = [publicStore.distributId, state.sensor_id, state.clear_type]
        state.query.i = 32
      }
      // 设备 + 时间段
      if(!state.clear_type && state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && !state.alarm_level){
        state.query.p = [state.device_id, start, end]
        state.query.i = 72
      }
      // 设备 + 状态
      if(state.clear_type && state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && !state.alarm_level){
        state.query.p = [state.device_id, state.clear_type]
        state.query.i = 70
      }
      // 状态 + 时间段 + 报警级别
      if(state.clear_type && !state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [publicStore.distributId, state.clear_type, start, end, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 81
      }
      // 传感器 + 时间段 + 报警级别
      if(!state.clear_type && state.sensor_id && !proxy.isNull(state.datetime) && state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.sensor_id, start, end, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 82
      }
      // 传感器 + 状态 + 报警级别
      if(state.clear_type && state.sensor_id && proxy.isNull(state.datetime) && state.alarm_level){
        state.query.p = [state.sensor_id, state.clear_type, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 83
      }
      // 设备 + 时间段 + 报警级别
      if(!state.clear_type && state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.device_id, start, end, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 84
      }
      // 设备 + 状态 + 报警级别
      if(state.clear_type && state.device_id && !state.sensor_id && proxy.isNull(state.datetime) && state.alarm_level){
        state.query.p = [state.device_id, state.clear_type, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 85
      }
      // 设备 + 状态 + 时间段
      if(state.clear_type && state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && !state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.device_id, start, end, state.clear_type]
        state.query.i = 66
      }
      // 传感器 + 状态 + 时间段
      if(state.clear_type && state.sensor_id && !proxy.isNull(state.datetime) && !state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.sensor_id, start, end, state.clear_type]
        state.query.i = 34
      }
      // 设备 + 状态 + 时间段 + 报警级别
      if(state.clear_type && state.device_id && !state.sensor_id && !proxy.isNull(state.datetime) && state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.device_id, state.clear_type, start, end, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 86
      }
      // 传感器 + 状态 + 时间段 + 报警级别
      if(state.clear_type && state.sensor_id && !proxy.isNull(state.datetime) && state.alarm_level){
        let start = Date.parse(state.datetime[0]) + ''
        let end = Date.parse(state.datetime[1]) + ''
        state.query.p = [state.sensor_id, state.clear_type, start, end, state.alarm_level[0]+'', state.alarm_level[1]+'']
        state.query.i = 87
      }
    }
  }

  const handleClick = (remark, val) => {
    if(remark == 'deal'){
      exposeRef.onVisable(val)
    }
    if(remark == 'deals'){
      if (state.clickArr.length == 0) return  ElNotification({ title: '提示', message: '至少选中一条', type: 'error' })
      exposeRef.onVisable(state.clickArr)
    }
    if(remark == 'viewdata'){
      alarmRef.onVisable(val)
    }
    if(remark == 'active'){
      let clickIndex = state.clickArr.findIndex(a=>a[state.key] == val[state.key])
      if(clickIndex != -1){
        val.click = false
        state.clickArr.splice(clickIndex, 1)
      }else{
        if(val.clear_type == '0'){
          val.click = true
          state.clickArr.push(val)
        }
      }
    }
    if(remark == 'selectAll'){
      let clickIndex = state.list.findIndex(a=>{ return a['click'] })
      if(clickIndex == -1){
        state.list.forEach(item => {
          if(item.clear_type == '0') {
            item.click = true
            state.clickArr.push(item)
          }
        })
      }else{
        state.clickArr = []
        state.list.forEach(item => {delete item['click']})
      }
    }
    if(remark == 'view'){
      alarmViewRef.onVisable(val)
    }
  }

  const exports = async() => {
    let query = Object.assign({}, state.query)
    delete query.s
    delete query.n
    let params = {queryApi: query}
    let tempData = await publicStore.post(params)
    import('@/utils/Export2Excel').then(async excel => {
      const tHeader   = []
      const filterVal = []
      state.content.forEach(item => {
        if(item.show && item.key != '*' && typeof(item.key) != 'object'){
          tHeader.push(item.name)
          filterVal.push(item.key)
        }
      })
      const data = formatJsons(filterVal, tempData)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: proxy.parseTime(new Date()) + '导出'
      })
    })
  }

  const formatJsons = (filterVal, data) => {
    let list = data? data : state.list
    return list.map(v => filterVal.map(j => {
      if(j=="alarm_time" || j=="clear_time"){
        return v[j]&&v[j]!='0'? proxy.parseTime(v[j]) : ''
      }else if(j=="clear_type"){
        return proxy.find(logType, ['value', v[j]], 'name')
      }else{
        return v[j]
      }
    }))
  }


</script>
  
<style scoped lang="scss">
:deep(.el-input__wrapper){
	color: #ffffff ;
	background: rgba(17, 8, 73, 0.3);
	box-shadow: 0 0 0 1px #2663AA inset;
	border-radius: 5px;
	width: 100%;
  box-sizing: border-box;
	-moz-box-sizing: border-box;
}
:deep(.el-input__inner){
	color: #ffffff ;
}
</style>
  