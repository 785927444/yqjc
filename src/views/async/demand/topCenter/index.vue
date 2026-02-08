<template>
  <div class="layout-col">
		<!-- 头部 -->
		<top-title />
    <!-- 地图 -->
    <div class="layout-col relative">
      <div @click.stop="configStore.mapTitleShow=!configStore.mapTitleShow" v-if="!configStore.mapTitleShow && proxy.isNull(configStore.supplyId)" 
      class="absolute t0 l0 cursor flex-sc"  style="z-index: 101"><i-ep-dArrowRight class="mr4 pt2" />分布</div>
      <div v-if="configStore.mapTitleShow && proxy.isNull(configStore.supplyId)" 
      class="absolute t0 l0 rad2 hidden plr15 ptb10 flex-col-ss" 
      style="z-index: 101;min-width:25%;max-height:80%;background: rgba(70,165,235,0.2)">
        <div class="ww100 flex-bc pt5 pb15 cursor" @click.stop="configStore.mapTitleShow=!configStore.mapTitleShow">
          <span class="flex-sc"><i-ep-dArrowLeft class="mr4 pt2" />分布</span>
          <i-ep-close />
        </div>
        <div class="ww100 h2 bb mb5"></div>
        <div class="ww100 flex-col-ss overlay" v-if="!isNull(publicStore._public.stationMap)">
          <div class="ww100 flex-sc ptb5" v-for="(v, i) in publicStore._public.stationMap" :key="i">
            <div class="w50x3 flex-bc">
              <span>{{v.name}}</span>
              <span>{{v.station}}</span>
            </div>
            <div class="w3 h28 bc mlr15"></div>
            <div class="w100">设备：{{v.device}}</div>
            <div class="w100">传感器：{{v.sensor}}</div>
          </div>
        </div>
      </div>
      <div class="ww100 hh100 absolute-tt tt45 ll50" style="z-index: 100">
        <div class="ww100 hh100" id="Map"></div>
      </div>
      <div class="ww100 absolute-tt tt88 ll50 flex-cc"><img class="ww58" src="@/assets/imgs/map.png" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
	import topTitle from '@/views/async/demand/topCenter/title'
	import ec from '@/utils/chart'
	const { drawChart } = ec()
	const { proxy }:any = getCurrentInstance()
  const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
	  ...publicStore.$state,
	})
  let query = $ref('')
	
  // 监控地图
  watch(() => configStore.adcode, async(val, old) => {
		await nextTick()
    if(val == old) return
		console.log('home更新地图------------------', val, old)
		drawChart('Map','Map', '', val)
  }, {immediate: true, deep: true})
</script>

<style scoped lang="scss">
:deep(.custom-tooltip-box) {
  display: none;
  padding: 10px 15px !important;
  border-radius: 8px !important;
  border: 1px solid #aaa !important;
  color: #fff !important;
  background: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0px 0px 8px 2px rgba(1, 136, 255, 0.5) !important;
}
:deep(.bg-img) {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-top: -5px;
  background: url('@/assets/imgs/g1.png') no-repeat center/25px;
}
.bb{
	box-sizing: border-box;
	border-top: 1px solid ;
    border-image: linear-gradient(270deg, rgba(84, 207, 243, 0) -1%, rgba(84, 207, 243, 0.8) 49%, rgba(84, 207, 243, 0) 99%);
	background: linear-gradient(270deg, rgba(62, 190, 227, 0) 0%, rgba(103, 218, 252, 0.4) 51%, rgba(62, 190, 227, 0) 100%);
}
.bc{
	box-sizing: border-box;
	border-right: 1px solid ;
    border-image: linear-gradient(180deg, rgba(84, 207, 243, 0) -1%, rgba(84, 207, 243, 0.8) 49%, rgba(84, 207, 243, 0) 99%);
	background: linear-gradient(180deg, rgba(62, 190, 227, 0) 0%, rgba(103, 218, 252, 0.4) 51%, rgba(62, 190, 227, 0) 100%);
}
</style>
