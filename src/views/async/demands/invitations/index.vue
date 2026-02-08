<template>
  <div class="layout-col">
    <!-- 搜索 -->
    <div class="ww100 flex-bc pr15 pl10 mt5">
      <div class="flex-sc">
        <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1" @click.stop="handleClick('add')" :icon="Plus">发布项目</el-button>
      </div>
      <div class="flex-ec cursor flex1">
        <div class="ml15 mr10">邀约类型</div>
        <div class="flex w50x2">
          <el-select v-model="state.invi_type" placeholder="请选择" style="width: 100%" clearable filterable>
            <el-option label="全部" value="-1" />
            <el-option v-for="(v, i) in invi_types" :key="v.value" :label="v.name" :value="v.value" />
          </el-select>
        </div>
        <div class="ml15 mr10">时间类型</div>
        <div class="flex w50x2">
          <el-select v-model="state.time_type" placeholder="请选择" style="width: 100%" clearable filterable>
            <el-option label="全部" value="-1" />
            <el-option v-for="(v, i) in time_types" :key="v.value" :label="v.name" :value="v.value" />
          </el-select>
        </div>
        <div class="ml15 mr10">项目名称</div>
        <div class="flex w50x4">
          <el-input v-model="state.name" placeholder="请输入" style="width: 100%" clearable filterable />
        </div>
        <div class="ml15 mr10">响应时段</div>
        <div class="flex w50x8">
          <el-date-picker v-model="state.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
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
              <span v-if="typeof(v.key) == 'object'"  
              :class="(kk=='del'||kk=='upd')&&(item['status']!='0'&&item['status']!='1'&&item['status']!='2'&&item['status']!='3')?'none':(kk=='make')&&(item['status']!='2'&&item['status']!='3')?'none':''" 
              class="i21 cursor mlr5" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">
                {{ kk=='res'&&item['status']=='0'? '邀约' : vv }}
              </span>
              <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
              <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'':parseTime(item[v.key])}}</span>
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
              <span v-else>{{isNull(item[v.key]) && v.key!=''? '' : item[v.key]}}</span>
            </div>
          </div>
          <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
        <Pagination class="plr20" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
        <Add @init="init" :state="state" ref="addRef" />
       </div>
    </div>
    <!-- 待邀约 -->
    <invit @init="init" ref="invitRef" />
    <!-- 待确认 -->
    <confirm @init="init" ref="confirmRef" />
    <!-- 待执行 -->
    <execute @init="init" ref="executeRef" />
    <!-- 执行中 -->
    <execute2 @init="init" ref="execute2Ref" /> 
  </div>
</template>

