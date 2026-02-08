<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">当前能源供给占比</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex1 ww100 flex-bc p20 ba1">
      <div class="flex1 hh100 flex-col-cc">
        <div class="ww100 hh relative p20 tc">
          <img class="hh100" src="@/assets/imgs/tt1.png" />
          <div class="absolute-cc ww100 hh100" id="Pie_supply"></div>
          <div class="absolute-cc cursor tc f12">
            <div class="mb3">能源</div>
            <div>供给占比</div>
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

  watch(() => publicStore._public.supplyData, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart();
  },{ immediate: false, deep: true });

	const setChart = async() => {
		let chart = 'Pie'
		let id = 'Pie_supply'
		let params = {
			colorList: [],
      radius: ['46%', '60%'],
			labelShow: true,
			internalDiameterRatio: 0.8, 
			distance: 200, 
			alpha: 30, 
			pieHeight: 20, 
			opacity: 0.8
		}
		let data = publicStore._public.supplyData
		drawChart(chart, id, {}, data, params)
	}
</script>

<style scoped lang="scss">
.hh{height: 180px;}
</style>
