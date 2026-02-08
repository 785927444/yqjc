<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">能耗峰值信息</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <div class="flex1 ww100 flex-col-cc ba1 p20 i15">
		<div class="flex-cc ww100 relative ptb10">
			<img class="ww100" src="@/assets/imgs/v1.png" />
			<div class="ww100 absolute-cc flex-bc p20">
			   <div class="flex1 flex-col-cs">
				   <span>当月最大负荷</span>
				   <span class="mt8 f12"><span class="white mr5 f16">453.66</span>kWh</span>
			   </div>
               <div class="flex-col-cb">
				   <img class="h70" src="@/assets/imgs/v2.png" />
			   </div>
			   <div class="flex1 flex-col-ce">
				   <span>当月最大负荷时间</span>
				   <span class="mt8 f12"><span class="white mr5 f14">2024-07-10 10:00:00</span></span>
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