<script lang="ts" setup>
  import invit from "./invit"
  import confirm from "./confirm"
  import execute from "./execute"
  import execute2 from "./execute2"
  import { Plus, Refresh, Search, Filter, Connection, Edit, Operation } from '@element-plus/icons-vue'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const invi_types = [
    {value: '0', name: '填谷', color: 'i15'},
    {value: '1', name: '填谷', color: 'i15'},
  ]
  const time_types = [
    {value: '0', name: '约时', color: 'i15'},
    {value: '1', name: '约时', color: 'i15'},
  ]
  const statuss = [
    {value: '0', name: '待邀约', color: 'i6'},
    {value: '1', name: '待确认', color: 'i6'},
    {value: '2', name: '待执行', color: 'i6'},
    {value: '3', name: '正在执行', color: 'i12'},
    {value: '4', name: '执行完成', color: 'i15'},
  ]
  const state = reactive({
	  ...publicStore.$state,
    content: [
      { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x4', show: true, align: 'left',  key: 'name', name: '项目名称' },
      { width: 'w50x3', show: true, align: 'left',  key: 'invi_type', name: '邀约类型', type: 'select', list: invi_types, value: 'value', label: 'name' },     
      { width: 'w50x3', show: true, align: 'left',  key: 'time_type', name: '时间类型', type: 'select', list: time_types, value: 'value', label: 'name' },
      { width: 'w50x3', show: true, align: 'left',  key: 'capacity', name: '需求容量（kW）' },
      { width: 'w50x3', show: true, align: 'left',  key: 'area', name: '需求地区' },
      { width: 'w50x4', show: true, align: 'left',  key: 'start_time', name: '响应开始', type: 'time' },
      { width: 'w50x4', show: true, align: 'left',  key: 'end_time', name: '响应结束', type: 'time' },
      { width: 'w50x2', show: true, align: 'left',  key: 'deal_price', name: '出清价格' },
      { width: 'w50x4', show: true, align: 'left',  key: 'deal_time', name: '出清时间', type: 'time' },
      { width: 'w50x2', show: true, align: 'left',  key: 'status', name: '状态',  type: 'select', list: statuss, value: 'value', label: 'name' },
      { width: 'flex1', show: true, align: 'right', key: {make: '执行', res: '查看', upd:'编辑', del: '删除'},  name: '操作' },
    ],
    editFrom: [
      { required: true, editshow: true, name: '项目名称', key: 'name', type: ['input'] },
      { required: true, editshow: true, name: '邀约类型', key: 'invi_type', type: 'select', list: invi_types, value: 'value', label: 'name' },
      { required: true, editshow: true, name: '时间类型', key: 'time_type', type: 'select', list: time_types, value: 'value', label: 'name' },
      { required: true, editshow: true, name: '需求容量', key: 'capacity', type: ['input'] },
      // { required: true, editshow: true, name: '出清价格', key: 'deal_price', type: ['input'] },
      { required: true, editshow: true, name: '需求地区', key: 'area', type: ['input'] },
      { required: true, editshow: true, name: '响应开始', key: 'start_time', type: ['time'] },
      { required: true, editshow: true, name: '响应结束', key: 'end_time', type: ['time'] },
    ],
    name: '',
    invi_type: '-1',
    time_type: '-1',
    datetime: '',
    addItem: {status: '0'},
    model: 't_invit_task',
  })
  let addRef = $ref()
  let invitRef = $ref()
  let confirmRef = $ref()
  let executeRef = $ref()
  let execute2Ref = $ref()

	onMounted(async() => {
    state.date = new Date().getTime()
    setTimeout(() => {
	    init()
    }, 100);
	  createScheduled('invit', 10*1000, () => { init() })
	})

	const init = async() => {
    let args = ''
    if(state.name) args += `name LIKE '%${state.name}%' and `
    if(state.invi_type&&state.invi_type!=-1) args += `invi_type='${state.invi_type}' and `
    if(state.time_type&&state.invi_type!=-1) args += `time_type='${state.time_type}' and `
    if(!proxy.isNull(state.datetime)){
      let start = Date.parse(state.datetime[0]) + ''
      let end = Date.parse(state.datetime[1]) + ''
      args += `start_time>='${start}' and end_time<='${end}' and `
    }
    let q1 = {limit: state.limit, page: state.page}
    let q2 = {field: `COUNT(*)`}
    let qs = args? {model: state.model, order: 'id desc', args: args.slice(0, -4)} : {model: state.model, order: 'id desc'}
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

  const handleClick = (remark, val) => {
    if(remark == 'add' || remark == 'upd'){
      addRef.onVisable(val)
    }
    if(remark == 'child'){
      let vall = proxy.varObj(state.parent, val[state.key])
      addRef.onVisable(vall)
    }
    if(remark == 'del'){
      addRef.del(val)
    }
    if(remark == 'res'){
      if(val.status == '0') {
        invitRef.onVisable(val, statuss, invi_types, time_types)
      }
      if(val.status == '1' || val.status == '2') {
        confirmRef.onVisable(val, statuss, invi_types, time_types)
      }
    }
    if(remark == 'make'){
      if(val.status == '2') {
        executeRef.onVisable(val, statuss, invi_types, time_types)
      }
      if(val.status == '3') {
        execute2Ref.onVisable(val, statuss, invi_types, time_types)
      }
    }
  }
</script>

<style lang="scss">
 
</style>
