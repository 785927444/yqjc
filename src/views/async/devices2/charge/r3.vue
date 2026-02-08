<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="充电站统计情况"><template #right-content></template></aa-title>
		<!-- 内容 -->
		<div class="layout-row">
			<div class="flex2 hh100 flex-ss warp ba1 p15 i15">
				<div class="ww50 hh50 p8">
					<div class="ww100 hh100 p2 rad2">
						<div class="layout-row octagon">
							<div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
									<span class="pt5 pb5">充电桩数量<span></span></span>
									<span class="pb5 f16 fw white">{{!isNull(publicStore._public.sensorNodes)?publicStore._public.sensorNodes.length:'0'}}</span>
							</div>
						</div>
					</div>
			  </div>
				<div class="ww50 hh50 p8">
					<div class="ww100 hh100 p2 rad2">
						<div class="layout-row octagon">
							<div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
									<span class="pt5 pb5">充电枪数量<span></span></span>
									<span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.sum?publicStore._public.homeInfo.sum:'0'}}</span>
							</div>
						</div>
					</div>
			  </div>
				<div class="ww50 hh50 p8">
					<div class="ww100 hh100 p2 rad2">
						<div class="layout-row octagon">
							<div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
									<span class="pt5 pb5">充电枪使用数<span></span></span>
									<span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.Operation_State3?publicStore._public.homeInfo.Operation_State3:'0'}}</span>
							</div>
						</div>
					</div>
			  </div>
				<div class="ww50 hh50 p8">
					<div class="ww100 hh100 p2 rad2">
						<div class="layout-row octagon">
							<div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
									<span class="pt5 pb5">充电枪闲置数<span></span></span>
									<span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.Operation_State1?publicStore._public.homeInfo.Operation_State1:'0'}}</span>
							</div>
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
	const configStore = proxy.configStore()
  const dictStore = proxy.dictStore()
  const state = reactive({
	  ...publicStore.$state,
  })

</script>
 
<style scoped lang="scss">

</style>
