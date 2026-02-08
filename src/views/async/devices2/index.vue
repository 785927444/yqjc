<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <div class="ww100 flex-sc bs9 h40 mb15">
      <div class="cursor hh100 ptb10 plr20" v-for="(v, i) in state.type" :key="i" @click.stop="publicStore.rechart(); publicStore.actIndex = v.value"
      :class="publicStore.actIndex == v.value?'white ba2':'i1'">{{ v.name }}</div>
      <div class="flex1 hh100 flex-ec">
        <img src="@/assets/imgs/uu1.png" />
        <span class="ml15 cc cursor" @click.stop="toPath('/home')">首页</span>
        <span class="mlr10 cc">/</span>
        <span class="mr10 cursor">{{ find(state.type, ['value', publicStore.actIndex], 'name') }}</span>
        <img src="@/assets/imgs/uu2.png" />
      </div>
    </div>
    <!-- 页面 -->
		<div class="layout-col">
      <photovoltaic v-if="publicStore.actIndex == 'photovoltaic'" />
      <energy v-if="publicStore.actIndex == 'energy'" />
      <charge v-if="publicStore.actIndex == 'charge'" />
      <wind v-if="publicStore.actIndex == 'wind'" />
      <airconditioner v-if="publicStore.actIndex == 'airconditioner'" />
      <meter v-if="publicStore.actIndex == 'meter'" />
      <mock v-if="publicStore.actIndex == 'mock'" />
		</div>
  </div>
</template>

<script lang="ts" setup>
  import photovoltaic from "./photovoltaic";
  import energy from "./energy";
  import charge from "./charge";
  import wind from "./wind";
  import airconditioner from "./airconditioner";
  import meter from "./meter";
  import mock from "./mock";
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
    type: [
      {name: '光伏监测', value: 'photovoltaic'},
      {name: '储能监测', value: 'energy'},
      {name: '充电桩监测', value: 'charge'},
      {name: '风机监测', value: 'wind'},
      {name: '空调监测', value: 'airconditioner'},
      {name: '电表监测', value: 'meter'},
      // {name: '中央空调半实物仿真装置监测', value: '5'},
      // {name: 'RLC负载监测', value: '6'},
      {name: '风光模拟', value: 'mock'},
    ]
	})

  onMounted(async () => {
    if(publicStore.actIndex == -1) {
      publicStore.actIndex = state.type[0]['value']
    }
  })
</script>

<style lang="scss">
 
</style>
