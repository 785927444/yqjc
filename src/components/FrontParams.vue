<template>
  <!-- 生成弹窗 -->
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :draggable="true" width="40%" :destroy-on-close="true" :before-close="onVisable">
      <div class="layout-col white p15" element-loading-background="rgba(0, 0, 0, 0.1)" v-loading="state.loading? true : false"  element-loading-text="请求中...">
        <!-- RLC -->
        <div class="layout-col hidden relative" v-if="!isNull(state.active) && state.type=='RLC'">
          <div class="flex-bc ww100 mb10">
            <div class="flex-sc i6">
              <span>负载输入最大值不超过</span>
              <span>134.1</span>
              <span>kW</span>
            </div>
            <div class="flex1 flex-ec" v-if="!isNull(state.active)">
              <span class="bgi12 rad3 plr12 ptb6 ml10 cursor" @click.stop="handleClick('startFan', state.active)" v-if="state.active.fanStatus==0">启动风机</span>
              <span class="bgi12 rad3 plr12 ptb6 ml10 cursor" @click.stop="handleClick('stopFun', state.active)" v-else>停止风机</span>
              <span class="bgi1 rad3 plr12 ptb6 ml10 cursor">启动负载</span>
              <!-- 需先启动风机和负载 -->
              <span class="bgi8 rad3 plr12 ptb6 ml10 cursor">下发参数</span>
            </div>
          </div>
          <div class="row ba1 mb1">
            <div class="w100x4">单位（W）</div>
            <div class="w100x6">R</div>
            <div class="w100x6">L</div>
            <div class="w100x6">C</div>
          </div>
          <div class="table ba1" v-if="!isNull(state.active.params)">
            <div class="row cursor ba1 mb1">
              <div class="w100x4">A</div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['R_phsA']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['L_phsA']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['C_phsA']" placeholder="请输入" /></div>
            </div>
            <div class="row cursor ba1 mb1">
              <div class="w100x4">B</div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['R_phsB']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['L_phsB']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['C_phsB']" placeholder="请输入" /></div>
            </div>
            <div class="row cursor ba1 mb1">
              <div class="w100x4">C</div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['R_phsB']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['L_phsB']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['C_phsB']" placeholder="请输入" /></div>
            </div>
          </div>
        </div>
        <!-- 三相 -->
        <div class="layout-col hidden relative" v-if="!isNull(state.active) && state.type=='ABC'">
          <div class="flex-bc ww100 mb10">
            <div class="flex-sc i6"></div>
            <div class="flex1 flex-ec">
              <span class="bgi12 rad3 plr12 ptb6 ml10 cursor">启动风机</span>
              <span class="bga rad3 plr12 ptb6 ml10 cursor">停止风机</span>
              <span class="bgi8 rad3 plr12 ptb6 ml10 cursor">下发参数</span>
            </div>
          </div>
          <div class="ww100 flex-sc ptb5 plr10 ba1 mb1">
            <div>负载模式</div>
            <el-radio-group class="flex1 flex-sc ml15" v-model="state.active.model">
              <el-radio v-for="item in models" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
          </div>
          <div class="row ba1 mb1">
            <div class="w100x4">单位（W）</div>
            <div class="w100x6">有功功率</div>
            <div class="w100x6">无功功率</div>
          </div>
          <div class="table" v-if="!isNull(state.active.params)">
            <div class="row cursor ba1 mb1">
              <div class="w100x4">A</div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['phW_phsA']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['phVar_phsA']" placeholder="请输入" /></div>
            </div>
            <div class="row cursor ba1 mb1">
              <div class="w100x4">B</div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['phW_phsB']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['phVar_phsB']" placeholder="请输入" /></div>
            </div>
            <div class="row cursor ba1 mb1">
              <div class="w100x4">C</div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['phW_phsB']" placeholder="请输入" /></div>
              <div class="w100x6"><el-input class="ww100" v-model="state.active.params['phVar_phsB']" placeholder="请输入" /></div>
            </div>
          </div>
        </div>
        <!-- 单相 -->
        <div class="layout-col hidden relative" v-if="!isNull(state.active) && state.type=='PQ'">
          <div class="flex-bc ww100 mb10">
            <div class="flex-sc i6"></div>
            <div class="flex1 flex-ec">
              <span class="bgi12 rad3 plr12 ptb6 ml10 cursor">启动</span>
              <span class="bga rad3 plr12 ptb6 ml10 cursor">停止</span>
              <span class="bgi8 rad3 plr12 ptb6 ml10 cursor">下发参数</span>
            </div>
          </div>
          <div class="flex-col ww100" v-if="!isNull(state.active.params)">
            <div class="flex-sc ww100 ba1 p10 mb1">
              <span class="ww15">有功功率(kW)</span>
              <el-input class="flex1 ml10" v-model="state.active.params['P']" placeholder="请输入" />
              <span></span>
            </div>
            <div class="flex-sc ww100 ba1 p10">
              <span class="ww15">无功功率(kVar)</span>
              <el-input class="flex1 ml10" v-model="state.active.params['Q']" placeholder="请输入" />
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-else class="ww100 hh100 flex-cc hidden relative white p15 f20">暂无</div> -->
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { isNull } from "@/utils/common"
import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
    ...publicStore.$state,
    search_name: '',
    scheduled: false,

  })
  const models = [
    {name: 'RL', value: 'RL'},
    {name: 'RC', value: 'RC'},
  ]

	onMounted(async() => {
    createScheduled('frontParams', 2*1000, () => { if(state.scheduled) init() })
	})

  // 弹窗
  const onVisable = async (val?: any) => {
    state.scheduled = false
    state.type = ''
    state.active = {}
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    if(proxy.isNull(val.params)) return
    let deviceName = val&&val.deviceName?val.deviceName:''
    let nodeCode = val&&val.nodeCode?val.nodeCode:''
    state.title = `${deviceName} - ${nodeCode}` 
    state.save = {...val}
    state.active = {...val}
    hasValidData()
    init()
  }

  const init = async() => {
    const query = `id=${state.active.nodeCode}`
    const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/quality/queryMiddleLoad?${query}`, method: 'GET'}
    const res = await publicStore.http({httpApi: params})
    if(res.code == 200 && !proxy.isNull(res.data)) {
      state.active = {...state.active, ...res.data}
      state.active.params = {...res.data}
      state.scheduled = true
    }else{
      state.data = {}
    }
  }

  const hasValidData = () => {
    if (proxy.isNull(state.active?.params)) return false
    const RLC = ['R_phsA', 'L_phsA', 'C_phsA', 'R_phsB', 'L_phsB', 'C_phsB', 'R_phsC', 'L_phsC', 'C_phsC']
    const ABC = ['phW_phsA', 'phW_phsB', 'phW_phsC', 'phVar_phsA', 'phVar_phsB', 'phVar_phsC']
    if(RLC.every(field => field in state.active.params)) return state.type = 'RLC'
    if(ABC.every(field => field in state.active.params)) return state.type = 'ABC'
    return state.type = 'PQ'
  }

  // 事件
  const handleClick = async(remark, val, index?: any) => {
    // 模拟
    val.nodeCode = 'fengji'
    // RLC
    console.log("xxx", val)
    if(state.type == 'RLC'){
      // 开始风机
      if(remark == 'startFun') {
        const query = {...state.active}
        query.action = remark
        query.nodeCode = 'fengji'
        onControl(query)
      }
      // 停止风机
      if(remark == 'stopFun') {
        const query = {...state.active}
        query.action = remark
        query.nodeCode = 'fengji'
        onControl(query)
      }
      // 开始风机
      if(remark == 'startFun') {
        const query = {...state.active}
        query.action = remark
        query.nodeCode = 'fengji'
        onControl(query)
      }
      // 开启负载
      if(remark == 'startLoad') {
        const query = {...state.active}
        query.action = remark
        query.nodeCode = 'fengji'
        onControl(query)
      }
      // 停止负载
      if(remark == 'stopLoad') {
        const query = {...state.active}
        query.action = remark
        query.nodeCode = 'fengji'
        onControl(query)
      }
    }
    // 三相
    if(state.type == 'ABC'){
      
    }
    // 单相
    if(state.type == 'PQ'){
      
    }
  }

  // 控制
  const onControl = async(query) => {
    ElMessageBox.confirm('是否确定操作?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'success'}).then(async() => {
      const params = {query: query, ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/controlLoad`, method: 'POST'}
      const res = await publicStore.http({httpApi: params})
      if(!proxy.isNull(res) && res.code == 200){
        ElNotification({ title: '提示', message: `${res.message}`, type: 'success' })
        init()
      } else {
        ElNotification({ title: '提示', message: `操作失败`, type: 'error' })
      }
    })
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