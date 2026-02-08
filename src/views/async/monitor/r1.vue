<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb5">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw ptb5">{{$t('monitor.r1_title')}}</span>
        <div class="flex-ec flex1"></div>
      </div>
    </div>
		<div class="flex1 ww100 p15 ba1 flex-sc warp">
			<div class="ww50 hh50 flex-cc">
				<img class="w80" src="@/assets/imgs/z1.png" />
				<span class="flex-col-cs ml15 flex1">
					<span class="mb5 i15">{{$t('monitor.r1_c1')}}</span>
					<span class="f16 fw white">241.82 MW</span>
				</span>
			</div>
			<div class="ww50 hh50 flex-cc">
				<img class="w80" src="@/assets/imgs/z2.png" />
				<span class="flex-col-cs ml15 flex1">
					<span class="mb5 i15">{{$t('monitor.r1_c2')}}</span>
					<span class="f16 fw white">55.56 MW</span>
				</span>
			</div>
			<div class="ww50 hh50 flex-cc">
				<img class="w80" src="@/assets/imgs/z3.png" />
				<span class="flex-col-cs ml15 flex1">
					<span class="mb5 i15">{{$t('monitor.r1_c3')}}</span>
					<span class="f16 fw white">368.6 MWh</span>
				</span>
			</div>
			<div class="ww50 hh50 flex-cc">
				<img class="w80" src="@/assets/imgs/z4.png" />
				<span class="flex-col-cs ml15 flex1">
					<span class="mb5 i15">{{$t('monitor.r1_c4')}}</span>
					<span class="f16 fw white">5200 tCO2e</span>
				</span>
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
