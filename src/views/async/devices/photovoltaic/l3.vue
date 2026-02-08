<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">等效日利用小时数</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <div class="flex1 ww100 flex-col-cc p20 ba1 i15 relative">
		<img class="ww100 hh100" src="@/assets/imgs/v3.png" />
		<img class="absolute-cc w80" src="@/assets/imgs/v4.png" />
		<div class="absolute ww100 hh100 flex-sc warp p20">
			<div class="ww50 hh50 flex-col-cs p20">
				<span>屋顶光伏</span>
				<span class="mt8 f12"><span class="white mr5 f16">179.25</span>MWh</span>
			</div>
			<div class="ww50 hh50 flex-col-ce p20">
				<span>其他光伏</span>
				<span class="mt8 f12"><span class="white mr5 f16">59.75</span>MWh</span>
			</div>
			<div class="ww50 hh50 flex-col-cs p20">
				<span class="f12 mb5">屋顶光伏</span>
				<span>可利用小时数</span>
				<span class="mt8 f12"><span class="white mr5 f16">3.56</span>h</span>
			</div>
			<div class="ww50 hh50 flex-col-ce p20">
				<span class="f12 mb5">其他光伏</span>
				<span>可利用小时数</span>
				<span class="mt8 f12"><span class="white mr5 f16">3.12</span>h</span>
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
