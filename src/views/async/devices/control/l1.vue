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
    <div class="flex1 ww100 flex-col-sc ba1 p20 s">
		<div class="ww100 flex-bc">
			<div class="flex1 flex-col-cc">
				<img class="w50x2" src="@/assets/imgs/v4.png" />
				<span class="f18 white mt10">中央空调</span>
			</div>
			<div class="flex1 flex-col-cc">
				<img class="w50x2" src="@/assets/imgs/v5.png" />
				<span class="f18 white mt10">供热锅炉</span>
			</div>
		</div>
		<div class="ww85 flex1 flex-ss warp relative pt15">
			<div class="ww50 hh25 p5">
              <div class="ww100 hh100 flex-col-ss ba6 ptb10 pl15 i15">
				  <span>负荷</span>
				  <span class="mt5 f12"><span class="f14 white mr5">543.26</span>kWh</span>
			  </div>
			</div>
			<div class="ww50 hh25 p5">
              <div class="ww100 hh100 flex-col-ss ba6 ptb10 pl15 i15">
				  <span>负荷</span>
				  <span class="mt5 f12"><span class="f14 white mr5">543.26</span>kWh</span>
			  </div>
			</div>
			<div class="ww50 hh25 p5">
             <div class="ww100 hh100 flex-col-ss ba6 ptb10 pl15 i15">
				  <span>有功</span>
				  <span class="mt5 f12"><span class="f14 white mr5">323.61</span>kW</span>
			  </div>
			</div>
			<div class="ww50 hh25 p5">
              <div class="ww100 hh100 flex-col-ss ba6 ptb10 pl15 i15">
				  <span>有功</span>
				  <span class="mt5 f12"><span class="f14 white mr5">323.61</span>kW</span>
			  </div>
			</div>
			<div class="ww50 hh25 p5">
              <div class="ww100 hh100 flex-col-ss ba7 ptb10 pl15 i6">
				  <span>日用电量</span>
				  <span class="mt5 f12"><span class="f14 white mr5">323.61</span>kWh</span>
			  </div>
			</div>
			<div class="ww50 hh25 p5">
              <div class="ww100 hh100 flex-col-ss ba7 ptb10 pl15 i6">
				  <span>日用电量</span>
				  <span class="mt5 f12"><span class="f14 white mr5">323.61</span>kWh</span>
			   </div>
			</div>
			<div class="ww50 hh25 p5">
               <div class="ww100 hh100 flex-col-ss ba7 ptb10 pl15 i6">
				  <span>总用电量</span>
				  <span class="mt5 f12"><span class="f14 white mr5">523.61</span>kWh</span>
			   </div>
			</div>
			<div class="ww50 hh25 p5">
               <div class="ww100 hh100 flex-col-ss ba7 ptb10 pl15 i6">
				  <span>总用电量</span>
				  <span class="mt5 f12"><span class="f14 white mr5">523.61</span>kWh</span>
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
