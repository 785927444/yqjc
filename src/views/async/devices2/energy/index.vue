<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <aa-nav />
    <!-- 内容 -->
    <div class="layout-row plr15 pb15">
      <!-- 左边 -->
      <div class="flex-col flex2 ww100 hidden">
        <l1 class="flex1 mb15" />
        <div class="flex-col flex2 ww100 hidden">
          <l2 class="flex1 mb15 " />
          <l3 class="flex1" />
        </div>
      </div>
      <!-- 右边 -->
      <div class="flex-col flex5 ww100 hidden ml15">
        <div class="flex-sc flex1 ww100 hidden mb15">
          <r1 class="flex3 mr15" />
          <r3 class="flex2" />
        </div>
        <r2 class="flex2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from './l1'
	import l2 from './l2'
	import l3 from './l3'
	import r1 from './r1'
	import r2 from './r2'
  import r3 from './r3'
  import Devices from '@/utils/devices';
  import scheduled from "@/utils/scheduled";
  const { createScheduled } = scheduled();
  const { proxy }: any = getCurrentInstance();
  const configStore = proxy.configStore();
  const publicStore = proxy.publicStore();
  const state = reactive({
    ...publicStore.$state,
  });

  onMounted(async () => {
    state.devices = new Devices({type: 'energy'})
    createScheduled("energy_control", 5 * 1000, () => {
      init(true)
    });
  });

  watch(() => publicStore.active, async (val) => {
    if(proxy.isNull(val)) return
    init()
  },{ immediate: false, deep: true });

  const init = async(key) => {
    if(!key) state.devices.getDevices();
    await state.devices.getDevicesData(); 
    state.devices.getDevicesBar('DevicesDailyput', [{name: '充电量', code: 'Daily_Input', data: []}, {name: '放电量', code: 'Daily_Output', data: []}], '1');
    state.devices.getDevicesLine('DevicesPower', [{name: '充放电功率', code: 'Input_Power', data: []}]);
  }
</script>

<style lang="scss">
 
</style>
