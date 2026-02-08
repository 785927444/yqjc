<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">光伏发电总体情况</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <div class="flex1 ww100 flex-col-cc ba1 p20 i15">
		<div>光伏总发电</div>
		<div class="flex-cc ww100 relative ptb10">
			<img class="ww100" src="@/assets/imgs/v1.png" />
			<div class="ww100 absolute-cc flex-bc p20">
			   <div class="flex1 flex-col-cs">
				   <span>集中式光伏</span>
				   <span class="mt8 f12"><span class="white mr5 f16">44.16</span>MWh</span>
			   </div>
               <div class="flex-col-cb">
                   <span class="mb8 f12 tc"><span class="white mr5 f16">49.66</span>MWh</span>
				   <img class="h70" src="@/assets/imgs/v2.png" />
			   </div>
			   <div class="flex1 flex-col-ce">
				   <span>分布式光伏</span>
				   <span class="mt8 f12"><span class="white mr5 f16">5.40</span>MWh</span>
			   </div>
			</div>
		</div>
		<div class="f16">年累计减少碳排放(tCO2e)<span class="white ml5">56722</span></div>
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
