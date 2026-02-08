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
						<div class="absolute-cc hh100 ww100 z1" id="Gauge_1"></div>
					</div>
        </div>
        <div class="hh100 flex1 p10 flex-cc">
					<div class="h50x2 w50x2 relative flex-cc">
						<img class="ww100" src="@/assets/imgs/yy2.png" />
						<div class="absolute-cc hh100 ww100 z1" id="Gauge_2"></div>
					</div>
        </div>
        <div class="hh100 flex1 p10 flex-cc">
					<div class="h50x2 w50x2 relative flex-cc">
						<img class="ww100" src="@/assets/imgs/yy3.png" />
						<div class="absolute-cc hh100 ww100 z1" id="Gauge_3"></div>
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
      publicStore._public.impactData = [
        {color: '#99d7f2', value: 37, name: '总利用率', rate: '0.37', key: 'count_ABCD'},
        {color: '#f7b694', value: 32, name: '总利用率',  rate: '0.32', key: 'count_C'},
        {color: '#f7a2a2', value: 46, name: '分布式光伏',  rate: '0.46', key: 'count_D'},
      ]
    }, 100);
  })

  watch(() => publicStore._public.impactData, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick()
    if(!old){
      setChart41()
      setChart42()
      setChart43()
    }else{
      if(JSON.stringify(val[0]) != JSON.stringify(old[0])) setChart41()
      if(JSON.stringify(val[1]) != JSON.stringify(old[1])) setChart42()
      if(JSON.stringify(val[2]) != JSON.stringify(old[2])) setChart43()
    }
  },{ immediate: false, deep: true });

  const setChart41 = async() => { 	
		let chart = 'Gauge'
		let id = 'Gauge_1'
    let gauge = publicStore._public.impactData[0]
		let data = [gauge]
    let params = {colors: gauge.color}
    let attr = {data: gauge.rate}
    drawChart(chart, id, attr, data, params)
  }

  const setChart42 = async() => { 
		let chart = 'Gauge'
		let id = 'Gauge_2'
    let gauge = publicStore._public.impactData[1]
		let data = [gauge]
    let params = {colors: gauge.color}
    let attr = {data: gauge.rate}
    drawChart(chart, id, attr, data, params)
  }

  const setChart43 = async() => {
		let chart = 'Gauge'
		let id = 'Gauge_3'
    let gauge = publicStore._public.impactData[2]
		let data = [gauge]
    let params = {colors: gauge.color}
    let attr = {data: gauge.rate}
    drawChart(chart, id, attr, data, params)
  }
</script>

<style scoped lang="scss">

</style>
