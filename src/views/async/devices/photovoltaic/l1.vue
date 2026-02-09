<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="光伏总体情况"><template #right-content></template></aa-title>
		<!-- 内容 -->
		<div class="layout-col ba1 p20 i15">
			<div class="ww100 tc flex-bc">
				<div class="flex-sc">
					<span>总发电量</span>
					<span class="f12"><span class="white mlr5 f14">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Output?Math.floor((publicStore._public.homeInfo.Total_Output*100))/100:'0'}}</span>kWh</span>
				</div>
				<div class="f16">装机总容量</div>
				<div class="flex-sc">
					<span>总有功功率</span>
					<span class="f12"><span class="white mlr5 f14">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.pv_active_power?Math.floor((publicStore._public.homeInfo.pv_active_power*100))/100:'0'}}</span>kW</span>
				</div>
			</div>
			<div class="flex-cc ww100 relative ptb10">
				<img class="ww100" src="@/assets/imgs/zz-2.png" />
				<div class="ww100 absolute-cc flex-bc p20">
					<div class="flex1 flex-col-cs">
						<div class="flex-col-sc">
						  <span>上网总发电量</span>
						  <span class="f12 mt8"><span class="white mlr5 f14">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Output?Math.floor((publicStore._public.homeInfo.Total_Output*100*0.1))/100:'0'}}</span>kWh</span>
						</div>
						<div class="flex-col-sc mt12">
						  <span>自用总发电量</span>
						  <span class="f12 mt8"><span class="white mlr5 f14">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Output?Math.floor((publicStore._public.homeInfo.Total_Output*100*0.9))/100:'0'}}</span>kWh</span>
						</div>
					</div>
					<div class="flex-col-cb">
						<span class="mb10 f12 tc">
							<!-- <span class="white mr5 f18">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_apparent_power?Math.floor((publicStore._public.homeInfo.Total_apparent_power*100))/100:'0'}}</span> -->
							<span class="white mr5 f18">320.67</span>
						kW</span>
						<img class="w80" src="@/assets/imgs/zz-1.png" />
					</div>
					<div class="flex1 flex-col-ce">
						<div class="flex-col-sc">
						  <span>上网总盈利</span>
						  <span class="f12 mt8"><span class="white mlr5 f14">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Output?Math.floor((publicStore._public.homeInfo.Total_Output*100*0.1*0.4009))/100:'0'}}</span>元</span>
						</div>
						<div class="flex-col-sc mt12">
						  <span>自用总节省</span>
						  <span class="f12 mt8"><span class="white mlr5 f14">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Output?Math.floor((publicStore._public.homeInfo.Total_Output*100*0.9*0.933))/100:'0'}}</span>元</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
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
