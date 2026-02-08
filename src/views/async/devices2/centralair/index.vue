<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <aa-nav />
    <!-- 内容 -->
    <div class="layout-col plr15 pb15">
      <t1 class="flex2 mb15" />
      <div class="flex8 ww100 flex-ss hidden">
        <!-- 左边 -->
        <div class="flex-col flex2 hh100 hidden">
          <l2 class="flex1 mb15 " />
          <l3 class="flex1" />
        </div>
        <!-- 右边 -->
        <div class="flex-col flex5 hh100 hidden ml15">
          <r1 class="flex5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
	import t1 from './t1'
	import l2 from './l2'
	import l3 from './l3'
	import r1 from './r1'
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
    state.devices = new Devices({type: 'centralair'})
    createScheduled("centralair_control", 5 * 1000, () => {
      init(true)
    });
  });

  watch(() => publicStore.active, async (val) => {
    if(proxy.isNull(val)) return
    init()
  },{ immediate: false, deep: true });

  const init = async(key) => {
    if(!key) state.devices.getDevices();
    state.devices.getDevicesData();
    state.devices.getDevicesBar('DailyElectricity', [{name: '用电量', code: 'Daily_Electricity', data: []}]);
    state.devices.getDevicesLine('DevicesPower', [{name: '用电功率', code: 'Power', data: []}]);
  }
</script>

<style lang="scss">
 
</style>
