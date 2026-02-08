<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="配置信息"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-col ba1 p20 i15">
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">当前状态</span>
        <span :class="publicStore.active?publicStore.active.status=='1'?'i12':publicStore.active.status=='2'?'i6':'':''">{{ publicStore.active?publicStore.active.status=='1'?'进行中':publicStore.active.status=='2'?'已完成':'':'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">开始时间</span>
        <span class="white">{{ publicStore.active&&publicStore.active.start_time?parseTime(publicStore.active.start_time):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative" v-if="publicStore.active&&publicStore.active.end_time">
        <span class="w50x2 mr10">结束时间</span>
        <span class="white">{{ publicStore.active&&publicStore.active.end_time?parseTime(publicStore.active.end_time):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">操作人员</span>
        <span class="white">{{ publicStore.active&&publicStore.active.user_name?decrypt(publicStore.active.user_name):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">前置记录</span>
        <span class="i1 cursor">查看</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">调控终端</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.terminal?find(terminals, ['id', publicStore.active.attr.terminal], 'name'):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">协议规约</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.agreement?find(dictStore.agreements, ['value', publicStore.active.attr.agreement], 'name'):'' }}</span>
      </div>
      <!-- <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">通讯时长</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.time?publicStore.active.attr.time:'' }} s</span>
      </div> -->
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">通讯次数</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.count?publicStore.active.attr.count:'' }} 次</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">通讯频率</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.frequency?publicStore.active.attr.frequency:'' }} s</span>
      </div>
    </div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
  </div>
</template>

<script lang="ts" setup>
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const dictStore = proxy.dictStore()
  const state = reactive({
	  ...publicStore.$state,
  })
	// 父子双向绑定
	const props = defineProps(['terminals'])



</script>
  
<style scoped lang="scss">

</style>
  