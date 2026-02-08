<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">实时信息</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <div class="flex1 ww100 flex-col-cc p20 ba1 i15 relative">
    <div class="ww100 h100x2"><img class="ww100 hh100" src="@/assets/imgs/v3.png" /></div>
		<img class="absolute-cc w90" src="@/assets/imgs/v2.png" />
		<div class="absolute-cc tt20 flex-col-cc">
			<span class="tc mb8">总容量<span class="white mlr5 f16">82372.21</span>KW</span>
			<span class="tc">数量<span class="white mlr10 f16">32</span>个</span>
		</div>
		<div class="absolute ww100 hh100 flex-sc warp p20">
			<div class="ww50 hh50 flex-col-cs p20">
				<span>实时负荷功率</span>
				<span class="mt8 f12"><span class="white mr5 f16">45.66</span>MW</span>
			</div>
			<div class="ww50 hh50 flex-col-ce p20">
				<span>可调上限</span>
				<span class="mt8 f12"><span class="white mr5 f16">45.66</span>KW</span>
			</div>
			<div class="ww50 hh50 flex-col-cs p20">
				<span>实时功率</span>
				<span class="mt8 f12"><span class="white mr5 f16">45.66</span>MW</span>
			</div>
			<div class="ww50 hh50 flex-col-ce p20">
				<span>可调下限</span>
				<span class="mt8 f12"><span class="white mr5 f16">45.66</span>KW</span>
			</div>
		</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
  })
</script>

<style scoped lang="scss">

</style>
