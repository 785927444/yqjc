<template>
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :before-close="onVisable" :draggable="true" :destroy-on-close="true" width="80%">
      <div class="layout-col plr20 pt20 white">
        <!-- 头部 -->
        <div class="ww100 flex-col p20 rad5 ba1">
          <div class="ww100 flex-sc">
            <div class="flex-sc w100x3">
              <img class="w60" src="@/assets/imgs/zz1.png" />
              <div class="flex-col-ss ml20">
                <div class="f20">{{ state.form.name }}</div>
                <div class="flex-sc mt10">
                    <div class="bgi5 rad20 ptb3 plr10 f12">{{ find(customerTypes, ['value', state.form.type], 'name') }}</div>
                    <div class="i15 f12 ml20" v-if="state.form.updtime">更新：{{ state.form.updtime }}</div>
                </div>
              </div>
            </div>
            <div class="w2 h70 mlr30" style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100% )"></div>
            <div class="flex1 flex-sc warp i15">
              <div class="flex-sc ww25 mtb7">
                <span>额定容量：</span>
                <span class="white">{{ state.form.capacity }}</span>
              </div>
              <div class="flex-sc ww25 mtb7">
                <span>户号内容：</span>
                <span class="white">{{ state.form.account_name }}</span>
              </div>
              <div class="flex-sc ww25 mtb7">
                <span>联系方式：</span>
                <span class="white">{{ state.form.contact_phone }}</span>
              </div>  
              <div class="flex-sc ww25 mtb7">
                <span>所属地区：</span>
                <span class="white">{{ state.form.area }}</span>
              </div>  
              <div class="flex-sc ww25 mtb7">
                <span>电表编号：</span>
                <span class="white">{{ state.form.electricity_code }}</span>
              </div>
              <div class="flex-sc ww25 mtb7">
                <span>供电单位：</span>
                <span class="white">{{ find(companys, ['value', state.form.power_company], 'name') }}</span>
              </div>  
              <div class="flex-sc ww25 mtb7">
                <span>联系邮箱：</span>
                <span class="white">{{ state.form.contact_email }}</span>
              </div> 
              <div class="flex-sc ww25 mtb7">
                <span>联系地址：</span>
                <span class="white">{{ state.form.contact_address }}</span>
              </div>  
            </div>
          </div>
          <div class="ww100 flex-ss i15 mt20">
            <span>主营业务：</span>
            <span class="flex1">{{ state.form.describe }}</span>
          </div>
        </div>
        <!-- 响应详情 -->
        <div class="layout-col mt20">
          <!-- 标题 -->
          <div class="h40 ww100 flex-sc relative mb5">
            <img class="hh100" src="@/assets/imgs/title3.png" />
            <div class="ww100 hh100 flex-sc absolute pl35">
              <span class="fw flex1 ptb5">响应详情</span>
              <div class="flex-ec flex1"></div>
            </div>
          </div>
          <!-- 统计 -->
          <div class="ww100 flex-sc relative mb10">
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz2.png" />
                <span class="ml15">响应次数</span>
                <span class="flex1 tr fw f20">5<span class="ml8 f12 i15">个</span></span>
              </div>
            </div>
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz3.png" />
                <span class="ml15">设备数量</span>
                <span class="flex1 tr fw f20">{{ state.data.key1?state.data.key1:'0' }}<span class="ml8 f12 i15">个</span></span>
              </div>
            </div>
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz4.png" />
                <span class="ml15">装机容量</span>
                <span class="flex1 tr fw f20">2500<span class="ml8 f12 i15">kW</span></span>
              </div>
            </div>
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz5.png" />
                <span class="ml15">响应量总电量</span>
                <span class="flex1 tr fw f20">5<span class="ml8 f12 i15">kWh</span></span>
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="flex-col-ss ww100 h100x3">
            <div class="row bgi22">
              <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">
                <span v-if="v.name">{{v.name}}</span>
                <div v-else class="w16 h16 rad2 m-auto cursor flex-cc" :class="state.click?'bgi21 white':'bg-white'" @click.stop="handleClick('selectAll', item)">
                  <i-ep-select v-if="state.click" class="f10" />
                </div>
              </div>
            </div>
            <div class="table">
              <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click.stop="handleClick('active', item)">
                <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
                  <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
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
                  <span v-else>{{isNull(item[v.key]) && v.key!=''? '' : item[v.key]}}</span>
                </div>
              </div>
              <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
            </div>
            <Pagination class="plr20" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const invi_types = [
    {value: '0', name: '填谷', color: 'i15'},
    {value: '1', name: '填谷', color: 'i15'},
    {value: '2', name: '填谷', color: 'i15'},
  ]
  const time_types = [
    {value: '0', name: '约时', color: 'i15'},
    {value: '1', name: '约时', color: 'i15'},
    {value: '2', name: '约时', color: 'i15'},
  ]
  const statuss = [
    {value: '0', name: '待邀约', color: 'i6'},
    {value: '1', name: '待确认', color: 'i6'},
    {value: '2', name: '待执行', color: 'i6'},
    {value: '3', name: '正在执行', color: 'i12'},
    {value: '4', name: '执行完成', color: 'i15'},
  ]
  const customerTypes = [
    {name: '工业用户', value: '1'},
    {name: '商业用户', value: '2'},
    {name: '事业单位', value: '3'},
    {name: '居民用户', value: '4'},
  ]
  const companys = [
    {name: '亮能售电有限公司', value: '1'},
    {name: '广林汇智能源科技有限公司', value: '2'},
    {name: '渝北制造厂', value: '3'},
  ]
  const state = reactive({
	  ...publicStore.$state,
    title: '客户详情',
    content: [
      // { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x4', show: true, align: 'left',  key: 'name', name: '项目名称' },
      { width: 'w50x3', show: true, align: 'left',  key: 'invi_type', name: '邀约类型', type: 'select', list: invi_types, value: 'value', label: 'name' },     
      { width: 'w50x3', show: true, align: 'left',  key: 'time_type', name: '时间类型', type: 'select', list: time_types, value: 'value', label: 'name' },
      { width: 'w50x3', show: true, align: 'left',  key: 'capacity', name: '需求容量（kW）' },
      { width: 'w50x4', show: true, align: 'left',  key: 'start_time', name: '响应开始', type: 'time' },
      { width: 'w50x4', show: true, align: 'left',  key: 'end_time', name: '响应结束', type: 'time' },
      { width: 'w50x4', show: true, align: 'left',  key: 'deal_price', name: '出清价格' },
      { width: 'w50x3', show: true, align: 'left',  key: 'deal_capacity', name: '出清容量（kW）' },
      { width: 'w50x4', show: true, align: 'left',  key: 'deal_time', name: '出清时间', type: 'time' },
      { width: 'w50x3', show: true, align: 'left',  key: 'status', name: '状态',  type: 'select', list: statuss, value: 'value', label: 'name' },
    ],
    click: false,
    clickArr: [],
  })
  const emit = defineEmits(['init'])

  // 打开关闭弹窗
  const onVisable = async (val) => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.empty = true
    state.list = []
    state.total = 0
    state.page = 1
    state.form = {...val}
    init()
  }

  const init = async () => {
    getDevies()
    getTaskList()
  }

  const getDevies = async() => {
    let query = {model: 't_invit_sensor', args: `customer_id='${state.form.id}'`}
    let res = await publicStore.http({Api: query})
    let list = proxy.isNull(res)? [] : res
    state.data.key1 = list.length
  }

  const getTaskList = async() => {
    let args = `i.customer_id='${state.form.id}' and `
    let model = 't_invit_task b'
    let field = 'b.*, i.id AS invit_id, i.deal_price, i.deal_capacity, i.deal_devices, i.deal_start, i.deal_end, i.deal_time'
    let join = `t_invit i ON b.id = i.task_id`
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
