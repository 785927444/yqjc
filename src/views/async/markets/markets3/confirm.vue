<template>
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :before-close="onVisable"  :fullscreen="true" :draggable="true" :destroy-on-close="true">
      <div class="layout-col plr20 pt20 white">
        <!-- 头部 -->
        <div class="ww100 flex-col p20 rad5 ba1">
          <div class="ww100 flex-sc">
            <div class="f20 mr20">{{ state.form.name }}</div>
            <div class="flex-sc ptb10 plr20 rad30 i15" style="background: rgba(13, 33, 102, 0.6);">
              <div class="flex-cc" v-for="(v, i) in state.statuss" :key="i">
                <div v-if="i!=0" class="w40 h2 bgi15 mlr10 rad2"></div>
                <div class="flex-sc" :class="v.value == state.form.status?'i21':''">
                  <div v-if="v.value == state.form.status" class="w16 h16 flex-cc rad100 bgi21 i22 f10 mr5 p2"><i-ep-select /></div>
                  <div>{{ v.name }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="ww100 flex-sc mt20">
            <div class="flex-sc mr20">
              <img class="mr5" src="@/assets/imgs/zg1.png" />
              <span>响应时间段：</span>
              <span>{{ parseTime(state.form.start_time) }}</span>
              <span class="mlr8 w10 h2 bg-white"></span>
              <span>{{ parseTime(state.form.end_time) }}</span>
            </div>
            <div class="flex-sc mr20">
              <img class="mr5" src="@/assets/imgs/zg2.png" />
              <span>邀约类型：</span>
              <span>{{ find(state.invi_types, ['value', state.form.invi_type], 'name')}}</span>
            </div>
            <div class="flex-sc mr20">
              <img class="mr5" src="@/assets/imgs/zg3.png" />
              <span>时间类型：</span>
              <span>{{ find(state.time_types, ['value', state.form.time_type], 'name')}}</span>
            </div> 
            <div class="flex-sc mr20">
              <img class="mr5" src="@/assets/imgs/zg4.png" />
              <span>需求容量：</span>
              <span>{{ state.form.capacity}}</span>
            </div> 
            <div class="flex-sc mr20">
              <img class="mr5" src="@/assets/imgs/zg5.png" />
              <span>需求地区：</span>
              <span>{{ state.form.area}}</span>
            </div> 
          </div>
        </div>
        <!-- 统计 -->
        <div class="ww100 flex-sc relative mt10">
          <div class="flex1 pr10">
            <div class="ww100 flex-sc bs4 p20">
              <img class="w50" src="@/assets/imgs/zzz1.png" />
              <span class="ml15">邀约客户数量</span>
              <span class="flex1 tr fw f20">{{ !isNull(state.data)&&!isNull(state.data.key1)?state.data.key1:'0' }}<span class="ml8 f12 i15">个</span></span>
            </div>
          </div>
          <div class="flex1 pr10">
            <div class="ww100 flex-sc bs4 p20">
              <img class="w50" src="@/assets/imgs/zzz2.png" />
              <span class="ml15">客户响应数量</span>
              <span class="flex1 tr fw f20">{{ !isNull(state.data)&&!isNull(state.data.key2)?state.data.key2:'0' }}<span class="ml8 f12 i15">个</span></span>
            </div>
          </div>
          <div class="flex1 pr10">
            <div class="ww100 flex-sc bs4 p20">
              <img class="w50" src="@/assets/imgs/zzz3.png" />
              <span class="ml15">出清价格最大值</span>
              <span class="flex1 tr fw f20">{{ !isNull(state.data)&&!isNull(state.data.key4)?state.data.key4:'0' }}<span class="ml8 f12 i15">元/kW</span></span>
            </div>
          </div>
          <div class="flex1 pr10">
            <div class="ww100 flex-sc bs4 p20">
              <img class="w50" src="@/assets/imgs/zzz4.png" />
              <span class="ml15">清价格最小值</span>
              <span class="flex1 tr fw f20">{{ !isNull(state.data)&&!isNull(state.data.key4)?state.data.key4:'0' }}<span class="ml8 f12 i15">元/kW</span></span>
            </div>
          </div>
        </div>
        <!-- 客户列表 -->
        <div class="layout-col">
          <!-- 搜索 -->
          <div class="ww100 flex-bc ptb20">
            <div class="flex-sc">
              <img class="w30" src="@/assets/imgs/title-dot.png" />
              <div class="fw f16">客户列表</div>
            </div>
            <div class="flex-ec cursor flex1">
              <div class="ml15 mr10">客户名称</div>
              <div class="flex w50x4">
                <el-input v-model="state.name" placeholder="请输入" style="width: 100%" clearable filterable />
              </div>
              <div class="ml15 mr5">客户类型：</div>
              <div class="flex w50x4">
                <el-select v-model="state.type" placeholder="请选择" style="width: 100%" clearable filterable>
                  <el-option label="全部" value="-1" />
                  <el-option v-for="(v, i) in customerTypes" :key="v.value" :label="v.name" :value="v.value" />
                </el-select>
              </div>
              <div class="ml15 mr5">邀约状态：</div>
              <div class="flex w50x4">
                <el-select v-model="state.status" placeholder="请选择" style="width: 100%" clearable filterable @change="state.click=false;state.clickArr=[]">
                  <el-option label="全部" value="-1" />
                  <el-option v-for="(v, i) in statuss" :key="v.value" :label="v.name" :value="v.value" />
                </el-select>
              </div>
              <el-button class="rad4 ptb5 plr10 flex-cc cursor bgi22 i21 ml10 bo-i21-1 ml15" @click.stop="state.page = 1; init()" :icon="Search">搜 索</el-button>
              <el-button class="rad4 ptb5 plr10 flex-cc cursor bgi22 i21 ml10 bo-i21-1" @click.stop="handleClick('invits')" :icon="Edit">批量邀约</el-button>
              <el-button class="rad4 ptb5 plr10 flex-cc cursor bgi22 i21 ml10 bo-i21-1" @click.stop="handleClick('confirms')" :icon="Edit">批量确认</el-button>
            </div>
          </div>
          <!-- 内容 -->
          <div class="layout-col">
            <div class="row bgi22">
              <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">
                <span v-if="v.name">{{v.name}}</span>
                <div v-else class="w16 h16 rad2 m-auto cursor flex-cc" :class="state.click?'bgi21 white':'bg-white'" @click.stop="handleClick('selectAll', item)">
                  <i-ep-select v-if="state.click" class="f10" />
                </div>
              </div>
            </div>
            <div class="table ba1">
              <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click.stop="handleClick('active', item)">
                <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
                  <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)"
                  :class="kk=='add'||(kk=='invit'&&item['status']!='0')||(kk=='deal'&&(item['status']!='1'&&item['status']!='2'))||(kk=='confirm'&&item['status']!='2')?'none':''">
                    {{ vv }}
                  </span>
                  <div v-else-if="v.key=='-'" class="w16 h16 rad2 m-auto cursor flex-cc" :class="item['click']?'bgi21 white':'bg-white'" @click.stop="handleClick('active', item)">
                    <i-ep-select v-if="item['click']" class="f10" />
                  </div>
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
          </div>
        </div>
      </div>
      <!--  客户详情 -->
      <customer @init="init" ref="customerRef" />
      <!-- 出清 -->
      <deal @init="init" ref="dealRef" />
      <!-- 确认 -->
      <confirms @init="init" ref="confRef" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import api from '@/api'
  import deal from "./deal"
  import confirms from "./confirms"
  import customer from "./customer"
  import { Plus, Refresh, Search, Filter, Connection, Edit, Operation } from '@element-plus/icons-vue'
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
    {value: '3', name: '已拒绝', color: 'i8'},
  ]
  const companys = [
    {name: '亮能售电有限公司', value: '1'},
    {name: '广林汇智能源科技有限公司', value: '2'},
    {name: '渝北制造厂', value: '3'},
  ]
  const confirmss = [
    {value: '0', name: '待确认', color: 'i15'},
    {value: '1', name: '中标', color: 'i11'},
    {value: '2', name: '放弃', color: 'i6'},
  ]
  const state = reactive({
	  ...publicStore.$state,
    title: '邀约详情',
    content: [
      { width: 'w50',   show: true, align: 'center', key: '-', name: '' },
      // { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x4', show: true, align: 'left',  key: 'name', name: '客户名称' },
      { width: 'w50x2', show: true, align: 'left',  key: 'type', name: '类型', type: 'select', list: customerTypes, value: 'value', label: 'name' },
      { width: 'w50x4', show: true, align: 'left',  key: 'power_company', name: '供电单位', type: 'select', list: companys, value: 'value', label: 'name' },
      { width: 'w50x2', show: true, align: 'left',  key: 'status', name: '邀约状态', type: 'select', list: statuss, value: 'value', label: 'name' },
      { width: 'w50x4', show: true, align: 'left',  key: 'deal_time', name: '出清时间', type: 'time' },
      { width: 'w50x3', show: true, align: 'left',  key: 'deal_price', name: '出清价格' },
      { width: 'w50x3', show: true, align: 'left',  key: 'deal_capacity', name: '响应容量' },
      { width: 'w50x4', show: true, align: 'left',  key: 'deal_start', name: '响应开始', type: 'time' },
      { width: 'w50x4', show: true, align: 'left',  key: 'deal_end', name: '响应结束', type: 'time' },
      { width: 'w50x2', show: true, align: 'left',  key: 'confirm', name: '反馈状态', type: 'select', list: confirmss, value: 'value', label: 'name' },
      { width: 'flex1', show: true, align: 'right', key: {confirm: '确认', deal: '出清', detail: '详情', invit: '邀约'},  name: '操作' },
    ],
    click: false,
    clickArr: [],
    name: '',
    type: '-1',
    status: '2',
  })
  const emit = defineEmits(['init'])
  let customerRef = $ref()
  let dealRef = $ref()
  let confRef = $ref()

  // 打开关闭弹窗
  const onVisable = async (val, statuss, invi_types, time_types) => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.empty = true
    state.list = []
    state.total = 0
    state.page = 1
    state.click = false
    state.clickArr = []
    state.name = '',
    state.type = '-1'
    state.status = '2'
    state.statuss = [...statuss]
    state.invi_types = [...invi_types]
    state.time_types = [...time_types]
    state.form = {...val}
    // console.log(" state.form", state.form)
    init()
  }

  const setInit = async() => {
    let query = {model: 't_invit', args: `task_id='${state.form.id}'`} 
    let res = await publicStore.http({Api: query})
    let list1 = proxy.isNull(res)? [] : res
    let list2 = list1.filter(a=>a.status == '2')
    state.data.key1 = list1.length
    state.data.key2 = list2.length
    if(!proxy.isNull(list2)){
      const prices = list2.map(a => parseFloat(a.deal_price))
      state.data.key3 = Math.max(...prices)
      state.data.key4 =  Math.min(...prices)
    }
  }

	const init = async() => {
    setInit()
    let args = ''
    if(state.name) args += `b.name LIKE '%${state.name}%' and `
    if(state.type&&state.type!='-1') args += `b.type='${state.type}' and `
    if(state.status&&state.status!='-1') {
      if(state.status == '0'){
        args += `i.status IS NULL OR i.status = 0 and `
      }else{
        args += `status='${state.status}' and `
      }
    }
    let model = 't_invit_customer b'
    let field = 'b.*, IFNULL(i.status, 0) AS status, i.id AS invit_id, i.deal_price, i.deal_capacity, i.deal_devices, i.deal_start, i.deal_end, i.deal_time, i.confirm, i.confirm_text'
    let join = `t_invit i ON b.id = i.customer_id AND i.task_id = '${state.form.id}'`
    let q1 = {limit: state.limit, page: state.page}
    let q2 = {field: `COUNT(*)`}
    let qs = args? {model: model, field: field, join: join, order: 'b.id desc', args: args.slice(0, -4)} : {model: model, field: field, join: join, order: 'b.id desc'}
    let query1 = {}
    let query2 = {}
    Object.assign(query1, qs, q1)
    Object.assign(query2, qs, q2)
    state.parmas = {Api1: query1, Api2: query2}
    let res = await publicStore.http(state.parmas )
    state.empty = proxy.isNull(res.Api1)? true : false
    state.list = proxy.isNull(res.Api1)? [] : res.Api1
    state.total = proxy.isNull(res.Api2)? 0 : res.Api2[0]['COUNT(*)']
	}

  const handleClick = (remark, val) => {
    if(remark == 'detail') {
      console.log("val", val)
      customerRef.onVisable(val)
    }
    if(remark == 'active'){
      let clickIndex = state.clickArr.findIndex(a=>a[state.key] == val[state.key])
      if(clickIndex != -1){
        val.click = false
        state.clickArr.splice(clickIndex, 1)
      }else{
        val.click = true
        state.clickArr.push(val)
      }
    }
    if(remark == 'selectAll'){
      let clickIndex = state.list.findIndex(a=>{ return a['click'] })
      if(clickIndex == -1){
        state.click = true
        state.list.forEach(item => {
          item.click = true
          state.clickArr.push(item)
        })
      }else{
        state.click = false
        state.clickArr = []
        state.list.forEach(item => {delete item['click']})
      }
    }
    let time = new Date().getTime()
    if(time < state.form.start_time) return ElNotification({ title: '提示', message: '操作失败，当前时间必须大于开始时间', type: 'error' })
    if(time > state.form.end_time) return ElNotification({ title: '提示', message: '操作失败，当前时间必须大于结束时间', type: 'error' })
    if(remark == 'invit'){
      if (val.status != '0') return ElNotification({ title: '提示', message: '已邀约，请重新选择！', type: 'error' })
      ElMessageBox.confirm('是否确定邀约?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'success'}).then(() => {
        invit([val], time)
      })
    }
    if(remark == 'invits'){
      let tempval = state.clickArr.find(a=>a.status != '0')
      if (tempval) return ElNotification({ title: '提示', message: '至少一条满足！', type: 'error' })
      if (state.clickArr.length == 0) return ElNotification({ title: '提示', message: '至少选中一条', type: 'error' })
      ElMessageBox.confirm('是否确定邀约?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'success'}).then(() => {
        invit(state.clickArr, time)
      })
    }
    if(remark == 'deal') {
      dealRef.onVisable(val, state.form)
    }
    if(remark == 'confirm') {
      if (val.status != '2') return ElNotification({ title: '提示', message: '已确认，请重新选择！', type: 'error' })
      confRef.onVisable([val], state.form)
    }
    if(remark == 'confirms') {
      let tempval = state.clickArr.find(a=>a.status != '2')
      if (tempval) return ElNotification({ title: '提示', message: '至少一条满足！', type: 'error' })
      if (state.clickArr.length == 0) return ElNotification({ title: '提示', message: '至少选中一条', type: 'error' })
      confRef.onVisable(state.clickArr, state.form)
    }
  }

  // 邀约
  const invit = async(lists, time) => {
    let params = {model: 't_invit', list: []}
    params.list = lists.map(v => { return {id: '', task_id: state.form.id, customer_id: v.id, status: '1', invit_time: time} })
    api.addApi(params).then((res:any) => {
      if(res.code == 200){
        ElNotification({ title: '提示', message: '邀约成功', type: 'success' })
        if(state.form.status == '0') setTaskStatus('1')
        init()
      }else{
        ElNotification({ title: '提示', message: '邀约失败', type: 'error' })
      }
    }).catch((err) => {
      ElNotification({ title: '提示', message: '邀约失败', type: 'error' })
    })
  }

  const setTaskStatus = async(status) => {
    let params = {model: 't_invit_task', list: [{id: state.form.id, status: status}]}
    api.updApi(params).then((res:any) => {
      if(res.code == 200){
        // ElNotification({ title: '提示', message: '状态更新成功', type: 'success' })
      }else{
        ElNotification({ title: '提示', message: '状态更新失败', type: 'error' })
      }
    }).catch((err) => {
      ElNotification({ title: '提示', message: '状态更新失败', type: 'error' })
    })
  }

  // 暴露给父组件
  defineExpose({
    onVisable,
  })
</script>

<style scoped lang="scss">
  :deep(input:-webkit-autofill) {
    -webkit-text-fill-color: #f5f5f5 !important;
  }
  :deep(.el-dialog){
    border-radius: 0;
  }
  :deep(.el-dialog__header){
    border-radius: 0;
  }
  :deep(.el-dialog__body){
    padding: 0;
    height: calc(100% - 60px);
  }
</style>
