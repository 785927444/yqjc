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
    state.devices = new Devices({type: 'photovoltaic'})
    createScheduled("photovoltaic_control", 5 * 1000, () => {
      init(true)
    });
  });

  watch(() => publicStore.active, async (val) => {
    if(proxy.isNull(val)) return
    init()
  },{ immediate: false, deep: true });

  watch(() => publicStore.actIndex, async (val) => {
    if(proxy.isNull(val)) return
    publicStore.datetimes = ''
    const count = val=='-1'? 10 : val=='2'? 12 : val=='3'? 31 : 10
    state.devices.getDevicesBar('DevicesDailyOutput', [{name: '日发电量', code: 'pv_daily_energy', data: []}], '1', '', count, '', publicStore.actIndex);
  },{ immediate: false, deep: true });

  watch(() => publicStore.datetimes, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    const count = val=='-1'? 10 : val=='2'? 12 : val=='3'? 31 : 10
    state.devices.getDevicesBar('DevicesDailyOutput', [{name: '日发电量', code: 'pv_daily_energy', data: []}], '1', '', count, '', publicStore.actIndex);
  }, { immediate: false, deep: true });

  const init = async(key) => {
    if(!key) state.devices.getDevices();
    state.devices.getDevicesData();
    const count = publicStore.actIndex=='-1'? 10 : publicStore.actIndex=='2'? 12 : publicStore.actIndex=='3'? 31 : 10
    state.devices.getDevicesBar('DevicesDailyOutput', [{name: '日发电量', code: 'pv_daily_energy', data: []}], '1', '', count, '', publicStore.actIndex);
    state.devices.getDevicesGfLine('DevicesOutputPower', [{name: '有功功率', code: 'pv_active_power', data: []}, {name: '预测功率', code: 'Predict_Power', data: []}]);
  }

</script>

<style lang="scss">
 
</style>
