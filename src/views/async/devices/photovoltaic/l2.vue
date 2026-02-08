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
    <div class="layout-col p20 ba1">
      <div class="ww100 hh100 flex-bc plr10">
        <div class="hh100 flex1 p10 flex-cc">
					<div class="h50x2 w50x2 relative flex-cc">
						<img class="ww100" src="@/assets/imgs/yy1.png" />
						<div class="absolute-cc hh100 ww100 z1" id="Gauge_impactData1"></div>
					</div>
        </div>
        <div class="hh100 flex1 p10 flex-cc">
					<div class="h50x2 w50x2 relative flex-cc">
						<img class="ww100" src="@/assets/imgs/yy2.png" />
						<div class="absolute-cc hh100 ww100 z1" id="Gauge_impactData2"></div>
					</div>
        </div>
        <div class="hh100 flex1 p10 flex-cc">
					<div class="h50x2 w50x2 relative flex-cc">
						<img class="ww100" src="@/assets/imgs/yy3.png" />
						<div class="absolute-cc hh100 ww100 z1" id="Gauge_impactData3"></div>
					</div>
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

  onMounted(async() => {
    setTimeout(() => {
      publicStore._public.impactData1 = [
        {color: '#99d7f2', value: 13.9, name: '总利用率', rate: '0.13', key: 'count_ABCD'},
      ]
      publicStore._public.impactData2 = [
        {color: '#f7b694', value: 14.8, name: '屋顶利用率',  rate: '0.14', key: 'count_C'},
      ]
      publicStore._public.impactData3 = [
        {color: '#f7a2a2', value: 13, name: '其他利用率',  rate: '0.13', key: 'count_D'},
      ]
    }, 100);
  })

  watch(() => publicStore._public.impactData1, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    setChart41(val)
  },{ immediate: false, deep: true });

  watch(() => publicStore._public.impactData2, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    setChart42(val)
  },{ immediate: false, deep: true });

  watch(() => publicStore._public.impactData3, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    setChart43(val)
  },{ immediate: false, deep: true });

  const setChart41 = async(data) => { 	
		let chart = 'Gauge'
		let id = 'Gauge_impactData1'
    let params = {colors: data[0].color}
    let attr = {data: data[0].rate}
    drawChart(chart, id, attr, data, params)
  }

  const setChart42 = async(data) => { 
		let chart = 'Gauge'
		let id = 'Gauge_impactData2'
    let params = {colors: data[0].color}
    let attr = {data: data[0].rate}
    drawChart(chart, id, attr, data, params)
  }

  const setChart43 = async(data) => {
		let chart = 'Gauge'
		let id = 'Gauge_impactData3'
    let params = {colors: data[0].color}
    let attr = {data: data[0].rate}
    drawChart(chart, id, attr, data, params)
  }
</script>

<style scoped lang="scss">

</style>
