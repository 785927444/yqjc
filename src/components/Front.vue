<template>
  <!-- 生成弹窗 -->
  <el-dialog modal-class="topclass" v-model="state.isFalse" title="预设方案列表" :draggable="true" width="70%">
    <div class="layout-col white">
      <!-- 搜索 -->
      <div class="ww100 flex-bc pb15">
        <div class="flex-sc">
          <!-- <div class="mr10">拓扑名称</div>
          <el-input class="w50x4" v-model.trim="state.search_name" placeholder="请输入" />
          <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1 ml15" @click.stop="state.page = 1; init()" :icon="Search">搜索</el-button> -->
        </div>
        <div class="flex-ec cursor flex1">
          <!-- <div class="ml15 mr10">拓扑名称</div>
          <el-input class="w50x4" v-model.trim="state.search_name" placeholder="请输入" /> -->
          <el-button class="rad4 ptb5 plr8 flex-cc cursor ml10 bo-i21-1 ml15" @click.stop="handleClick('select')" :icon="Refresh" :class="state.front?'bgi22 i21':'bga c6'">确定选择</el-button>
          <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi22 i21 ml10 bo-i21-1 ml15" @click.stop="frontAddRef.onVisable()" :icon="Plus">创建方案</el-button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="row bgi22">
        <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
      </div>
      <div class="layout-col hh100 ba1">
        <div class="flex2 ww100 flex-col hidden">
          <div class="table">
            <div class="row cursor" :class="publicStore.active[state.key] == item[state.key]?'active':index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click="handleClick('active', item)">
              <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
                <span v-if="typeof(v.key) == 'object'" class="cursor mlr5" :class="kk=='add'||state.auth[kk] == false?'none':kk=='stop'&&item['status']!=1?'ca': kk=='del'?'i8':'i21'" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
                <div v-else-if="v.key=='-'" class="w14 h14 rad100 m-auto cursor flex-cc p2" :class="state.front && state.front == item.id?'bgi16 white':'bg-white'" @click.stop="handleClick('active', item)">
                  <i-ep-select v-if="state.front && state.front == item.id" class="f10" />
                </div>
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
          <Pagination class="plr5 bgi22" style="padding: 5px 10px !important" v-show="state.total>0" :total="state.total" v-model:page.sync="state.page" v-model:limit.sync="state.limit" @pagination="init" />
        </div>
      </div>
    </div>
    <FrontDetail :state="state" ref="frontDetailRef"/>
    <FrontAdd :state="state" ref="frontAddRef" @init="init"/>
    <FrontEdit :state="state" ref="frontEditRef" @init="init"/>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { Refresh, Search,Plus } from '@element-plus/icons-vue'
  import api from '@/api'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
    ...publicStore.$state,
    content: [
      { width: 'w30', show: true, align: 'left', key: '-', name: '' }, 
      { width: 'w70', show: true, align: 'left',  key: 'id', name: 'ID' },
      { width: 'w50x6', show: true, align: 'left',  key: 'schemeName', name: '名称' },
      { width: 'w50x8', show: true, align: 'left',  key: 'schemeDesc', name: '描述' },
      // { width: 'w50x2', show: true, align: 'left',  key: 'desc', name: '状态' },
      { width: 'w50x4', show: true, align: 'left',  key: 'createTime', name: '创建时间' },
      { width: 'w50x2', show: true, align: 'left',  key: 'createBy', name: '创建人员' },
      { width: 'flex1', show: true, align: 'right', key: {detail: '详情', edit: '编辑', del: '删除'},  name: '操作' },
    ],
    search_name: '',
  })
  let frontDetailRef = $ref()
  let frontAddRef = $ref()
  let frontEditRef = $ref()

  const props = defineProps({
    state: {
      type: [Object, Array],
      default: ()=>{return {}}
    },
  })
  // const emit = defineEmits(['init'])

  // 弹窗
  const onVisable = async (val?: any) => {
    state.list = []
    state.total = 0
    state.page = 1
    state.limit = 10
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.front = !proxy.isNull(publicStore.active)&&!proxy.isNull(publicStore.active.attr) && publicStore.active.attr.front? publicStore.active.attr.front :''
    init()
  }

  const init = async() => {
    const query = {"pageNum": state.page, "pageSize": state.limit}
    const params = {query: query, ip: publicStore.link.ip, port: publicStore.link.port, url: "/api/v1/vpp/listScheme"}
    const res = await publicStore.http({httpApi: params})
    state.list = !proxy.isNull(res) && !proxy.isNull(res.data)? res.data : []
    state.total = !proxy.isNull(res) && !proxy.isNull(res.total)? res.total : 0
    // if(!proxy.isNull(state.list)){
    //   state.list.forEach(item => {
    //     setStatus(item)
    //   })
    // }
  }

  // const setStatus = async(item) => {
  //   const query = `id=${item.id}`
  //   const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/statusScheme?${query}`, method: 'GET'}
  //   const res = await publicStore.http({httpApi: params})
  //   item.desc = !proxy.isNull(res) && !proxy.isNull(res.data)? res.data.desc : ''
  //   item.status = !proxy.isNull(res) && !proxy.isNull(res.data)? res.data.status : ''
  // }

  // 事件
  const handleClick = async(remark, val, index?: any) => {
    if(remark == 'active'){
      state.front = val.id
    }
    if(remark == 'select'){
      // await setStatus(val)
      // if(val.status === '' || val.status === null || val.status === undefined) return ElNotification({ title: '提示', message: '获取状态失败', type: 'error' })
      // if(val.status !== 0) return ElNotification({ title: '提示', message: `方案${val.desc}`, type: 'error' })
      if(!state.front) return ElNotification({ title: '提示', message: `请选择预设方案`, type: 'error' })
      if(proxy.isNull(publicStore.active)) return ElNotification({ title: '提示', message: `参数缺少publicStore.active`, type: 'error' })
      if(proxy.isNull(publicStore.active.attr)) return ElNotification({ title: '提示', message: `参数缺少publicStore.active.attr`, type: 'error' })
      if(publicStore.active.attr.front && publicStore.active.attr.front == state.front) return ElNotification({ title: '提示', message: `无需重复选择相同预设方案`, type: 'error' })
      ElMessageBox.confirm('是否确定选择?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'success'}).then(() => {
        const item = state.list.find(a=>a.id == state.front)
        if(item) {
          publicStore.active.attr.front = item.id
          publicStore.active.attr.frontName = item.schemeName
          publicStore.active.attr.frontCheck = 0
          ElNotification({ title: '提示', message: '选择成功', type: 'success' })
          onVisable()
        }
      })
    }
    if(remark == 'detail'){
      frontDetailRef.onVisable(val)
    }
    if(remark == 'edit'){
      frontEditRef.onVisable(val)
    }
    if(remark == 'del'){
      ElMessageBox.confirm('是否确定删除?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'error'}).then(async() => {
        const query = `id=${val.id}`
        const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/scheme/delete?${query}`, method: 'GET'}
        const res = await publicStore.http({httpApi: params})
        console.log("删除res", res)
        if(res.code == 200 && proxy.isNull(res.data)){
          ElNotification({ title: '提示', message: '删除成功', type: 'success' })
          init()
        }else{
          ElNotification({ title: '提示', message: '删除失败', type: 'error' })
        }
      })
    }
    // if(remark == 'stop'){
    //   if(val.status == 1) {
    //     const query = `id=${val.id}`
    //     const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/stopScheme?${query}`, method: 'GET'}
    //     const res = await publicStore.http({httpApi: params})
    //     if(res.code == 200) {
    //       ElNotification({ title: '提示', message: res.message, type: 'success' })
    //       init()
    //     }
    //   }else{
    //     ElNotification({ title: '提示', message: '方案非执行中，无需停止', type: 'error' })
    //   }
    // }
  }

  // 暴露
  defineExpose({
    onVisable
  })
</script>

<style lang="scss">

</style>