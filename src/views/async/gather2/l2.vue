<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">光伏装机利用率</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <!-- 内容 -->
    <div class="layout-col ba1">
      <div class="ww100 hh100 flex-bc plr10">
        <div class="ww100 hh100 relative flex-cc">
          <img class="w85" src="@/assets/imgs/yyy.png" />
          <div class="absolute-cc ww hh z1 mt5" id="Gauge_4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
  });

  watch(() => publicStore._public.loadRateData, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    setChart()
  },{ immediate: false, deep: true });

  const setChart = async() => { 	
		let chart = 'Gauge'
		let id = 'Gauge_4'
    let gauge = publicStore._public.loadRateData[0]
    gauge.color = '#FFC860'
		let data = [gauge]
    let params = {colors: gauge.color, width: 4, length: 10, splitNumber: 5, offsetDetail: [0, '-10%'], offsetTitle: [0, '20%']}
    let attr = {data: gauge.rate}
    drawChart(chart, id, attr, data, params)
  }

</script>

<style scoped lang="scss">
.ww{width: 140px;}
.hh{height: 140px;}
</style>
