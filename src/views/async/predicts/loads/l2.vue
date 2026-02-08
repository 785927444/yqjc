<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">总负荷占比</span>
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
        <div class="w100x2 h100x2 relative p20" v-if="publicStore._public.loadsRate">
          <img class="ww100" src="@/assets/imgs/tt1.png" />
          <div class="absolute-cc ww100 hh100" id="Pie_loadsRate"></div>
          <div class="absolute-cc cursor tc f14">
            <div class="mb2">总负荷</div>
            <div>占比</div>
          </div>
        </div>
      </div>
      <div class="flex-col-cs flex1 relative ml20">
        <div class="ww100 flex-sc tl p5 cursor" v-if="publicStore._public.loadsRate" v-for="(v, i) in publicStore._public.loadsRate" :key="i">
          <div class="w10 h10 rad100 mr8" :style="{background: v.color}"></div>
          <div class="w80">{{v.name}}</div>
          <div class="w80">{{v.value?v.value:0}} <span class="f12">kW</span></div>
          <div class="flex1">{{v.rate?v.rate:0}}</div>
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

  watch(() => publicStore._public.loadsRate, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
  },{ immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Pie'
		let id = 'Pie_loadsRate'
		let params = {
			colorList: [],
			labelShow: false,
			internalDiameterRatio: 0.8, 
			distance: 200, 
			alpha: 30, 
			pieHeight: 20, 
			opacity: 0.8
		}
		drawChart(chart, id, {}, data, params)
	}
</script>

<style scoped lang="scss">

</style>
