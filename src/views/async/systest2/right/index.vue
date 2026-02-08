<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title :title="!isNull(publicStore.active)?(!publicStore.active.id?'创建用例 - ':'') + publicStore.active.name:'- - -'">
			<template #right-content>
				<!-- <div class="flex-cc ba1 p5 ml10 cursor relative" @click.stop="toPath('/systestlog2')">
					<div class="ww100 hh100 z1 absolute-cc flex-cc black-rgba30" v-if="isNull(publicStore.active) || (!isNull(publicStore.active) && publicStore.active.parent_id=='0')"><i-ep-warningFilled class="fw i8" /></div>
					<span class="fontStyle">测试记录</span>
				</div> -->
			</template>
		</aa-title>
    <!-- 内容 -->
    <div class="layout-col ba1 p15" v-if="!isNull(publicStore.active)&&publicStore.active.type&&publicStore.active.parent_id!='0'">
			<!-- 控制终端 -->
			<comm v-if="publicStore.active.type.includes('comm')" />
		  <!-- 算法性能 -->
			<calc v-if="publicStore.active.type.includes('calc')" />
		  <!-- 总体性能 -->
			<enti v-if="publicStore.active.type.includes('enti')" />
		  <!-- 单体资源 -->
			<unit v-if="publicStore.active.type.includes('unit')" />
		</div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
  </div>
</template>

<script lang="ts" setup>
  import Comm from './comm'
	import Calc from './calc'
	import Enti from './enti'
	import Unit from './unit'
import { toPath } from '@/utils/common'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
</script>

<style lang="scss">
 
</style>
