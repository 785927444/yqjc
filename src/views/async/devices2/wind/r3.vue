<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="风机指标排名"><template #right-content></template></aa-title>
    <!-- 内容 -->
		<div class="layout-col relative p20 ba1">
			<div class="rank_line"></div>
			<div class="flex-col ww100">
				<div class="relative ww100 h30 flex-sc mb10" v-for="(v, i) in !isNull(publicStore._public.homeDevices)?publicStore._public.homeDevices.sort((a, b) => a.Total_Output - b.Total_Output).slice(0, 3):[]" :key="i" >
					<div class="absolute t-30 l4 w4 h20 rad2 bgi22" v-if="i!=0"></div>
					<div class="w12 h12 rad100 bgi22 bo-white-3"></div>
					<div class="w80 tc" :class="i==0?'i6': i==1?'i21': i==2?'i30': i==3||i==4?'i29': 'white'">NO{{i+1}}</div>
					<div class="flex1 hh100 flex-sc relative bs bgi28 plr12">
						<div class="flex1 fontStyle">{{v.name}}</div>
						<div class="flex1 flex-bc i15">
							<span>累计发电量</span>
							<span>
								<span class="white">{{v.Total_Output?Math.floor(100*v.Total_Output)/100:'/'}}</span>
								<span class="ml5">kWh</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<loopScroll :listData="!isNull(publicStore._public.homeDevices)?publicStore._public.homeDevices:[]" class="layout-col">      
				<div class="relative ww100 h30 flex-sc mb10" v-for="(v, i) in !isNull(publicStore._public.homeDevices)?publicStore._public.homeDevices.sort((a, b) => a.Total_Output - b.Total_Output).slice(3):[]" :key="i" >
					<div class="absolute t-30 l4 w4 h20 rad2 bgi22"></div>
					<div class="w12 h12 rad100 bgi22 bo-white-3"></div>
					<div class="w80 tc" :class="i==0||i==1?'i29': 'white'">NO{{i+4}}</div>
					<div class="flex1 hh100 flex-sc relative bs bgi28 plr12">
						<div class="flex1 fontStyle">{{v.name}}</div>
						<div class="flex1 flex-bc i15">
							<span>累计发电量</span>
							<span>
								<span class="white">{{v.Total_Power?Math.floor(100*v.Total_Power)/100:'/'}}</span>
								<span class="ml5">kWh</span>
							</span>
						</div>
					</div>
				</div>
			</loopScroll>
		</div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
  </div>
</template>

<script lang="ts" setup>
  import loopScroll from 'loop-scroll'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
	const configStore = proxy.configStore()
  const dictStore = proxy.dictStore()
  const state = reactive({
	  ...publicStore.$state,
  })
</script>
 
<style scoped lang="scss">
.t-30{ top: -15px;}
:deep(.el-carousel__container){
	height: 100%;
}
:deep(.el-carousel__arrow){
	background: rgba(28,128,245,0.2);
}
.rank_line{
  width: 4px;
  height: 100%;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: -1;
  opacity: 1;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgba(238, 246, 255, 1) 10%, rgba(238, 246, 255, 0) 100%);
}
</style>
