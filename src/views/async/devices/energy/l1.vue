<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">储能站实时信息</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <div class="flex1 ww100 flex-col-cc ba1 p20 i15">
		<div class="flex-sc">
			<span class="tc mr15">储能站总容量<span class="white mlr10 f16">19.6</span>MW</span>
			<span class="tc">数量<span class="white mlr10 f16">3</span>个</span>
		</div>
		<div class="flex-cc ww100 relative ptb10">
			<img class="ww100" src="@/assets/imgs/v1.png" />
			<div class="ww100 absolute-cc flex-bc p20">
			   <div class="flex1 flex-col-cs">
				   <span>输入功率</span>
				   <span class="mt8 f12"><span class="white mr5 f16">3.4</span>MW</span>
			   </div>
               <div class="flex-col-cb">
				   <img class="h70" src="@/assets/imgs/v2.png" />
			   </div>
			   <div class="flex1 flex-col-ce">
				   <span>输出功率</span>
				   <span class="mt8 f12"><span class="white mr5 f16">3.6</span>MW</span>
			   </div>
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
