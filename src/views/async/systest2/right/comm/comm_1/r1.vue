<template>
	<div class="layout-col bo-i16-1 p15" style="border-left: none;">
    <!-- 前置 -->
    <Fronts ref="frontsRef"/>
		<!-- 次数 -->
		<div class="ww100 flex-sc mt15 ce">
      <div>通讯次数：</div>
      <el-input type="number" v-if="publicStore.active&&publicStore.active.attr" class="w50x4" v-model.trim="publicStore.active.attr.count" placeholder="请输入数字" />
      <div class="ml8">次</div>
		</div>
		<!-- 频率 -->
		<div class="ww100 flex-sc mt15 ce">
      <div>通讯频率：</div>
      <el-input type="number" v-if="publicStore.active&&publicStore.active.attr" class="w50x4" v-model.trim="publicStore.active.attr.frequency" placeholder="请输入数字" />
      <div class="ml8">秒</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
  let frontRefs = $ref()
	const state = reactive({
		...publicStore.$state,
	})

  // 点击方法
  const handleClick = (remark, val) => {
    if(proxy.isNull(publicStore.active)) return
    if(proxy.isNull(publicStore.active.attr)) publicStore.active.attr = {}
  }
</script>

<style lang="scss">
 
</style>
