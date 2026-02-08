<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="风机总体情况"><template #right-content></template></aa-title>
		<!-- 内容 -->
		<div class="layout-col ba1 p20 i15">
			<div class="ww100 f16 tc">风机总体情况</div>
			<div class="flex-cc ww100 relative ptb10">
				<img class="ww100" src="@/assets/imgs/zz-2.png" />
				<div class="ww100 absolute-cc flex-bc p20">
					<div class="flex1 flex-col-cs">
						<span>累计总发电量</span>
						<span class="mt8 f12"><span class="white mr5 f18">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Output?Math.floor((publicStore._public.homeInfo.Total_Output*100))/100:'0'}}</span>kWh</span>
					</div>
					<div class="flex-col-cb">
						<span class="mb10 f12 tc"><span class="white mr5 f18">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Capacity?Math.floor((publicStore._public.homeInfo.Total_Capacity*100))/100:'0'}}</span>kW</span>
						<img class="w80" src="@/assets/imgs/zz-1.png" />
					</div>
					<div class="flex1 flex-col-ce">
						<span>实时总功率</span>
						<span class="mt8 f12"><span class="white mr5 f18">{{publicStore._public.homeInfo&&publicStore._public.homeInfo.Total_Power?Math.floor((publicStore._public.homeInfo.Total_Power*100))/100:'0'}}</span>kW</span>
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
