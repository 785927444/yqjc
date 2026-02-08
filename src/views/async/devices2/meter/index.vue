<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <aa-nav />
    <!-- 内容 -->
    <div class="layout-row plr15 pb15">
      <l1 ref="treeRef" class="flex1 hh100 mr15" />
      <div class="flex4 layout-col">
        <div class="flex-sc flex1 ww100 hidden mb15">
          <r3 class="flex2 mr15" />
          <r1 class="flex3" />
        </div>
        <r2 class="flex2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import l1 from "./l1";
  import r1 from "./r1";
  import r2 from "./r2";
  import r3 from "./r3";
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
    state.devices = new Devices({type: 'METER', treeRef: true})
    createScheduled("meter_control", 5 * 1000, () => {
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
    state.devices.getDevicesLine('DevicesPower', [{name: '功率趋势', code: 'All_active_electric', data: []}]);
  }
</script>