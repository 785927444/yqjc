<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <div class="ww100 flex-sc bs9 h40 mb15">
      <div class="cursor hh100 ptb10 plr20" v-for="(v, i) in state.tabs" :key="i" @click.stop="state.tab = v.value; state.model = v.value == '1'? 't_test_task_execute' : v.value == '2'? 't_test_task_complete' : ''; init()"
      :class="state.tab == v.value?'white ba2':'i1'">{{ v.name }}</div>
      <div class="flex1 hh100 flex-ec" v-if="!isNull(route.query)">
        <img src="@/assets/imgs/uu1.png" />
        <span class="ml15 cc cursor" @click.stop="configStore.actIndex=route.query.model_id;toPath('/systest2')">返回</span>
        <span class="mlr10 cc">/</span>
        <span class="mr10 cursor">系统测试</span>
        <img src="@/assets/imgs/uu2.png" />
      </div>
    </div>
    <!-- 搜索 -->
    <div class="ww100 flex-bc plr15">
      <div class="flex-sc"></div>
      <div class="flex-ec cursor flex1">
        <div v-if="isNull(route.query)" class="ml15 mr10">用例</div>
        <div v-if="isNull(route.query)" class="flex w50x4">
          <el-select v-model="state.model_id" placeholder="请选择" style="width: 100%" clearable filterable>
            <el-option label="全部" value="" />
            <el-option v-for="(v, i) in state.childs" :key="v.id" :label="v.name" :value="v.id" />
          </el-select>
        </div>
        <div v-if="isNull(route.query)" class="ml15 mr10">类型</div>
        <div v-if="isNull(route.query)" class="flex w50x4">
          <el-select v-model="state.type" placeholder="请选择" style="width: 100%" clearable filterable>
            <el-option label="全部" value="" />
            <el-option v-for="(v, i) in types2" :key="v.value" :label="v.name" :value="v.value" />
          </el-select>
        </div>
        <div class="ml15 mr10">开始时间</div>
        <div class="flex w50x8">
          <el-date-picker v-model="state.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
        </div>
        <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1 ml15" @click.stop="state.page = 1; init()" :icon="Search">搜索</el-button>
        <!-- <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1" @click.stop="exports()" :icon="Filter">导出</el-button> -->
      </div>
    </div>
    <!-- 内容 -->
    <div class="layout-col p15">
      <div class="layout-col ba1">
        <div class="row bgi22">
          <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width"><span v-if="v.name">{{v.name}}</span></div>
        </div>
        <div class="table">
          <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click.stop="handleClick('active', item)">
            <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
              <span v-if="typeof(v.key) == 'object'" class="cursor mlr5" :class="kk=='add'?'none':kk=='del'?!isNull(configStore.user)?'i8':'none':'i21'" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
              <div v-else-if="v.key=='-'" class="w16 h16 rad2 m-auto cursor flex-cc" :class="item['click']?'bgi21 white':'bg-white'" @click.stop="handleClick('active', item)">
                <i-ep-select v-if="item['click']" class="f10" />
              </div>
              <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
              <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
              <span v-else-if="v.type == 'select'" :class="find(v.list, [v.value, item[v.key]], 'color')?find(v.list, [v.value, item[v.key]], 'color'):''">
                {{find(v.list, [v.value, item[v.key]], v.label)}}
              </span>
              <span v-else-if="v.type == 'range'" :class="findRange(v.value[0], [v.value[1], item[v.key]], 'color')?findRange(v.value[0], [v.value[1], item[v.key]], 'color'):''">
                {{findRange(v.value[0], [v.value[1], item[v.key]], v.value[2])}}
              </span>
              <span v-else-if="v.type == 'switch'">
                <el-switch v-model="item[v.key]" :active-text="v.value[1].name" :inactive-text="v.value[0].name" :active-value="v.value[1].value" :inactive-value="v.value[0].value" inline-prompt @change="handleClick('switch', item)"></el-switch>
              </span>
              <span v-else-if="v.type == 'input'"><el-input v-model="item[v.value]" placeholder="请输入" style="width: 150px;" size="small" /></span>
              <span v-else-if="v.key == 'phone'">{{isNull(item[v.key]) && v.key!=''? '/' : encryptPhone(item[v.key])}}</span>
              <span v-else-if="v.type == 'decrypt'">{{isNull(item[v.key]) && v.key!=''? '/' : decrypt(item[v.key])}}</span>
              <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
            </div>
          </div>
          <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
        <Pagination class="plr20" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
      </div>
      <!-- 底部 -->
      <aa-foot></aa-foot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Refresh, Search, Filter, Connection, Edit, Operation } from '@element-plus/icons-vue'
  import scheduled from "@/utils/scheduled"
