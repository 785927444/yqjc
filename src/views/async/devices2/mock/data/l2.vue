<template>
  <div class="layout-col">
		<!-- 标题 -->
		<div class="h40 ww100 flex-sc relative mb5">
			<img class="hh100" src="@/assets/imgs/title.png" />
			<div class="ww100 hh100 flex-sc absolute pl35">
				<span class="fw flex1 ptb5">设备参数控制</span>
				<div class="flex-ec flex1"></div>
			</div>
		</div>
		<div class="flex1 ww100 flex-col ba1 p20 i15">
			<div class="mb25 flex-col" v-for="(v, i) in publicStore._public.params||[]" :key="i">
        <div class="flex-sc cursor" @click.stop="v.check = !v.check">
          <div class="w16 h16 rad2 bo-i1-1 flex-cc p2">
            <i-ep-select v-if="v.check" class="i1 fw" />
          </div>
          <div class="ml10">{{v.name}}</div>
        </div>
        <div class="mt15 pl22 flex-sc">额定功率：<el-input class="w100 mr10" v-model.trim="v.Input_Power" placeholder="请输入" />kW</div>
        <div class="mt15 pl22 flex-sc">转换效率：<el-input class="w100 mr10" v-model.trim="v.Efficiency" placeholder="请输入" />%</div>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
import { isNull } from '@/utils/common';

  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
  })
</script>

<style scoped lang="scss">

</style>
