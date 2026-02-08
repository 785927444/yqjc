<template>
  <!-- 生成弹窗 -->
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="`【${state.title}】`" :draggable="true" :fullscreen="true" :destroy-on-close="true">
      <!-- <div class="layout-col hidden relative">
        <div style="width: 100%; height: 100%; position: absolute; top: -80px; left: 0; overflow: scroll;">
          <iframe class="ww100 hh100" style="border: none; overflow: hidden;" :src="state.iframe" frameborder="0" 
            scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms">
          </iframe> 
        </div> 
      </div> -->
      <!-- 内容 -->
      <div class="layout-col hidden relative ba1 white">
        <div class="row bgi22">
          <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
        </div>
        <div class="layout-col">
          <div class="table">
            <div class="row cursor" :class="publicStore.active[state.key] == item[state.key]?'active':index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click="handleClick('active', item)">
              <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
                <span v-if="typeof(v.key) == 'object'" class="cursor mlr5" :class="kk=='add'||state.auth[kk] == false?'none':kk=='del'?'i8':'i21'" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
                <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
                <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
                <span v-else-if="v.type == 'select'" :class="find(v.list, [v.value, item[v.key]], 'color')?find(v.list, [v.value, item[v.key]], 'color'):''">
                  {{find(v.list, [v.value, item[v.key]], v.label)}}
                </span>
                <span v-else-if="v.type == 'switch'">
                  <el-switch v-model="item[v.key]" :active-text="v.value[1].name" :inactive-text="v.value[0].name" :active-value="v.value[1].value" :inactive-value="v.value[0].value" inline-prompt @change="handleClick('switch', item)"></el-switch>
                </span>
                <span v-else-if="v.type == 'input'"><el-input v-model="item[v.value]" placeholder="请输入" style="width: 150px;" size="small" /></span>
                <span v-else-if="v.type == 'preload'&&v.filed">{{item[v.key]?item[v.key][v.filed]:''}}</span>
                <span v-else-if="v.type == 'image'" class="flex-sc warp">
                  <div class="flex-sc" v-if="typeof(item[v.key]) == 'string'">
                    <el-image class="w25 h25 m2 rad3 cursor" v-if="item[v.key].length!=0" :src="I(item[v.key])" :preview-src-list="state.srcList" @click.stop="state.srcList= [];state.srcList.push(I(item[v.key]))" />
                    <span class="w50 h25 ca flex-sc" v-else>暂无</span>
                  </div>
                  <div class="flex-sc" v-else v-for="(img, ii) in item[v.key]" :key="ii">
                    <el-image :class="ii==0?'':'ml5'" class="w25 h25 rad3 cursor" :src="I(img)" :preview-src-list="state.srcList" @click.stop="state.srcList= [];state.srcList.push(I(img))" />
                  </div>
                </span>
                <span v-else-if="v.type == 'decrypt'">{{isNull(item[v.key]) && v.key!=''? '/' : decrypt(item[v.key])}}</span>
                <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
              </div>
            </div>
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
          </div>
          <Pagination class="plr20" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
        </div>
      </div>
    </el-dialog>
    <Add @init="init" :state="state" ref="addRef" />
  </div>
</template>

<script lang="ts" setup>
  import { Refresh, Search,Plus } from '@element-plus/icons-vue'
  import api from '@/api'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  let addRef = $ref()
  let ress = $ref([
    {name: '失败', value: '0', color: 'i8'},
    {name: '成功', value: '1', color: 'i11'},
  ])
  let types = $ref([
    {name: '常规', value: '1'},
    {name: '系统', value: '2'},
  ])
  let levels = $ref([
    {name: '注意', value: 'info', color: 'i15'},
    {name: '警告', value: 'warning', color: 'i6'},
    {name: '错误', value: 'error', color: 'i8'},
    {name: '致命', value: 'fatal', color: 'i9'}
  ])
  const state = reactive({
    ...publicStore.$state,
    content: [
      { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x2', show: true, align: 'left',  key: 'name', name: '操作名称' },
      { width: 'w50x6', show: true, align: 'left',  key: 'schemeName', name: '预设方案' },
      { width: 'w50x6', show: true, align: 'left',  key: 'systemtestName', name: '所属案例' },
      { width: 'w50x3', show: true, align: 'left',  key: 'user', name: '用户', type: 'decrypt' },
      { width: 'w50x4', show: true, align: 'left',  key: 'start_time', name: '时间', type: 'time' },
      { width: 'w50x2', show: true, align: 'left',  key: 'res', name: '结果', type: 'select', list: ress, value: 'value', label: 'name'  },
      { width: 'w50x4', show: true, align: 'left',  key: 'msg', name: '反馈' },
      { width: 'w50x5', show: true, align: 'left',  key: 'start_time', name: '时间', type: 'time' },
      { width: 'flex1', show: true, align: 'right', key: {del: '删除'},  name: '操作' },
    ],
    model: 't_scheme_log',
  })

  const props = defineProps({
    state: {
      type: [Object, Array],
      default: ()=>{return {}}
    },
  })
  // const emit = defineEmits(['init'])

  // 弹窗
  const onVisable = async (val?: any) => {
    state.empty = false
    state.total = 0
    state.list = []
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.title = '执行记录'
    state.active = {...val}
    init()
    // state.iframe = `http://${publicStore.link.ip}:${publicStore.link.port}/#/scheme/schemeList/schemeHistory?scene=base`
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

  const handleClick = (remark, val) => {
    if(remark == 'add' || remark == 'upd'){
      addRef.onVisable(val)
    }
    if(remark == 'del'){
      addRef.del(val)
    }
  }

  // 暴露
  defineExpose({
    onVisable
  })
</script>

<style lang="scss" scoped>
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