import { toPath } from '@/utils/common'
  const { createScheduled } = scheduled()
  const route = useRoute()
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  let types2 = [
    {value: 'comm_1', type: 'comm', name: '通信协议一致性测试'},
    {value: 'comm_2', type: 'comm', name: '指令执行准确性测试'},
    {value: 'comm_3', type: 'comm', name: '控制终端削峰能力测试'},
    {value: 'comm_4', type: 'comm', name: '控制终端填谷能力测试'},
    {value: 'calc_1', type: 'calc', name: '策略与算法功能/准确性测试'},
    {value: 'calc_2', type: 'calc', name: '策略与算法抗干扰能力测试'},
    {value: 'enti_1', type: 'enti', name: '调峰调节性能测试（包括削峰和填谷)'},
    {value: 'enti_2', type: 'enti', name: 'APC调节性能测试'},
    {value: 'enti_3', type: 'enti', name: '分布式台区缓解重过载场景的虚拟电厂响应能力测试'},
    {value: 'enti_4', type: 'enti', name: '分布式台区日内需求响应场景的虚拟电厂响应能力测试'},
    {value: 'unit_1', type: 'unit', name: '充电桩连续调节能力测试'},
    {value: 'unit_2', type: 'unit', name: '充电桩非连续调节能力测试'},
    {value: 'unit_3', type: 'unit', name: '光伏连续调节能力测试'},
    {value: 'unit_4', type: 'unit', name: '光伏非连续调节能力测试'},
    {value: 'unit_5', type: 'unit', name: '储能连续调节能力测试'},
    {value: 'unit_6', type: 'unit', name: '储能非连续调节能力测试'},
    {value: 'unit_7', type: 'unit', name: '分体空调调节能力测试'},
    {value: 'unit_8', type: 'unit', name: '中央空调系统半实物仿真调控装置能力测试'},
  ]
  const state = reactive({
    ...publicStore.$state,
    content: [
      { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x8', show: true, align: 'left',  key: 'name', name: '名称' },
      { width: 'w50x5', show: true, align: 'left',  key: 'parent_id', name: '所属', type: 'select', list: [], value: 'id', label: 'name' },
      { width: 'w50x5', show: true, align: 'left', key: 'type', name: '类型', type: 'select', list: types2, value: 'value', label: 'name' },
      { width: 'w50x5', show: true, align: 'left',  key: 'start_time', name: '开始时间', type: 'time' },
      { width: 'w50x5', show: true, align: 'left',  key: 'end_time', name: '结束时间', type: 'time' },
      { width: 'w50x5', show: true, align: 'left',  key: 'user_name', name: '操作人员', type: 'decrypt' },
      { width: 'flex1', show: true, align: 'right', key: {view: '详情'},  name: '操作' },
    ],
    tabs: [
      {name: '正在执行', value: '1'},
      {name: '执行结束', value: '2'},
    ],
    tab: '1',
    model: '',
    model_id: '',
    type: '',
  })
 
  onMounted(async() => {
    if(!proxy.isNull(route.query)){
      if(route.query.model_id) state.model_id = route.query.model_id
      if(route.query.tab) state.tab = route.query.tab
    }
    await getInit()
    init()
    createScheduled("systestlog2", 5 * 1000, () => { init() })
  })

  const getInit = async () => {
    state.model = state.tab == '1'? 't_test_task_execute' : state.tab == '2'? 't_test_task_complete' : ''
    state.content[state.content.length-1]['key'] = state.tab == '1'? {view: '详情', del: '删除'} : state.tab == '2'? {view: '详情', del: '删除'} : {view: '详情'}
    let query = {model: 't_test_task'}
    let res = await publicStore.http({Api: query})
    state.childs = proxy.isNull(res)? [] : res.filter(a=>a.parent_id!='0')
    state.parents = proxy.isNull(res)? [] : res.filter(a=>a.parent_id=='0')
    state.content.forEach(v => {
      if(v.key == 'parent_id') v.list = state.parents
    })
  }

  const init = async () => {
    let args = ``
    if(state.model_id) args += `model_id='${state.model_id}' and `
    if(state.type) args += `type='${state.type}' and `
    if(!proxy.isNull(state.datetime)){
      let start = Date.parse(state.datetime[0]) + ''
      let end = Date.parse(state.datetime[1]) + ''
      args += `start_time>='${start}' and start_time<='${end}' and `
    }
    let q1 = {limit: state.limit, page: state.page}
    let q2 = {field: `COUNT(*)`}
    let qs = args? {model: state.model, args: args.slice(0, -4), order: 'start_time desc'} : {model: state.model, order: 'start_time desc'}
    let query1 = {}
    let query2 = {}
    Object.assign(query1, qs, q1)
    Object.assign(query2, qs, q2)
    state.parmas = {Api1: query1, Api2: query2}
    let res = await publicStore.http(state.parmas)
    state.empty = proxy.isNull(res.Api1)? true : false
    state.list = proxy.isNull(res.Api1)? [] : res.Api1
    state.total = proxy.isNull(res.Api2)? 0 : res.Api2[0]['COUNT(*)']
  }

  const handleClick = async(remark, val) => {
    if(remark == 'view'){
      proxy.toPath('/systestdetail2', {type: val.type, user_id: val.user_id, start_time: val.start_time})
    }
    if(remark == 'del'){
      ElMessageBox.confirm('是否确定删除?', '删除提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'error'}).then(async() => {
        let res = await proxy.handleApi(remark, val, state.model)
        init()
        if(res.code == 200){
          ElNotification({ title: '提示', message: '操作成功', type: 'success' })
        }else{
          ElNotification({ title: '提示', message: '操作失败1', type: 'error' })
        }
      })
    }
  }

  const exports = async() => {
    let query = Object.assign({}, state.parmas.Api1)
    delete query.limit
    delete query.page
    let tempData = await publicStore.http({Api: query})
    import('@/utils/Export2Excel').then(async excel => {
      const tHeader   = []
      const filterVal = []
      state.content.forEach(item => {
        if(item.show && item.key != '-' && item.key != '*' && typeof(item.key) != 'object'){
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

</style>
  