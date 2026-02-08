<template>
  <div class="layout-col">
    <!-- 搜索 -->
    <div class="ww100 flex-bc pr15 pl10 mt5">
      <div class="flex-sc"></div>
      <div class="flex-ec cursor flex1">
        <div class="ml15 mr10">客户名称</div>
        <div class="flex w50x4">
          <el-input v-model="state.name" placeholder="请输入" style="width: 100%" clearable filterable />
        </div>
        <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1 ml15" @click.stop="state.page = 1; init()" :icon="Search">搜索</el-button>
        <div class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10" 
          v-if="state.content.find(v=>{return typeof(v.key) == 'object'}) && state.content.find(v=>{return typeof(v.key) == 'object'})['key'].hasOwnProperty('add')" 
          @click.stop="handleClick('add', state.addItem)">
          <i-ep-plus class="f12 fw" /><span class="f14 ml4">{{state.content.find(v=>{return typeof(v.key) == 'object'})['key'].add}}</span>
        </div>
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
              <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'||state.auth[kk] == false?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
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
              <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
            </div>
          </div>
          <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
        <Pagination class="plr20" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
        <Add @init="init" :state="state" ref="addRef" />
        <sensors @init="init" :state="state" ref="sensorRef" />
       </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import sensors from "./sensors"
  import { Plus, Refresh, Search, Filter, Connection, Edit, Operation } from '@element-plus/icons-vue'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const customerTypes = [
    {name: '工业用户', value: '1'},
    {name: '商业用户', value: '2'},
    {name: '事业单位', value: '3'},
    {name: '居民用户', value: '4'},
  ]
  const statuss = [
    {value: '0', name: '未邀约', color: 'i15'},
    {value: '1', name: '已邀约', color: 'i12'},
    {value: '2', name: '已接受', color: 'i6'},
    {value: '2', name: '已拒绝', color: 'i8'},
  ]
  const companys = [
    {name: '亮能售电有限公司', value: '1'},
    {name: '广林汇智能源科技有限公司', value: '2'},
    {name: '渝北制造厂', value: '3'},
  ]
  const state = reactive({
	  ...publicStore.$state,
    content: [
      { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x3', show: true, align: 'left',  key: 'name', name: '客户名称' },
      { width: 'w50x3', show: true, align: 'left',  key: 'type', name: '客户类型', type: 'select', list: customerTypes, value: 'value', label: 'name' },
      { width: 'w50x3', show: true, align: 'left',  key: 'account_name', name: '户名' },
      { width: 'w50x3', show: true, align: 'left',  key: 'electricity_code', name: '电表号' },
      { width: 'w50x3', show: true, align: 'left',  key: 'area', name: '所属地区' },
      { width: 'w50x3', show: true, align: 'left',  key: 'contact_name', name: '联系姓名' },
      { width: 'w50x3', show: true, align: 'left',  key: 'contact_phone', name: '联系电话' },
      { width: 'w50x3', show: true, align: 'left',  key: 'contact_email', name: '联系邮箱' },
      { width: 'w50x4', show: true, align: 'left',  key: 'contact_address', name: '联系地址' },
      { width: 'w50x4', show: true, align: 'left',  key: 'power_company', name: '供电单位', type: 'select', list: companys, value: 'value', label: 'name' },
      { width: 'flex1', show: true, align: 'right', key: {add: '新增', sensor: '设备',  upd:'编辑', del: '删除'},  name: '操作' },
    ],
    editFrom: [
      { required: true, editshow: true, name: '客户名称', key: 'name', type: ['input'] },
      { required: true, editshow: true, name: '客户类型', key: 'type', type: 'select', list: customerTypes, value: 'value', label: 'name' },
      { required: true, editshow: true, name: '户名', key: 'account_name', type: ['input'] },
      { required: true, editshow: true, name: '电表号', key: 'electricity_code', type: ['input'] },
      { required: false, editshow: true, name: '所属地区', key: 'area', type: ['input'] },
      { required: false, editshow: true, name: '联系姓名', key: 'contact_name', type: ['input'] },
      { required: false, editshow: true, name: '联系电话', key: 'contact_phone', type: ['input'] },
      { required: false, editshow: true, name: '联系邮箱', key: 'contact_email', type: ['input'] },
      { required: false, editshow: true, name: '联系地址', key: 'contact_address', type: ['input'] },
      { required: false, editshow: true, name: '供电单位', key: 'power_company', type: 'select', list: companys, value: 'value', label: 'name' },
      { required: false, editshow: true, name: '描述', key: 'describe', type: ['textarea'] },
    ],
    name: '',
    addItem: {status: '0'},
    model: 't_invit_customer',
  })
  let addRef = $ref()
  let sensorRef = $ref()

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
    if(remark == 'sensor'){
      sensorRef.onVisable(val)
    }
  }
</script>

<style lang="scss">
 
</style>
