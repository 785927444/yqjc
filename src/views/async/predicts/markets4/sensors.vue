<template>

  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :before-close="onVisable" :draggable="true" :destroy-on-close="true" width="70%">
      <div class="layout-col white">
        <!-- 标题 -->
        <div class="h40 ww100 flex-sc relative mb10">
          <!-- <img class="hh100" src="@/assets/imgs/title4.png" /> -->
          <div class="ww100 hh100 flex-sc absolute">
            <span class="fw flex1 ptb5 i15">
              <span class="mr20">总容量：<span class="i21 f18">50<span class="f12 ml3">kW</span></span></span>
              <span class="mr20">总发电：<span class="i21 f18">5000<span class="f12 ml3">kWh</span></span></span>
              <span class="mr20">在线：<span class="i11 f18">10<span class="f12 ml3"></span></span></span>
              <span class="mr20">离线：<span class="i8 f18">1<span class="f12 ml3"></span></span></span>
            </span>
            <div class="flex-ec flex1">
                <div class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1" 
                v-if="state.content.find(v=>{return typeof(v.key) == 'object'}) && state.content.find(v=>{return typeof(v.key) == 'object'})['key'].hasOwnProperty('add')" 
                @click.stop="handleClick('add', state.addItem)">
                <i-ep-plus class="f12 fw" /><span class="f14 ml4">{{state.content.find(v=>{return typeof(v.key) == 'object'})['key'].add}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="row bgi22">
          <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
        </div>
        <div class="table ba1">
          <div class="row cursor" :class="publicStore.active[state.key] == item[state.key]?'active':index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click="handleClick('active', item)">
            <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
              <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'||state.auth[kk] == false?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
              <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
              <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
              <span v-else-if="v.type == 'select'" :class="find(v.list, [v.value, item[v.key]], 'color')?find(v.list, [v.value, item[v.key]], 'color'):''">
                {{find(v.list, [v.value, item[v.key]], v.label)}}
              </span>
              <span v-else-if="v.type == 'switch'">
                <el-switch v-model="item[v.key]" :active-text="v.value[1].name" :inactive-text="v.value[0].name" :active-value="v.value[1].value" :inactive-value="v.value[0].value" inline-prompt @change="handleClick('switch', item)"></el-switch>
              </span>
              <span v-else-if="v.type == 'input'"><el-input v-model="item[v.value]" placeholder="请输入" style="width: 150px;" size="small" /></span>
              <span v-else-if="v.type == 'image'" class="flex-sc warp">
                <div class="flex-sc">
                  <el-image class="w25 h25 m2 rad3 cursor" v-if="item[v.key].length!=0" :src="item[v.key]" :preview-src-list="state.srcList" @click.stop="state.srcList= [];state.srcList.push(item[v.key])" />
                  <span class="w50 h25 ca flex-sc" v-else>暂无</span>
                </div>
              </span>
              <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
            </div>
          </div>
          <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
        <Pagination class="plr20" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
        <Add @init="init" :state="state" ref="addRefs" />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
    title: '设备列表',
    content: [
      { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x3', show: true, align: 'left', key: 'id', name: 'ID', type: 'icon5' },  
      { width: 'w50x3', show: true, align: 'left', key: 'name', name: '名称' },
      { width: 'w50x3', show: true, align: 'left', key: 'type', name: '类型', type: 'select', list: [], value: 'type', label: 'name' },
      { width: 'w80',   show: true, align: 'left', key: 'picture', name: '模型', type: 'image' },
      { width: 'w50x4', show: true, align: 'left', key: 'instlPos', name: '安装位置' },
      { width: 'w50x2', show: true, align: 'center', key: 'capacity', name: '装机容量' },
      { width: 'w50x2', show: true, align: 'center', key: 'computeIntvalSec', name: '图谱计算' },
      { width: 'w50x2', show: true, align: 'center', key: 'storeIntvalSecs', name: '采样存储' },
      { width: 'w50x2', show: true, align: 'center', key: 'alarmTigrStoreSecs', name: '告警存储' },
      { width: 'flex1', show: true, align: 'right', key: {add: '添加', upd:'编辑', del: '删除'}, name: '操作' },
    ],
    editFrom: [
      { required: true, editshow: 'disabled',  name: 'ID', key: 'id',  type: 'input', class: 'number' },
      { required: true, editshow: true, name: '名称', key: 'name', type: 'input' },
      { required: true,  editshow: true,  name: '类型', key: 'type', type: 'select', list: [], value: 'type', label: 'name', relation: ['comm_params']},
      { required: false, editshow: true,  name: '模型', key: 'model', type: 'select', list: [], value: 'id', label: 'name', filt: ['type', 'type'] },
      { required: false, editshow: 'none', name: '区域', key: 'bayNum', type: 'input'},
      { required: false, editshow: true, name: '安装位置', key: 'instlPos',  type: 'input' },
      { required: false, editshow: true, name: '装机容量', key: 'capacity',  type: 'input' },
      { required: false, editshow: true, name: '图谱计算', key: 'computeIntvalSec',  type: 'input' },
      { required: false, editshow: true, name: '采样存储', key: 'storeIntvalSecs',  type: 'input' },
      { required: false, editshow: true, name: '告警存储', key: 'alarmTigrStoreSecs',  type: 'input' },
      { required: false, editshow: true, name: '通信参数', key: 'comm_params',  type: 'json' },
    ],
    addItem: {},
    imgs: [],
    model: 't_invit_sensor',
  })
  let addRefs = $ref()

  // 打开关闭弹窗
  const onVisable = async (val) => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    publicStore.active = {...val}
    await setInit()
    init()
  }

  const setInit = async() => {
    let query2 = {model: "t_sensor_template", args: `attribute='0'`}
    let query3 = {model: "t_model"}
    let params = {Api2: query2, Api3: query3}
    let res = await publicStore.http(params)
    publicStore._public.templates = proxy.isNull(res.Api2)? [] : res.Api2
    publicStore._public.models = proxy.isNull(res.Api3)? [] : res.Api3
    state.content.forEach(v => {
      if(v.key == 'model') v.list = publicStore._public.models
      if(v.key == 'type') v.list = publicStore._public.templates
    })
    state.editFrom.forEach(v => {
      if(v.key == 'model') v.list = publicStore._public.models
      if(v.key == 'type') v.list = publicStore._public.templates
    })
    state.addItem = {customer_id: publicStore.active.id, class: '0'}
  }

  const init = async(key) => {
    if(key) publicStore.isTrue = !publicStore.isTrue
    let args = `customer_id='${publicStore.active.id}' and `
    if(state.name) args += `name LIKE '%${state.name}%' and `
    let q1 = {limit: state.limit, page: state.page}
    let q2 = {field: `COUNT(*)`}
    let qs = args? {model: state.model, args: args.slice(0, -4)} : {model: state.model}
    let query1 = {}
    let query2 = {}
    Object.assign(query1, qs, q1)
    Object.assign(query2, qs, q2)
    state.parmas = {Api1: query1, Api2: query2}
    let res = await publicStore.http(state.parmas)
    state.empty = proxy.isNull(res.Api1)? true : false
    state.list = proxy.isNull(res.Api1)? [] : res.Api1.sort((a, b) => a.order - b.order)
    state.total = proxy.isNull(res.Api2)? 0 : res.Api2[0]['COUNT(*)']
    state.list.forEach(v => {
      let exist = publicStore._public.models.find(a=>a.id == v.model)
      v.picture = exist? exist.picture : ''
    })
  }
  
  const handleClick = async(remark, val) => {
    if(remark == 'add' || remark == 'upd'){
      addRefs.onVisable(val)
    }
    if(remark == 'del'){
      addRefs.del(val)
    }
  }

  // 暴露给父组件
  defineExpose({
    onVisable,
  })
</script>
  
<style scoped lang="scss">

</style>
  