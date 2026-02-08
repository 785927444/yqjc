<template>
  <!-- 生成弹窗 -->
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="`${state.title}`" :draggable="true" :fullscreen="true" :destroy-on-close="true" :before-close="onClose">
      <div class="layout-col hidden relative">
        <!-- <div style="width: 100%; height: 100%; position: absolute; top: -80px; left: 0; overflow: scroll;"> -->
          <iframe class="ww100 hh100" style="border: none; overflow: hidden;" :src="state.iframe" frameborder="0" 
            scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms">
          </iframe> 
        <!-- </div>  -->
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { Refresh, Search,Plus } from '@element-plus/icons-vue'
  import api from '@/api'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
    ...publicStore.$state,
    iframe: ''
  })

  const props = defineProps({
    state: {
      type: [Object, Array],
      default: ()=>{return {}}
    },
  })
  const emit = defineEmits(['init'])

  const onClose = () => {
    emit('init')
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
  }

  // 弹窗
  const onVisable = async (val?: any) => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    // state.active = {...val}
    state.title = `编辑【${val.schemeName}】`
    state.iframe = `http://${publicStore.link.ip}:${publicStore.link.port}/#/scheme/createScheme?name=custom&id=${val.id}&presetFlag=2`
    // console.log("state", state.iframe)
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