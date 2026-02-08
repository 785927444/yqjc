<template>
  <div class="layout-col plr15 pb15" >
    <div class="layout-row flex1 mb15">
      <t1 class="flex1 hh100 mr15" />
      <t2 class="flex3 hh100" />
    </div>
    <div class="layout-row flex1">
      <b1 class="flex1 hh100 mr15" />
      <b2 class="flex3 hh100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import t1 from './t1'
  import t2 from './t2'
	import b1 from './b1'
  import b2 from './b2'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
    dw: '{m}-{d}',
	})

	onMounted(async() => {
    state.date = new Date().getTime()
	})

	const init = async() => {

	}

	const setInit = async() => {

	}

</script>

<style lang="scss">
 
</style>
