<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">用户参与响应概括</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex1 ww100 flex-col-cc p20 ba1">
      <div class="flex1 ww100 flex-sc" v-for="(v, i) in publicStore._public.responsesBar1?publicStore._public.responsesBar1:[]" :key="i">
        <div class="w80">{{ v.name }}</div>
        <div class="flex1 h20 bgi22 relative rad10 hidden">
          <div class="absolute hh100 bgi1 i22 flex-cc l0" :class="'ww'+Math.floor((v.value1 / v.value) * 100)">{{v.value1}}</div>
          <div class="absolute hh100 i1 flex-cc r0" :class="'ww'+Math.floor((v.value2 / v.value) * 100)">{{v.value2}}</div>
        </div>
      </div>
      <div class="ww100 hh20 flex-cc mt10">
        <div class="flex-cc mr10">
          <span class="w30 h16 rad2 bgi1 mr10"></span>
          <span>参与</span>
        </div>
        <div class="flex-cc ml10">
           <span class="w30 h16 rad2 bgi22 mr10"></span>
          <span>未参与</span>
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
