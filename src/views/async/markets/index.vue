<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <div class="ww100 flex-sc bs9 h40 mb15">
      <div class="cursor hh100 ptb10 plr20" v-for="(v, i) in state.type" :key="i" @click.stop="if(publicStore.actIndex != v.value) publicStore.rechart(); publicStore.actIndex = v.value"
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
		<div class="layout-col hidden">
      <markets1 v-if="publicStore.actIndex == 'markets1'" />
      <markets2 v-if="publicStore.actIndex == 'markets2'" />
      <markets3 v-if="publicStore.actIndex == 'markets3'" />
		</div>
  </div>
</template>

<script lang="ts" setup>
  import markets1 from "./markets1";
  import markets2 from "./markets2";
  import markets3 from "./markets3";
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
    type: [
      {name: '市场数据', value: 'markets1'},
      // {name: '邀约下发', value: 'markets2'},
      // {name: '客户管理', value: 'markets3'},
      // {name: '光储测算', value: 'markets4'},
    ],
	})

  onMounted(async () => {
    if(publicStore.actIndex == -1) {
      publicStore.actIndex = state.type[0]['value']
    }
  })

</script>

<style lang="scss">
 
</style>
