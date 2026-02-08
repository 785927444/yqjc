<template>
  <div class="layout-col">
		<!-- 标题 -->
		<div class="h40 ww100 flex-sc relative mb5">
			<img class="hh100" src="@/assets/imgs/title.png" />
			<div class="ww100 hh100 flex-sc absolute pl35">
				<span class="fw flex1 ptb5">选择环境</span>
				<div class="flex-ec flex1"></div>
			</div>
		</div>
		<div class="flex1 ww100 flex-col ba1 p20 i15">
			<div class="flex-sc mb15 cursor" v-for="(v, i) in publicStore._public.envs||[]" :key="i" 
			@click.stop="publicStore._public.envs.forEach(a => {a.check = false}); v.check = !v.check">
        <div class="w16 h16 rad100 bo-i1-1 flex-cc">
					<div v-if="v.check" class="w8 h8 rad100 bgi1"></div>
				</div>
				<div class="ml10">{{v.name}}</div>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
  })
</script>

<style scoped lang="scss">

</style>
